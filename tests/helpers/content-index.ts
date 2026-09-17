import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const contentDir = resolve('src/content');
const markdownCollections = ['chapters', 'characters', 'factions', 'locations', 'forever'];
const jsonCollections: Record<string, string> = {
  timeline: 'core.json',
  glossary: 'core.json',
  sources: 'core.json'
};

function markdownIds(collection: string): string[] {
  const dir = resolve(contentDir, collection);

  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => readFileSync(resolve(dir, file), 'utf8').match(/\nid: "?([^"\n]+)"?\n/)?.[1] ?? file);
}

function jsonIds(collection: string, file: string): string[] {
  const path = resolve(contentDir, collection, file);

  if (!existsSync(path)) {
    return [];
  }

  return (JSON.parse(readFileSync(path, 'utf8')) as { id: string }[]).map((entry) => entry.id);
}

/** IDs of every content entry, keyed by collection name, read straight from the files. */
export function loadContentIds(): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();

  for (const collection of markdownCollections) {
    index.set(collection, new Set(markdownIds(collection)));
  }

  for (const [collection, file] of Object.entries(jsonCollections)) {
    index.set(collection, new Set(jsonIds(collection, file)));
  }

  return index;
}

/** True when a "collection/id" reference names an existing entry. */
export function contentRefExists(index: Map<string, Set<string>>, ref: string): boolean {
  const [collection, id] = ref.split('/');

  return index.get(collection)?.has(id) ?? false;
}

export const entityCollections = ['characters', 'factions', 'locations'] as const;

export type EntityCollection = (typeof entityCollections)[number];

/** Entity IDs as the dossiers define them — the same registry the site builds from. */
export function loadEntityIds(): Record<EntityCollection, string[]> {
  const index = loadContentIds();

  return Object.fromEntries(
    entityCollections.map((collection) => [collection, [...(index.get(collection) ?? [])].sort()])
  ) as Record<EntityCollection, string[]>;
}
