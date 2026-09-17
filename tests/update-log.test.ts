import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { updateLogEntrySchema } from '../src/lib/content';
import { contentRefExists, loadContentIds } from './helpers/content-index';

const baseRecord = {
  id: '2026-11-04-launch-date',
  date: '2026-11-04',
  entityIds: ['forever/announced-schedule'],
  status: 'FOREVER',
  summary: 'Launch confirmed.',
  sourceIds: ['forever-hub']
} as const;

describe('updateLogEntrySchema', () => {
  it('accepts a sourced record with an optional commit and superseded record', () => {
    const result = updateLogEntrySchema.safeParse({
      ...baseRecord,
      supersedes: '2026-09-17-forever-announcements-baseline',
      commitSha: '8fe3edb'
    });

    expect(result.success).toBe(true);
  });

  it('rejects non-established records without sources, bare entity IDs and malformed hashes', () => {
    expect(updateLogEntrySchema.safeParse({ ...baseRecord, status: 'CHANGED', sourceIds: [] }).success).toBe(false);
    expect(updateLogEntrySchema.safeParse({ ...baseRecord, entityIds: ['announced-schedule'] }).success).toBe(false);
    expect(updateLogEntrySchema.safeParse({ ...baseRecord, entityIds: [] }).success).toBe(false);
    expect(updateLogEntrySchema.safeParse({ ...baseRecord, commitSha: 'HEAD' }).success).toBe(false);
    expect(updateLogEntrySchema.safeParse({ ...baseRecord, id: 'launch-date' }).success).toBe(false);
  });
});

describe('update log', () => {
  const records = (JSON.parse(readFileSync(resolve('src/content/update-log/entries.json'), 'utf8')) as unknown[])
    .map((raw) => updateLogEntrySchema.parse(raw));
  const index = loadContentIds();

  it('is append-only in date order with unique IDs that start with their date', () => {
    const ids = records.map((record) => record.id);
    const dates = records.map((record) => record.date);

    expect(records.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
    expect(dates).toEqual([...dates].sort());

    for (const record of records) {
      expect(record.id.startsWith(record.date), record.id).toBe(true);
    }
  });

  it('references existing content and registered sources', () => {
    for (const record of records) {
      for (const ref of record.entityIds) {
        expect(contentRefExists(index, ref), `${record.id} → ${ref}`).toBe(true);
      }

      for (const sourceId of record.sourceIds) {
        expect(index.get('sources')?.has(sourceId), `${record.id} → ${sourceId}`).toBe(true);
      }
    }
  });

  it('only supersedes an earlier record', () => {
    records.forEach((record, position) => {
      if (record.supersedes) {
        const earlier = records.slice(0, position).map((candidate) => candidate.id);

        expect(earlier, record.id).toContain(record.supersedes);
      }
    });
  });
});
