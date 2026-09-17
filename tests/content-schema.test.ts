import { describe, expect, it } from 'vitest';

import {
  assertValidContentReferences,
  chapterEntrySchema,
  loreEntrySchema,
  sourceSchema,
  timelineEntrySchema,
  validateChapterSourceIds
} from '../src/lib/content';

const validLoreEntry = {
  id: 'zephras',
  title: 'Zephras',
  slug: 'zephras',
  status: 'FOREVER',
  era: 'World of Warcraft: Forever',
  summary: 'Skyborne starting region.',
  sourceIds: ['forever-found-photos'],
  updatedAt: '2026-09-17',
  confidence: 'high'
} as const;

describe('loreEntrySchema', () => {
  it('rejects an unknown lore status', () => {
    const result = loreEntrySchema.safeParse({
      ...validLoreEntry,
      status: 'RUMOR'
    });

    expect(result.success).toBe(false);
  });

  it('rejects FOREVER lore without a source', () => {
    const result = loreEntrySchema.safeParse({
      ...validLoreEntry,
      sourceIds: []
    });

    expect(result.success).toBe(false);
  });

  it('rejects BETA, CHANGED and UNCONFIRMED lore without a source', () => {
    for (const status of ['BETA', 'CHANGED', 'UNCONFIRMED'] as const) {
      const result = loreEntrySchema.safeParse({
        ...validLoreEntry,
        status,
        sourceIds: []
      });

      expect(result.success, status).toBe(false);
    }
  });

  it('allows established background history without a source', () => {
    const result = loreEntrySchema.safeParse({
      ...validLoreEntry,
      status: 'ESTABLISHED',
      sourceIds: []
    });

    expect(result.success).toBe(true);
  });

  it('rejects confidence values outside high, medium, and low', () => {
    const result = loreEntrySchema.safeParse({
      ...validLoreEntry,
      confidence: 'certain'
    });

    expect(result.success).toBe(false);
  });
});

describe('collection-specific schemas', () => {
  it('requires a positive reading time and stable order for guided chapters', () => {
    const result = chapterEntrySchema.parse({
      ...validLoreEntry,
      order: 1,
      readingMinutes: 7
    });

    expect(result.order).toBe(1);
    expect(result.readingMinutes).toBe(7);
    expect(chapterEntrySchema.safeParse({ ...validLoreEntry, order: -1, readingMinutes: 0 }).success).toBe(false);
  });

  it('accepts timeline linkage fields without manufacturing a numeric date', () => {
    const result = timelineEntrySchema.parse({
      ...validLoreEntry,
      eraId: 'ancient',
      approximate: true,
      dateLabel: 'около 10 000 лет до открытия Dark Portal',
      sortKey: -10000,
      major: true,
      characterIds: [],
      factionIds: ['night-elves'],
      locationIds: ['mount-hyjal'],
      chapterSlug: 'war-of-the-ancients'
    });

    expect(result.dateLabel).toBe('около 10 000 лет до открытия Dark Portal');
    expect(result.characterIds).toEqual([]);
    expect(result.factionIds).toEqual(['night-elves']);
    expect(result.locationIds).toEqual(['mount-hyjal']);
    expect(result.chapterSlug).toBe('war-of-the-ancients');
  });

  it('validates source records with their dedicated schema', () => {
    const result = sourceSchema.safeParse({
      id: 'forever-announcement',
      title: 'Carve a New Path with World of Warcraft: Forever',
      publisher: 'Blizzard Entertainment',
      url: 'https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever',
      type: 'official-article',
      publishedAt: '2026-09-12'
    });

    expect(result.success).toBe(true);
  });

  it('accepts a printed book with a citation instead of a url', () => {
    const result = sourceSchema.safeParse({
      id: 'chronicle-volume-1',
      title: 'World of Warcraft: Chronicle Volume 1',
      publisher: 'Blizzard Entertainment / Dark Horse Books',
      citation: 'Dark Horse Books, 2016',
      type: 'official-book'
    });

    expect(result.success).toBe(true);
  });

  it('rejects a source with neither url nor citation, or with an unknown type', () => {
    const base = {
      id: 'broken',
      title: 'Broken source',
      publisher: 'Blizzard Entertainment'
    };

    expect(sourceSchema.safeParse({ ...base, type: 'official-book' }).success).toBe(false);
    expect(sourceSchema.safeParse({ ...base, url: 'https://news.blizzard.com/', type: 'fan-wiki' }).success).toBe(false);
  });
});

describe('assertValidContentReferences', () => {
  it('rejects unknown source and entity IDs through one extensible boundary', () => {
    expect(() =>
      assertValidContentReferences(
        [
          {
            ...validLoreEntry,
            characterIds: ['missing-character']
          }
        ],
        {
          sources: ['different-source'],
          characters: []
        }
      )
    ).toThrow(/zephras.*sourceIds.*forever-found-photos.*characterIds.*missing-character/s);
  });

  it('rejects a chapter source ID missing from the source registry', () => {
    expect(() =>
      validateChapterSourceIds(
        [{ id: 'first-war', data: { sourceIds: ['known', 'missing'] } }],
        [{ id: 'known' }]
      )
    ).toThrow(/first-war.*missing/s);
  });
});

describe('source URL and date validation', () => {
  const base = {
    id: 'probe',
    title: 'Probe',
    publisher: 'Blizzard Entertainment',
    type: 'official-article'
  } as const;

  it('rejects executable and local URL schemes, and credentials in the URL', () => {
    for (const url of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'file:///etc/passwd', 'https://user:pass@news.blizzard.com/a']) {
      expect(sourceSchema.safeParse({ ...base, url }).success, url).toBe(false);
    }
  });

  it('accepts https and the Blizzard FTP manuals over http', () => {
    expect(sourceSchema.safeParse({ ...base, url: 'https://news.blizzard.com/en-us/article/1/x' }).success).toBe(true);
    expect(sourceSchema.safeParse({ ...base, url: 'http://ftp.blizzard.com/pub/misc/Warcraft%20III%20Manual.pdf' }).success).toBe(true);
    expect(sourceSchema.safeParse({ ...base, url: 'http://news.blizzard.com/en-us/article/1/x' }).success).toBe(false);
  });

  it('rejects dates that match the format but do not exist', () => {
    for (const publishedAt of ['2026-02-30', '2026-13-01', '0000-00-00']) {
      expect(sourceSchema.safeParse({ ...base, url: 'https://news.blizzard.com/a', publishedAt }).success, publishedAt).toBe(false);
    }

    expect(sourceSchema.safeParse({ ...base, url: 'https://news.blizzard.com/a', publishedAt: '2026-02-28' }).success).toBe(true);
  });
});
