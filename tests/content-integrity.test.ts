import { describe, expect, it } from 'vitest';

import {
  chapterEntrySchema,
  changelogEntrySchema,
  dossierEntrySchema,
  foreverEntrySchema,
  glossaryEntrySchema,
  sourceSchema,
  timelineEntrySchema,
  updateLogEntrySchema
} from '../src/lib/content';
import { listField, loadJsonEntries, loadMarkdownEntries, type ContentEntry } from './helpers/content-entries';

// The build validates references while rendering pages, so a deleted or renamed page would take its
// validation with it. This test owns the same guarantees and runs offline.
const collections: { entries: ContentEntry[]; schema: { parse: (value: unknown) => unknown } }[] = [
  { entries: loadMarkdownEntries('chapters'), schema: chapterEntrySchema },
  { entries: loadMarkdownEntries('characters'), schema: dossierEntrySchema },
  { entries: loadMarkdownEntries('factions'), schema: dossierEntrySchema },
  { entries: loadMarkdownEntries('locations'), schema: dossierEntrySchema },
  { entries: loadMarkdownEntries('forever'), schema: foreverEntrySchema },
  { entries: loadJsonEntries('timeline', 'core.json'), schema: timelineEntrySchema },
  { entries: loadJsonEntries('glossary', 'core.json'), schema: glossaryEntrySchema },
  { entries: loadJsonEntries('sources', 'core.json'), schema: sourceSchema },
  { entries: loadJsonEntries('changelog', 'entries.json'), schema: changelogEntrySchema },
  { entries: loadJsonEntries('update-log', 'entries.json'), schema: updateLogEntrySchema }
];

const entityCollections = ['characters', 'factions', 'locations'] as const;
const all = collections.flatMap((collection) => collection.entries);
const idsByCollection = new Map<string, Set<string>>();

for (const entry of all) {
  const ids = idsByCollection.get(entry.collection) ?? new Set<string>();
  ids.add(String(entry.data.id));
  idsByCollection.set(entry.collection, ids);
}

const sourceIds = idsByCollection.get('sources') ?? new Set<string>();

describe('content integrity', () => {
  it('parses and validates every entry of every collection against its schema', () => {
    expect(all.length).toBeGreaterThan(100);

    for (const { entries, schema } of collections) {
      expect(entries.length, 'a collection is empty').toBeGreaterThan(0);

      for (const entry of entries) {
        expect(() => schema.parse(entry.data), `${entry.collection}/${entry.file} (${entry.data.id})`).not.toThrow();
      }
    }
  });

  it('cites only registered sources', () => {
    for (const entry of all) {
      if (entry.collection === 'sources') {
        continue;
      }

      for (const sourceId of listField(entry, 'sourceIds')) {
        expect(sourceIds, `${entry.collection}/${entry.data.id} cites unknown source ${sourceId}`).toContain(sourceId);
      }
    }
  });

  it('links only to entities, chapters and events that exist', () => {
    const exists = (collection: string, id: string) => idsByCollection.get(collection)?.has(id) ?? false;
    const chapterSlugs = new Set(loadMarkdownEntries('chapters').map((chapter) => String(chapter.data.slug)));

    for (const entry of all) {
      const where = `${entry.collection}/${entry.data.id}`;

      for (const [field, collection] of [
        ['relatedCharacterIds', 'characters'],
        ['relatedFactionIds', 'factions'],
        ['relatedLocationIds', 'locations'],
        ['characterIds', 'characters'],
        ['factionIds', 'factions'],
        ['locationIds', 'locations']
      ] as const) {
        for (const id of listField(entry, field)) {
          expect(exists(collection, id), `${where} → ${collection}/${id} does not exist`).toBe(true);
        }
      }

      if (entry.collection === 'timeline') {
        expect(chapterSlugs, `${where} points at a missing chapter`).toContain(String(entry.data.chapterSlug));
      }

      for (const field of ['entityRefs', 'entityIds']) {
        for (const reference of listField(entry, field)) {
          const [collection, id] = reference.split('/');
          const known = collection === 'chapters' ? chapterSlugs.has(id) : exists(collection, id);

          expect(known, `${where} → ${reference} does not exist`).toBe(true);
        }
      }
    }
  });

  it('keeps one dossier per entity and no ID shared between collections', () => {
    const seen = new Map<string, string>();

    for (const collection of entityCollections) {
      for (const id of idsByCollection.get(collection) ?? []) {
        expect(seen.has(id), `${id} exists in ${seen.get(id)} and ${collection}`).toBe(false);
        seen.set(id, collection);
      }
    }
  });
});
