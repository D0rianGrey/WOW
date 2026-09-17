// Watches official Blizzard news for World of Warcraft material the encyclopedia does not cite yet.
//
// State is the encyclopedia itself: every article already registered in
// src/content/sources/core.json counts as known, so nothing has to be committed by CI.
//
//   node scripts/watch-sources.mjs                 print unregistered articles
//   node scripts/watch-sources.mjs --json out.json also save a machine-readable report
//   node scripts/watch-sources.mjs --since 2026-09-01   change the cut-off date (default: below)
//
// Exit code 0 means nothing new, 20 means unregistered articles were found, 1 means the check failed.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const newsUrl = 'https://worldofwarcraft.blizzard.com/en-us/news';
const sourcesFile = resolve('src/content/sources/core.json');

// Forever was announced on 12 September 2026; older articles are history, not news.
const defaultSince = '2026-09-12';

// An article matters when it can carry lore or product facts about Forever.
const keywords = [
  'forever', 'skyborne', 'zephras', 'shen’dralas', "shen'dralas", 'riverglades',
  'forsaken kingdom', 'windshaper', 'high order', 'al’aketh', "al'aketh",
  'barrow deeps', 'hyjal', 'molten core', 'hardcore', 'beta', 'q&a', 'classic'
];

function parseArgs(argv) {
  let jsonOut = null;
  let since = defaultSince;

  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];

    if (flag === '--json' || flag === '--since') {
      if (index + 1 >= argv.length) {
        throw new Error(`${flag} requires a value`);
      }

      if (flag === '--json') {
        jsonOut = argv[index + 1];
      } else {
        since = argv[index + 1];
      }

      index += 1;
    }
  }

  return { jsonOut, since };
}

function decode(value) {
  return value
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\\"/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, '’')
    .replace(/\\n/g, ' ')
    .trim();
}

// The news page ships its articles as JSON inside the HTML, so no API key is needed.
// The records are read as real JSON objects: field order differs between records, so picking
// fields by proximity to the URL silently mixes neighbouring articles together.
const articleUrl = /"default_url":"https:\/\/worldofwarcraft\.com\/en-us\/news\/(\d+)"/;
const maxRecordLength = 40_000;

export function extractArticles(html) {
  const articles = new Map();
  const openBraces = [];
  let inString = false;
  let escaped = false;

  for (let index = 0; index < html.length; index += 1) {
    const character = html[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }

      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === '{') {
      openBraces.push(index);
      continue;
    }

    if (character !== '}' || openBraces.length === 0) {
      continue;
    }

    // The smallest object carrying the article URL is the record itself; it closes before its parents.
    const start = openBraces.pop();
    const length = index + 1 - start;

    if (length > maxRecordLength) {
      continue;
    }

    const candidate = html.slice(start, index + 1);
    const match = candidate.match(articleUrl);

    if (!match || articles.has(match[1])) {
      continue;
    }

    let record;

    try {
      record = JSON.parse(candidate);
    } catch {
      continue;
    }

    if (typeof record.title !== 'string' || typeof record.publish !== 'number') {
      continue;
    }

    articles.set(match[1], {
      id: match[1],
      title: decode(record.title),
      summary: typeof record.summary === 'string' ? decode(record.summary) : '',
      url: `https://worldofwarcraft.blizzard.com/en-us/news/${match[1]}`,
      publishedAt: new Date(record.publish).toISOString().slice(0, 10)
    });
  }

  return [...articles.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function isRelevant(article) {
  const haystack = `${article.title} ${article.summary}`.toLowerCase();

  return keywords.some((keyword) => haystack.includes(keyword));
}

async function knownArticleIds() {
  const sources = JSON.parse(await readFile(sourcesFile, 'utf8'));
  const ids = new Set();

  for (const source of sources) {
    for (const id of (source.url ?? '').matchAll(/\/(\d{6,})(?:\/|$)/g)) {
      ids.add(id[1]);
    }
  }

  return ids;
}

async function main() {
  const { jsonOut, since } = parseArgs(process.argv.slice(2));
  const response = await fetch(newsUrl, { headers: { 'user-agent': 'wow-forever-encyclopedia-source-watch' } });

  if (!response.ok) {
    throw new Error(`${newsUrl} answered HTTP ${response.status}`);
  }

  const known = await knownArticleIds();
  const articles = extractArticles(await response.text());

  if (articles.length === 0) {
    throw new Error(`No articles found on ${newsUrl} — the page format probably changed`);
  }

  const unregistered = articles.filter(
    (article) => article.publishedAt >= since && isRelevant(article) && !known.has(article.id)
  );

  console.log(`Checked ${articles.length} articles on ${newsUrl}, cut-off ${since}.`);

  for (const article of unregistered) {
    console.log(`\nNEW  ${article.publishedAt}  ${article.title}\n     ${article.url}\n     ${article.summary}`);
  }

  if (unregistered.length === 0) {
    console.log('\nEvery relevant article is already registered in src/content/sources/core.json.');
  } else {
    console.log(`\n${unregistered.length} article(s) not registered as sources yet.`);
  }

  if (jsonOut) {
    await writeFile(jsonOut, JSON.stringify({ checkedAt: new Date().toISOString(), since, unregistered, articles }, null, 2));
  }

  process.exitCode = unregistered.length > 0 ? 20 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
