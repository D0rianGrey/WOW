import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { canonicalIds } from '../src/lib/canonical-ids';
import { timelineEntrySchema } from '../src/lib/content';
import { eras } from '../src/lib/eras';
import { filterTimeline, matchesTimelineFilter, sortTimeline } from '../src/lib/timeline';

const events = (JSON.parse(readFileSync(resolve('src/content/timeline/core.json'), 'utf8')) as unknown[]).map(
  (raw) => timelineEntrySchema.parse(raw)
);

function fixture(id: string, sortKey: number, overrides: Partial<(typeof events)[number]> = {}) {
  return {
    ...events[0],
    id,
    slug: id,
    sortKey,
    ...overrides
  };
}

describe('sortTimeline', () => {
  it('orders by sortKey and breaks ties by id without inventing dates', () => {
    const sorted = sortTimeline([
      fixture('b-event', 20),
      fixture('approximate', 10, { approximate: true }),
      fixture('a-event', 20)
    ]);

    expect(sorted.map((event) => event.id)).toEqual(['approximate', 'a-event', 'b-event']);
  });
});

describe('filterTimeline', () => {
  const sample = [
    fixture('one', 10, { eraId: 'ancient', factionIds: ['night-elves'], characterIds: ['queen-azshara'], locationIds: ['kalimdor'] }),
    fixture('two', 20, { eraId: 'ancient', factionIds: ['burning-legion'], characterIds: [], locationIds: ['kalimdor'] }),
    fixture('three', 30, { eraId: 'bridge', status: 'FOREVER', factionIds: ['forsaken'], characterIds: ['garek-bandarion'], locationIds: ['undercity'] })
  ];

  it('filters within the same era by faction, character and location', () => {
    expect(filterTimeline(sample, { eraId: 'ancient' }).map((event) => event.id)).toEqual(['one', 'two']);
    expect(filterTimeline(sample, { eraId: 'ancient', factionId: 'burning-legion' }).map((event) => event.id)).toEqual(['two']);
    expect(filterTimeline(sample, { characterId: 'queen-azshara' }).map((event) => event.id)).toEqual(['one']);
    expect(filterTimeline(sample, { locationId: 'kalimdor' }).map((event) => event.id)).toEqual(['one', 'two']);
  });

  it('filters by lore status and matches everything without a filter', () => {
    expect(filterTimeline(sample, { status: 'FOREVER' }).map((event) => event.id)).toEqual(['three']);
    expect(sample.every((event) => matchesTimelineFilter(event, {}))).toBe(true);
  });
});

describe('timeline data', () => {
  it('has real events with unique ids and sort keys and exactly one Forever anchor', () => {
    expect(events.length).toBeGreaterThanOrEqual(20);
    expect(new Set(events.map((event) => event.id)).size).toBe(events.length);
    expect(new Set(events.map((event) => event.sortKey)).size).toBe(events.length);
    expect(events.filter((event) => event.id === 'forever')).toHaveLength(1);
    expect(sortTimeline(events).at(-1)?.id).toBe('forever');
  });

  it('keeps eras contiguous and in spec order', () => {
    const eraOrder = eras.map((era) => era.id as string);
    const sequence = sortTimeline(events).map((event) => eraOrder.indexOf(event.eraId));

    expect(sequence.every((index, position) => position === 0 || index >= sequence[position - 1])).toBe(true);
  });

  it('references only registered entities and existing chapters', () => {
    const chapterSlugs = readdirSync(resolve('src/content/chapters')).map((file) => {
      return readFileSync(resolve('src/content/chapters', file), 'utf8').match(/\nslug: (.+)\n/)?.[1].trim();
    });

    for (const event of events) {
      expect(chapterSlugs, event.id).toContain(event.chapterSlug);

      for (const id of event.characterIds) {
        expect(canonicalIds.characters as readonly string[], `${event.id} character`).toContain(id);
      }

      for (const id of event.factionIds) {
        expect(canonicalIds.factions as readonly string[], `${event.id} faction`).toContain(id);
      }

      for (const id of event.locationIds) {
        expect(canonicalIds.locations as readonly string[], `${event.id} location`).toContain(id);
      }
    }
  });

  it('never prints a calendar year for an approximate date', () => {
    for (const event of events.filter((item) => item.approximate)) {
      expect(event.dateLabel, event.id).not.toMatch(/\b\d{3,4}\b(?! лет)/);
    }
  });
});
