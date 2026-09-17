import { z } from 'astro/zod';

import { eraIds } from './eras';
import { loreStatuses, type LoreStatus } from './status';

export const confidenceLevels = ['high', 'medium', 'low'] as const;

export type Confidence = (typeof confidenceLevels)[number];

// Shown next to the lore badge: a reader should see when the sources are thin, not only the editor.
export const confidenceLabels: Record<Confidence, string> = {
  high: 'Источники прямые',
  medium: 'Источники косвенные',
  low: 'Источники спорные'
};

// A real calendar date, not just the right shape: 2026-02-30 would sort and render as a fact.
function isCalendarDate(value: string): boolean {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected an ISO date in YYYY-MM-DD format')
  .refine(isCalendarDate, 'Expected a date that exists in the calendar');

// Blizzard keeps the Warcraft II and III manuals on an FTP host that has no working certificate;
// everything else must be https, so no source can ship a javascript:, data: or file: link.
const httpOnlyHosts = new Set(['ftp.blizzard.com']);

export function isPublishableSourceUrl(value: string): boolean {
  let url;

  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.username !== '' || url.password !== '') {
    return false;
  }

  if (url.protocol === 'https:') {
    return true;
  }

  return url.protocol === 'http:' && httpOnlyHosts.has(url.hostname);
}

const loreFields = {
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  status: z.enum(loreStatuses),
  era: z.string().trim().min(1),
  summary: z.string().trim().min(1),
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

// Character, faction and location dossiers; related IDs must be registered canonical IDs.
export const dossierEntrySchema = z.object({
  ...loreFields,
  aliases: z.array(z.string().trim().min(1)),
  relatedCharacterIds: z.array(z.string().trim().min(1)),
  relatedFactionIds: z.array(z.string().trim().min(1)),
  relatedLocationIds: z.array(z.string().trim().min(1))
}).superRefine(requireSourcesUnlessEstablished);

// Glossary terms: the Russian title explains an original English term.
export const glossaryEntrySchema = z.object({
  ...loreFields,
  term: z.string().trim().min(1),
  // Conventions of this encyclopedia (lore statuses, dating rules) carry no lore status badge.
  editorial: z.boolean().default(false),
  aliases: z.array(z.string().trim().min(1))
}).superRefine(requireSourcesUnlessEstablished);

export const foreverEntryKinds = ['change', 'schedule'] as const;

// Forever comparison entries: what original WoW Year 1 had versus what Forever announces.
export const foreverEntrySchema = z.object({
  ...loreFields,
  kind: z.enum(foreverEntryKinds),
  order: z.number().int().min(0),
  oldExpectation: z.string().trim().min(1),
  foreverVersion: z.string().trim().min(1),
  whyItMatters: z.string().trim().min(1),
  sourceNote: z.string().trim().min(1).optional()
}).superRefine(requireSourcesUnlessEstablished);

const entityRefSchema = z.string().trim().regex(/^[a-z-]+\/[a-z0-9-]+$/, 'Expected a "collection/id" reference');

// Editorial record of what changed in the encyclopedia; entityRefs use "collection/id".
export const changelogEntrySchema = z.object({
  id: z.string().trim().min(1),
  date: dateSchema,
  version: z.string().trim().min(1),
  title: z.string().trim().min(1),
  changes: z.array(z.string().trim().min(1)).min(1),
  entityRefs: z.array(entityRefSchema)
});

// Machine-readable lore history for people and the future monitoring automation.
// Records are append-only: a correction adds a new record that names the old one in `supersedes`.
// Contract: docs/automation/lore-update-contract.md
export const updateLogEntrySchema = z.object({
  id: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/, 'Expected "YYYY-MM-DD-slug"'),
  date: dateSchema,
  entityIds: z.array(entityRefSchema).min(1),
  status: z.enum(loreStatuses),
  summary: z.string().trim().min(1),
  sourceIds: z.array(z.string().trim().min(1)),
  supersedes: z.string().trim().min(1).optional(),
  commitSha: z.string().regex(/^[0-9a-f]{7,40}$/, 'Expected a git commit hash').optional()
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
  'official-forum',
  'in-game'
] as const;

export type SourceType = (typeof sourceTypes)[number];

export const sourceSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.url().refine(isPublishableSourceUrl, 'Expected an https URL (http only for ftp.blizzard.com)').optional(),
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
export type ForeverEntry = z.infer<typeof foreverEntrySchema>;
export type DossierEntry = z.infer<typeof dossierEntrySchema>;
export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>;
export type ChangelogEntry = z.infer<typeof changelogEntrySchema>;
export type UpdateLogEntry = z.infer<typeof updateLogEntrySchema>;
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
