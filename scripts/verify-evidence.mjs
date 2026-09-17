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
// Discourse forums answer a browser user agent with an empty app shell and put the real post text
// in the crawler view, so those hosts are asked as a crawler from the start and the browser agent
// becomes their fallback. Every other host works the other way round.
const crawlerAgent = 'wow-forever-encyclopedia-evidence-check';

function preferredAgent(url) {
  return /(^|\.)forums\.blizzard\.com$/i.test(new URL(url).hostname) ? crawlerAgent : userAgent;
}

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

const maxRedirects = 5;
const maxBytes = 32 * 1024 * 1024;

// The ledger drives every request, so the checker only ever talks to public hosts over http(s):
// a source URL must never turn the weekly runner into a probe of private infrastructure.
export function assertPublicUrl(value) {
  const url = new URL(value);

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`unsupported scheme ${url.protocol}`);
  }

  if (url.username !== '' || url.password !== '') {
    throw new Error('credentials in URL');
  }

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.internal') || host.includes(':')) {
    throw new Error(`blocked host ${host}`);
  }

  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);

  if (ipv4) {
    const [first, second] = ipv4.slice(1).map(Number);
    const blocked = first === 0 || first === 10 || first === 127 || first >= 224
      || (first === 169 && second === 254)
      || (first === 172 && second >= 16 && second <= 31)
      || (first === 192 && second === 168);

    if (blocked) {
      throw new Error(`blocked address ${host}`);
    }
  }

  return url;
}

async function readCapped(response) {
  const body = response.body;

  if (!body) {
    return new Uint8Array();
  }

  const reader = body.getReader();
  const chunks = [];
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    size += value.byteLength;

    if (size > maxBytes) {
      await reader.cancel();
      throw new Error(`response larger than ${Math.round(maxBytes / 1024 / 1024)} MB`);
    }

    chunks.push(value);
  }

  const buffer = new Uint8Array(size);
  let offset = 0;

  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return buffer;
}

// Blizzard's CDN answers 502/504 under load, so a transient gateway error must not be reported
// as a missing quote in the weekly run.
const retryDelays = [3_000, 10_000, 30_000];

async function loadPageText(url, agent = userAgent) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await fetchPage(url, agent);
    } catch (error) {
      const transient = /HTTP 5\d\d|fetch failed|terminated|timeout/i.test(String(error.message ?? error));

      if (!transient || attempt >= retryDelays.length) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt]));
    }
  }
}

async function fetchPage(url, agent) {
  let target = assertPublicUrl(url);
  let response;

  // Redirects are followed by hand so that every hop is checked, not only the first URL.
  for (let hop = 0; hop <= maxRedirects; hop += 1) {
    response = await fetch(target, {
      headers: { 'user-agent': agent },
      redirect: 'manual',
      signal: AbortSignal.timeout(90_000)
    });

    const location = response.headers.get('location');

    if (response.status < 300 || response.status >= 400 || !location) {
      break;
    }

    if (hop === maxRedirects) {
      throw new Error(`more than ${maxRedirects} redirects`);
    }

    target = assertPublicUrl(new URL(location, target).toString());
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const isPdf = contentType.includes('pdf') || /\.pdf($|\?)/i.test(url);

  const bytes = await readCapped(response);

  if (isPdf) {
    const pdf = await getDocumentProxy(bytes);
    const { text } = await extractText(pdf, { mergePages: false });
    return { text: text.join('\n'), pages: text };
  }

  const html = new TextDecoder('utf-8').decode(bytes);

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
    const parsed = await readJson(file);

    for (const entry of parsed) {
      entries.push({ ...entry, file });
    }
  }

  return entries;
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read JSON from ${file}: ${error.message}`);
  }
}

function parseArgs(argv) {
  const files = [];
  let jsonOut = null;

  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--json') {
      if (index + 1 >= argv.length) {
        throw new Error('--json requires an output file path');
      }

      jsonOut = argv[index + 1];
      index += 1;
    } else {
      files.push(argv[index]);
    }
  }

  return { files, jsonOut };
}

// A malformed ledger must fail with the offending entry named, not with a stack trace from the
// middle of the network loop.
function assertLedgerShape(entries) {
  for (const [index, entry] of entries.entries()) {
    const where = entry?.id ?? `${entry?.file ?? 'ledger'} entry #${index + 1}`;

    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`${where}: entry is not an object`);
    }

    for (const field of ['id', 'sourceId', 'quote']) {
      if (typeof entry[field] !== 'string' || entry[field].trim() === '') {
        throw new Error(`${where}: "${field}" must be a non-empty string`);
      }
    }
  }
}

async function main() {
  const { files, jsonOut } = parseArgs(process.argv.slice(2));
  const results = [];

  try {
    await run(files, results);
  } finally {
    if (jsonOut) {
      await writeFile(jsonOut, JSON.stringify(results, null, 2));
    }
  }

  const failures = results.filter((result) => result.status !== 'OK');

  for (const result of failures) {
    console.log(`${result.status.padEnd(14)} ${result.id} — ${result.detail}`);
  }

  console.log(`\n${results.length - failures.length}/${results.length} quotes verified against live sources.`);

  // A quote that no longer exists is a content problem (exit 1); a source that would not load is
  // usually the network or the host (exit 2), and the two must not look the same in CI.
  const broken = failures.filter((result) => result.status !== 'FETCH_ERROR');

  if (broken.length > 0) {
    process.exitCode = 1;
  } else if (failures.length > 0) {
    console.log(`${failures.length} source(s) could not be loaded; quotes themselves are unchanged.`);
    process.exitCode = 2;
  } else {
    process.exitCode = 0;
  }
}

async function run(files, results) {
  const sources = await readJson(sourcesFile);
  const urlById = new Map(sources.map((source) => [source.id, source.url]));
  const entries = await readLedgers(files);

  assertLedgerShape(entries);
  const pageCache = new Map();

  const load = (url, agent) => {
    const key = `${url}|${agent}`;

    if (!pageCache.has(key)) {
      pageCache.set(key, loadPageText(url, agent).catch((error) => ({ error: String(error.message ?? error) })));
    }

    return pageCache.get(key);
  };

  // Sources are fetched up front, one request at a time per host and several hosts at once:
  // downloading sequentially made a weekly run scale with the number of sources, while firing
  // everything in parallel made Blizzard answer with throttling pages that look like missing quotes.
  const urls = [...new Set(entries.map((entry) => urlById.get(entry.sourceId)).filter(Boolean))];
  const byHost = new Map();

  for (const url of urls) {
    const host = new URL(url).hostname;
    byHost.set(host, [...(byHost.get(host) ?? []), url]);
  }

  await Promise.all(
    [...byHost.values()].map(async (hostUrls) => {
      for (const url of hostUrls) {
        await load(url, preferredAgent(url));
      }
    })
  );

  for (const entry of entries) {
    const url = urlById.get(entry.sourceId);

    if (!url) {
      results.push({ id: entry.id, status: 'UNKNOWN_SOURCE', detail: entry.sourceId });
      continue;
    }

    const primaryAgent = preferredAgent(url);
    const page = await load(url, primaryAgent);

    if (page.error) {
      results.push({ id: entry.id, status: 'FETCH_ERROR', detail: `${url} — ${page.error}` });
      continue;
    }

    const needle = normalizeForMatch(entry.quote);
    const matches = (candidate) => candidate !== undefined && needle.length > 0
      && normalizeForMatch(candidate).includes(needle);

    let inVisibleText = matches(page.text);
    let inEmbeddedData = !inVisibleText && matches(page.embedded);
    let crawlerPage = null;

    if (!inVisibleText && !inEmbeddedData && !page.pages) {
      crawlerPage = await load(url, primaryAgent === crawlerAgent ? userAgent : crawlerAgent);

      if (!crawlerPage.error) {
        inVisibleText = matches(crawlerPage.text);
        inEmbeddedData = !inVisibleText && matches(crawlerPage.embedded);
      }
    }

    const found = inVisibleText || inEmbeddedData;
    let detail = inEmbeddedData ? `${url} (embedded page data)` : url;

    if (found && crawlerPage && !crawlerPage.error) {
      detail = `${detail} (second user agent)`;
    }

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

}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await main();
  } catch (error) {
    console.error(`verify-evidence failed: ${error.message ?? error}`);
    process.exitCode = 1;
  }
}
