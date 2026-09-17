#!/usr/bin/env node
// Checks that every quote in the evidence ledger still appears on its live source page.
// Usage:
//   npm run verify:evidence                       -> all files in docs/research/evidence/
//   node scripts/verify-evidence.mjs <file.json>  -> one ledger or candidate file
//   add --json <out.json> to save a machine-readable report
// Matching ignores case, punctuation and whitespace but keeps the exact word sequence,
// so PDF line breaks ("Arch- Druid") and typographic quotes do not cause false failures.
// See docs/research/evidence/README.md for the ledger format.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { extractText, getDocumentProxy } from 'unpdf';

const root = resolve(import.meta.dirname, '..');
const evidenceDir = join(root, 'docs/research/evidence');
const sourcesFile = join(root, 'src/content/sources/core.json');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const namedEntities = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: ' ',
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  mdash: '-',
  ndash: '-',
  hellip: '...'
};

export function normalizeForMatch(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

export function htmlToText(html) {
  const withoutCode = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ');
  const withoutTags = withoutCode.replace(/<[^>]+>/g, ' ');

  return withoutTags.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_entity, body) => {
    if (body[0] === '#') {
      const isHex = body[1] === 'x' || body[1] === 'X';
      const codePoint = Number.parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return String.fromCodePoint(codePoint);
    }

    return namedEntities[body.toLowerCase()] ?? ' ';
  });
}

async function loadPageText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': userAgent },
    redirect: 'follow',
    signal: AbortSignal.timeout(90_000)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const isPdf = contentType.includes('pdf') || /\.pdf($|\?)/i.test(url);

  if (isPdf) {
    const pdf = await getDocumentProxy(new Uint8Array(await response.arrayBuffer()));
    const { text } = await extractText(pdf, { mergePages: false });
    return { text: text.join('\n'), pages: text };
  }

  const html = await response.text();

  return { text: htmlToText(html), embedded: decodeEmbeddedData(html), pages: null };
}

// Some Blizzard pages (for example the story timeline) ship their article text only inside
// JSON in <script> tags, so the visible-text pass cannot see it.
export function decodeEmbeddedData(html) {
  return html
    .replace(/\\u([0-9a-f]{4})/gi, (_match, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/\\(["'\/])/g, '$1');
}

async function readLedgers(paths) {
  const files = paths.length > 0
    ? paths.map((path) => resolve(path))
    : (await readdir(evidenceDir))
      .filter((name) => name.endsWith('.json'))
      .map((name) => join(evidenceDir, name));

  const entries = [];

  for (const file of files) {
    const parsed = JSON.parse(await readFile(file, 'utf8'));

    for (const entry of parsed) {
      entries.push({ ...entry, file });
    }
  }

  return entries;
}

function parseArgs(argv) {
  const files = [];
  let jsonOut = null;

  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--json') {
      jsonOut = argv[index + 1];
      index += 1;
    } else {
      files.push(argv[index]);
    }
  }

  return { files, jsonOut };
}

async function main() {
  const { files, jsonOut } = parseArgs(process.argv.slice(2));
  const sources = JSON.parse(await readFile(sourcesFile, 'utf8'));
  const urlById = new Map(sources.map((source) => [source.id, source.url]));
  const entries = await readLedgers(files);
  const pageCache = new Map();
  const results = [];

  for (const entry of entries) {
    const url = entry.url ?? urlById.get(entry.sourceId);

    if (!url) {
      results.push({ id: entry.id, status: 'UNKNOWN_SOURCE', detail: entry.sourceId });
      continue;
    }

    if (!pageCache.has(url)) {
      pageCache.set(url, loadPageText(url).catch((error) => ({ error: String(error.message ?? error) })));
    }

    const page = await pageCache.get(url);

    if (page.error) {
      results.push({ id: entry.id, status: 'FETCH_ERROR', detail: `${url} — ${page.error}` });
      continue;
    }

    const needle = normalizeForMatch(entry.quote);
    const inVisibleText = needle.length > 0 && normalizeForMatch(page.text).includes(needle);
    const inEmbeddedData = !inVisibleText && needle.length > 0 && page.embedded !== undefined
      && normalizeForMatch(page.embedded).includes(needle);
    const found = inVisibleText || inEmbeddedData;
    let detail = inEmbeddedData ? `${url} (embedded page data)` : url;

    let status = found ? 'OK' : 'NOT_FOUND';

    if (found && page.pages) {
      const pageNumber = page.pages.findIndex((pageText) => normalizeForMatch(pageText).includes(needle)) + 1;
      detail = pageNumber > 0 ? `${url} (PDF p. ${pageNumber})` : `${url} (PDF, spans pages)`;
      const claimedPage = Number(entry.locator?.match(/PDF p\. (\d+)/)?.[1]);

      // A quote on the wrong page is still a broken citation for the reader.
      if (pageNumber > 0 && claimedPage && claimedPage !== pageNumber) {
        status = 'LOCATOR_MISMATCH';
        detail = `${detail} but ledger says PDF p. ${claimedPage}`;
      }
    }

    results.push({ id: entry.id, status, detail });
  }

  const failures = results.filter((result) => result.status !== 'OK');

  for (const result of results) {
    console.log(`${result.status.padEnd(14)} ${result.id} — ${result.detail}`);
  }

  console.log(`\n${results.length - failures.length}/${results.length} quotes verified against live sources.`);

  if (jsonOut) {
    await writeFile(jsonOut, JSON.stringify(results, null, 2));
  }

  process.exitCode = failures.length > 0 ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
