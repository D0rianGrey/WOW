import { getCollection } from 'astro:content';

import { loadEntityRegistry } from './entities';
import type { DossierEntry } from './content';
import { route } from './routes';
import type { SearchDocument } from './search';

// Built only from titles, summaries, aliases and entity names — never from chapter bodies or
// SpoilerBlock content — so search cannot surface hidden later-Retail material.
export async function buildSearchIndex(): Promise<SearchDocument[]> {
  const { names: entityNames } = await loadEntityRegistry();
  const [chapters, timeline, characters, factions, locations, forever, glossary] = await Promise.all([
    getCollection('chapters'),
    getCollection('timeline'),
    getCollection('characters'),
    getCollection('factions'),
    getCollection('locations'),
    getCollection('forever'),
    getCollection('glossary')
  ]);

  const dossierDocs = (entries: readonly { data: DossierEntry }[], type: string, collection: string) => {
    return entries.map((entry) => ({
      id: `${collection}/${entry.data.id}`,
      type,
      title: entry.data.title,
      summary: entry.data.summary,
      href: route(`${collection}/${entry.data.slug}`),
      status: entry.data.status,
      keywords: entry.data.aliases
    }));
  };

  return [
    ...chapters.map((entry) => ({
      id: `chapters/${entry.data.id}`,
      type: 'Глава',
      title: entry.data.title,
      summary: entry.data.summary,
      href: route(`chapters/${entry.data.slug}`),
      status: entry.data.status,
      keywords: []
    })),
    ...timeline.map((entry) => ({
      id: `timeline/${entry.data.id}`,
      type: 'Событие',
      title: entry.data.title,
      summary: entry.data.summary,
      href: route(`timeline#${entry.data.id}`),
      status: entry.data.status,
      keywords: [...entry.data.characterIds, ...entry.data.factionIds, ...entry.data.locationIds].map((id) => entityNames[id] ?? id)
    })),
    ...dossierDocs(characters, 'Персонаж', 'characters'),
    ...dossierDocs(factions, 'Фракция', 'factions'),
    ...dossierDocs(locations, 'Место', 'locations'),
    ...forever.map((entry) => ({
      id: `forever/${entry.data.id}`,
      type: 'Изменение Forever',
      title: entry.data.title,
      summary: entry.data.summary,
      href: route(`forever-changes#${entry.data.id}`),
      status: entry.data.status,
      keywords: []
    })),
    ...glossary.map((entry) => ({
      id: `glossary/${entry.data.id}`,
      type: 'Термин',
      title: entry.data.title,
      summary: entry.data.summary,
      href: route(`glossary#${entry.data.id}`),
      status: entry.data.status,
      keywords: [entry.data.term, ...entry.data.aliases]
    }))
  ];
}
