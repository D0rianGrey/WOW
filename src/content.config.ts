import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';

import {
  changelogEntrySchema,
  chapterEntrySchema,
  dossierEntrySchema,
  foreverEntrySchema,
  glossaryEntrySchema,
  sourceSchema,
  timelineEntrySchema
} from './lib/content';

const chapters = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/chapters' }),
  schema: chapterEntrySchema
});

const characters = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/characters' }),
  schema: dossierEntrySchema
});

const factions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/factions' }),
  schema: dossierEntrySchema
});

const locations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/locations' }),
  schema: dossierEntrySchema
});

const forever = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/forever' }),
  schema: foreverEntrySchema
});

const changelog = defineCollection({
  loader: file('src/content/changelog/entries.json'),
  schema: changelogEntrySchema
});

const timeline = defineCollection({
  loader: file('src/content/timeline/core.json'),
  schema: timelineEntrySchema
});

const glossary = defineCollection({
  loader: file('src/content/glossary/core.json'),
  schema: glossaryEntrySchema
});

const sources = defineCollection({
  loader: file('src/content/sources/core.json'),
  schema: sourceSchema
});

export const collections = {
  chapters,
  characters,
  factions,
  locations,
  forever,
  timeline,
  glossary,
  sources,
  changelog
};
