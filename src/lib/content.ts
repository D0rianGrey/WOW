import { z } from 'astro/zod';

import { loreStatuses } from './status';

export const confidenceLevels = ['high', 'medium', 'low'] as const;

export type Confidence = (typeof confidenceLevels)[number];

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected an ISO date in YYYY-MM-DD format');

const loreFields = {
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  status: z.enum(loreStatuses),
  era: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  spoilerLevel: z.number().int().min(0),
  sourceIds: z.array(z.string().trim().min(1)),
  updatedAt: dateSchema,
  confidence: z.enum(confidenceLevels)
} as const;

const baseLoreSchema = z.object(loreFields).superRefine((entry, context) => {
  if (entry.status === 'FOREVER' && entry.sourceIds.length === 0) {
    context.addIssue({
      code: 'custom',
      path: ['sourceIds'],
      message: 'FOREVER lore must cite at least one source'
    });
  }
});

export function createLoreSchema<T extends z.ZodRawShape>(extraFields: T) {
  return baseLoreSchema.safeExtend(extraFields);
}

export const loreEntrySchema = createLoreSchema({});

export const chapterEntrySchema = z.object({
  ...loreFields,
  order: z.number().int().min(0),
  readingMinutes: z.number().int().min(1)
}).superRefine((entry, context) => {
  if (entry.status === 'FOREVER' && entry.sourceIds.length === 0) {
    context.addIssue({
      code: 'custom',
      path: ['sourceIds'],
      message: 'FOREVER lore must cite at least one source'
    });
  }
});

export const timelineEntrySchema = createLoreSchema({
  dateLabel: z.string().trim().min(1),
  sortKey: z.number(),
  major: z.boolean(),
  characterIds: z.array(z.string().trim().min(1)),
  factionIds: z.array(z.string().trim().min(1)),
  locationIds: z.array(z.string().trim().min(1)),
  chapterSlug: z.string().trim().min(1)
});

export const sourceSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.url(),
  type: z.string().trim().min(1),
  publishedAt: dateSchema.optional(),
  notes: z.string().trim().min(1).optional()
});

export type LoreEntry = z.infer<typeof loreEntrySchema>;
export type ChapterEntry = z.infer<typeof chapterEntrySchema>;
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;
export type Source = z.infer<typeof sourceSchema>;

const referenceTargets = {
  sourceIds: 'sources',
  characterIds: 'characters',
  factionIds: 'factions',
  locationIds: 'locations',
  chapterSlug: 'chapters'
} as const;

export type ReferenceCollection = (typeof referenceTargets)[keyof typeof referenceTargets];
export type ReferenceRegistry = Partial<Record<ReferenceCollection, Iterable<string>>>;

export function assertValidContentReferences(
  entries: ReadonlyArray<{ id: string; [field: string]: unknown }>,
  registry: ReferenceRegistry
): void {
  const problems: string[] = [];

  for (const entry of entries) {
    for (const [field, target] of Object.entries(referenceTargets)) {
      const registeredIds = registry[target as ReferenceCollection];
      if (registeredIds === undefined) continue;

      const value = entry[field];
      const referenceIds = Array.isArray(value)
        ? value.filter((referenceId): referenceId is string => typeof referenceId === 'string')
        : typeof value === 'string'
          ? [value]
          : [];
      const knownIds = new Set(registeredIds);

      for (const referenceId of referenceIds) {
        if (!knownIds.has(referenceId)) {
          problems.push(`${entry.id}.${field} -> ${target}: ${referenceId}`);
        }
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(`Invalid content references:\n${problems.map((problem) => `- ${problem}`).join('\n')}`);
  }
}

export function validateChapterSourceIds(
  chapters: ReadonlyArray<{ id: string; data: { sourceIds: string[] } }>,
  sources: ReadonlyArray<{ id: string }>
): void {
  assertValidContentReferences(
    chapters.map((chapter) => ({ id: chapter.id, sourceIds: chapter.data.sourceIds })),
    { sources: sources.map((source) => source.id) }
  );
}
