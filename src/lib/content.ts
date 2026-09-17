import { z } from 'astro/zod';

import { eraIds } from './eras';
import { loreStatuses, type LoreStatus } from './status';

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

interface SourcedEntry {
  status: LoreStatus;
  sourceIds: string[];
}

// Anything newer or less certain than established history must show where it came from.
function requireSourcesUnlessEstablished(entry: SourcedEntry, context: z.core.$RefinementCtx<SourcedEntry>): void {
  if (entry.status !== 'ESTABLISHED' && entry.sourceIds.length === 0) {
    context.addIssue({
      code: 'custom',
      path: ['sourceIds'],
      message: `${entry.status} lore must cite at least one source`
    });
  }
}

const baseLoreSchema = z.object(loreFields).superRefine(requireSourcesUnlessEstablished);

export function createLoreSchema<T extends z.ZodRawShape>(extraFields: T) {
  return baseLoreSchema.safeExtend(extraFields);
}

export const loreEntrySchema = createLoreSchema({});

// Built from the raw fields rather than createLoreSchema: the generic helper erases the field types
// that chapter pages rely on (order, readingMinutes, sourceIds).
export const chapterEntrySchema = z.object({
  ...loreFields,
  order: z.number().int().min(0),
  readingMinutes: z.number().int().min(1)
}).superRefine(requireSourcesUnlessEstablished);

// A plain object schema (not createLoreSchema) so pages keep typed access to every field.
export const timelineEntrySchema = z.object({
  ...loreFields,
  eraId: z.enum(eraIds),
  dateLabel: z.string().trim().min(1),
  dateNote: z.string().trim().min(1).optional(),
  approximate: z.boolean(),
  sortKey: z.number(),
  major: z.boolean(),
  characterIds: z.array(z.string().trim().min(1)),
  factionIds: z.array(z.string().trim().min(1)),
  locationIds: z.array(z.string().trim().min(1)),
  chapterSlug: z.string().trim().min(1)
}).superRefine(requireSourcesUnlessEstablished);

export const sourceTypes = [
  'official-article',
  'official-announcement',
  'official-retrospective',
  'official-preview',
  'official-promo',
  'official-manual',
  'official-book',
  'official-fiction',
  'in-game'
] as const;

export type SourceType = (typeof sourceTypes)[number];

export const sourceSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.url().optional(),
  citation: z.string().trim().min(1).optional(),
  type: z.enum(sourceTypes),
  publishedAt: dateSchema.optional(),
  checkedAt: dateSchema.optional(),
  notes: z.string().trim().min(1).optional()
}).superRefine((source, context) => {
  // Printed books have no reader-openable URL, so they must carry a precise citation instead.
  if (source.url === undefined && source.citation === undefined) {
    context.addIssue({
      code: 'custom',
      path: ['url'],
      message: 'A source needs a url or, for printed material, a citation'
    });
  }
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
