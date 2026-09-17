import { getCollection, type CollectionEntry } from 'astro:content';

import { canonicalIds } from './canonical-ids';
import { assertValidContentReferences } from './content';

export type DossierCollection = 'characters' | 'factions' | 'locations';

export const dossierLabels: Record<DossierCollection, { title: string; singular: string; lead: string }> = {
  characters: {
    title: 'Персонажи',
    singular: 'Персонаж',
    lead: 'Герои и злодеи, чьи решения определили мир первого года. Каждое досье описывает персонажа на момент старта Forever и опирается на официальные источники.'
  },
  factions: {
    title: 'Фракции',
    singular: 'Фракция',
    lead: 'Союзы, народы и армии Azeroth: кто они, чего хотят и где стоят к первому году. Новые группы Forever описаны только в пределах опубликованного.'
  },
  locations: {
    title: 'Места',
    singular: 'Место',
    lead: 'Земли, где творилась история, и новые места Forever: что здесь произошло, кто правит сейчас и что ждёт игрока.'
  }
};

// Validates every dossier's sources and related IDs once per build; unknown IDs fail the build.
export async function loadDossiers(collection: DossierCollection) {
  const entries = (await getCollection(collection)) as CollectionEntry<DossierCollection>[];
  const sources = await getCollection('sources');

  assertValidContentReferences(
    entries.map((entry) => ({
      id: entry.data.id,
      sourceIds: entry.data.sourceIds,
      characterIds: entry.data.relatedCharacterIds,
      factionIds: entry.data.relatedFactionIds,
      locationIds: entry.data.relatedLocationIds
    })),
    {
      sources: sources.map((source) => source.id),
      characters: canonicalIds.characters,
      factions: canonicalIds.factions,
      locations: canonicalIds.locations
    }
  );

  return entries.sort((left, right) => left.data.title.localeCompare(right.data.title));
}
