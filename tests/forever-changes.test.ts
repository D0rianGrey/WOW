import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { changelogEntrySchema } from '../src/lib/content';
import { contentRefExists, loadContentIds } from './helpers/content-index';

const foreverDir = resolve('src/content/forever');

function frontmatterValue(markdown: string, field: string): string | undefined {
  return markdown.match(new RegExp(`\\n${field}: (.+)\\n`))?.[1].trim();
}

describe('Forever changes', () => {
  const files = readdirSync(foreverDir).filter((file) => file.endsWith('.md'));

  it('covers the planned comparisons plus one schedule entry with unique order', () => {
    const ids = files.map((file) => frontmatterValue(readFileSync(resolve(foreverDir, file), 'utf8'), 'id'));
    const orders = files.map((file) => frontmatterValue(readFileSync(resolve(foreverDir, file), 'utf8'), 'order'));
    const kinds = files.map((file) => frontmatterValue(readFileSync(resolve(foreverDir, file), 'utf8'), 'kind'));

    for (const expected of ['time-bubble-year-1', 'forsaken-kingdom', 'forsaken-paladins', 'skyborne', 'zephras-isle', 'mount-hyjal-aftermath', 'shendralas', 'riverglades', 'race-class-combinations', 'dungeons-and-raids']) {
      expect(ids).toContain(expected);
    }

    expect(new Set(orders).size).toBe(orders.length);
    expect(kinds.filter((kind) => kind === 'schedule')).toHaveLength(1);
  });

  it('keeps every entry marked FOREVER and never presents announcements as observed beta results', () => {
    for (const file of files) {
      const markdown = readFileSync(resolve(foreverDir, file), 'utf8');

      expect(frontmatterValue(markdown, 'status'), file).toBe('FOREVER');
      expect(markdown, file).not.toMatch(/на бете (видно|подтвердилось)|по итогам беты/i);
    }
  });
});

describe('changelog', () => {
  it('has valid entries whose references point to existing content', () => {
    const path = resolve('src/content/changelog/entries.json');
    expect(existsSync(path)).toBe(true);
    const entries = (JSON.parse(readFileSync(path, 'utf8')) as unknown[]).map((raw) => changelogEntrySchema.parse(raw));
    const index = loadContentIds();

    for (const entry of entries) {
      for (const ref of entry.entityRefs) {
        expect(contentRefExists(index, ref), ref).toBe(true);
      }
    }
  });
});
