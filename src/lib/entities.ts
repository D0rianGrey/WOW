import { getCollection } from 'astro:content';

export const entityCollections = ['characters', 'factions', 'locations'] as const;

export type EntityCollection = (typeof entityCollections)[number];

export interface EntityRegistry {
  ids: Record<EntityCollection, string[]>;
  names: Record<string, string>;
}

// The dossiers are the registry: adding a character means adding its Markdown file, nothing else.
// Referential integrity still holds, because an unknown ID has no dossier and fails validation.
export async function loadEntityRegistry(): Promise<EntityRegistry> {
  const ids = {} as Record<EntityCollection, string[]>;
  const names: Record<string, string> = {};

  for (const collection of entityCollections) {
    const entries = await getCollection(collection);
    ids[collection] = entries.map((entry) => entry.data.id);

    for (const entry of entries) {
      names[entry.data.id] = entry.data.title;
    }
  }

  return { ids, names };
}
