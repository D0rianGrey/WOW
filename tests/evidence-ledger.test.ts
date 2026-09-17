import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { listField, loadJsonEntries, loadMarkdownEntries } from './helpers/content-entries';

interface LedgerEntry {
  id: string;
  claim: string;
  sourceId: string;
  quote: string;
  locator?: string;
  chapterIds: string[];
  entryRefs?: string[];
  url?: string;
}

const evidenceDir = resolve('docs/research/evidence');
const chapterDir = resolve('src/content/chapters');

const sources: { id: string; url?: string }[] = JSON.parse(
  readFileSync(resolve('src/content/sources/core.json'), 'utf8')
);

const ledger: LedgerEntry[] = readdirSync(evidenceDir)
  .filter((file) => file.endsWith('.json'))
  .flatMap((file) => JSON.parse(readFileSync(resolve(evidenceDir, file), 'utf8')) as LedgerEntry[]);

const chapters = loadMarkdownEntries('chapters').map((entry) => ({
  file: entry.file,
  id: String(entry.data.id),
  sourceIds: listField(entry, 'sourceIds')
}));

interface ContentEntry {
  collection: string;
  id: string;
  sourceIds: string[];
}

// Non-chapter content that must be backed by the ledger, addressed as "collection/id" in entryRefs.
function collectionEntries(entries: ReturnType<typeof loadMarkdownEntries>): ContentEntry[] {
  return entries.map((entry) => ({
    collection: entry.collection,
    id: String(entry.data.id),
    sourceIds: listField(entry, 'sourceIds')
  }));
}

const contentEntries: ContentEntry[] = [
  ...collectionEntries(loadJsonEntries('timeline', 'core.json')),
  ...collectionEntries(loadJsonEntries('glossary', 'core.json')),
  ...collectionEntries(loadMarkdownEntries('characters')),
  ...collectionEntries(loadMarkdownEntries('factions')),
  ...collectionEntries(loadMarkdownEntries('locations')),
  ...collectionEntries(loadMarkdownEntries('forever'))
];

function normalizeQuote(quote: string): string {
  return quote.toLowerCase().replace(/[^a-z0-9\u0430-\u044f\u0451]+/g, '');
}

describe('evidence ledger', () => {
  it('has unique ids and well-formed entries', () => {
    const ids = ledger.map((entry) => entry.id);

    expect(new Set(ids).size).toBe(ids.length);

    for (const entry of ledger) {
      expect(entry.claim.trim().length, entry.id).toBeGreaterThan(0);
      expect(entry.quote.trim().split(/\s+/).length, `${entry.id} quote is too short`).toBeGreaterThanOrEqual(8);
      expect(entry.url, `${entry.id} must reference a registered source, not a raw url`).toBeUndefined();
      expect(Array.isArray(entry.chapterIds), entry.id).toBe(true);
    }
  });

  it('stores each quote once, listing every entry that relies on it', () => {
    const seen = new Map<string, string>();

    for (const entry of ledger) {
      const key = `${entry.sourceId}|${normalizeQuote(entry.quote)}`;
      const first = seen.get(key);

      expect(first, `${entry.id} repeats the quote of ${first}: add an entryRef there instead`).toBeUndefined();
      seen.set(key, entry.id);
    }
  });

  it('references only registered sources and existing content', () => {
    const sourceIds = new Set(sources.map((source) => source.id));
    const chapterIds = new Set(chapters.map((chapter) => chapter.id));
    const contentRefs = new Set(contentEntries.map((entry) => `${entry.collection}/${entry.id}`));

    for (const entry of ledger) {
      expect(sourceIds.has(entry.sourceId), `${entry.id} -> unknown source ${entry.sourceId}`).toBe(true);
      expect(entry.chapterIds.length + (entry.entryRefs?.length ?? 0), `${entry.id} is used by nothing`).toBeGreaterThan(0);

      for (const chapterId of entry.chapterIds) {
        expect(chapterIds.has(chapterId), `${entry.id} -> unknown chapter ${chapterId}`).toBe(true);
      }

      for (const ref of entry.entryRefs ?? []) {
        expect(contentRefs.has(ref), `${entry.id} -> unknown entry ${ref}`).toBe(true);
      }
    }
  });

  it('backs every source a timeline, dossier, Forever or glossary entry cites with a quote for that entry', () => {
    for (const content of contentEntries) {
      const ref = `${content.collection}/${content.id}`;

      for (const sourceId of content.sourceIds) {
        const backed = ledger.some((entry) => entry.sourceId === sourceId && (entry.entryRefs ?? []).includes(ref));
        expect(backed, `${ref} cites ${sourceId} without ledger evidence`).toBe(true);
      }
    }
  });

  it('requires a page locator for PDF sources', () => {
    const pdfSources = new Set(sources.filter((source) => source.url?.toLowerCase().endsWith('.pdf')).map((source) => source.id));

    for (const entry of ledger.filter((item) => pdfSources.has(item.sourceId))) {
      expect(entry.locator, `${entry.id} needs a PDF page locator`).toMatch(/^PDF p\. \d+/);
    }
  });

  it('backs every source a chapter cites with at least one quote used by that chapter', () => {
    for (const chapter of chapters) {
      expect(chapter.sourceIds.length, `${chapter.file} cites no sources`).toBeGreaterThan(0);

      for (const sourceId of chapter.sourceIds) {
        const backed = ledger.some((entry) => entry.sourceId === sourceId && entry.chapterIds.includes(chapter.id));
        expect(backed, `${chapter.file} cites ${sourceId} without ledger evidence`).toBe(true);
      }
    }
  });

  it('keeps every registered source in use', () => {
    for (const source of sources) {
      const used = ledger.some((entry) => entry.sourceId === source.id);
      expect(used, `${source.id} is registered but backs no claim`).toBe(true);
    }
  });
});
