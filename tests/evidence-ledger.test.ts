import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

interface LedgerEntry {
  id: string;
  claim: string;
  sourceId: string;
  quote: string;
  locator?: string;
  chapterIds: string[];
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

function readFrontmatterList(markdown: string, field: string): string[] {
  const block = markdown.match(new RegExp(`\\n${field}:\\n((?:  - .+\\n)+)`));

  if (!block) {
    return [];
  }

  return block[1]
    .trim()
    .split('\n')
    .map((line) => line.replace(/^\s*-\s*/, '').trim());
}

const chapters = readdirSync(chapterDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const markdown = readFileSync(resolve(chapterDir, file), 'utf8');
    const id = markdown.match(/\nid: (.+)\n/)?.[1].trim() ?? file;
    return { file, id, sourceIds: readFrontmatterList(markdown, 'sourceIds') };
  });

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

  it('references only registered sources and existing chapters', () => {
    const sourceIds = new Set(sources.map((source) => source.id));
    const chapterIds = new Set(chapters.map((chapter) => chapter.id));

    for (const entry of ledger) {
      expect(sourceIds.has(entry.sourceId), `${entry.id} -> unknown source ${entry.sourceId}`).toBe(true);

      for (const chapterId of entry.chapterIds) {
        expect(chapterIds.has(chapterId), `${entry.id} -> unknown chapter ${chapterId}`).toBe(true);
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
