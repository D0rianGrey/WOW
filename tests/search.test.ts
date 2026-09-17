import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { searchDocuments, stem, tokenize, type SearchDocument } from '../src/lib/search';

const glossary = JSON.parse(readFileSync(resolve('src/content/glossary/core.json'), 'utf8')) as {
  id: string;
  title: string;
  summary: string;
  status: SearchDocument['status'];
  term: string;
  aliases: string[];
}[];

const documents: SearchDocument[] = [
  { id: 'characters/arthas-menethil', type: 'Персонаж', title: 'Arthas Menethil', summary: 'Наследный принц Lordaeron, ставший новым Lich King.', href: '/WOW/characters/arthas-menethil', status: 'ESTABLISHED', keywords: ['Lich King', 'принц Arthas'] },
  { id: 'factions/windshapers', type: 'Фракция', title: 'Windshapers', summary: 'Одна из групп Skyborne на Zephras Isle.', href: '/WOW/factions/windshapers', status: 'FOREVER', keywords: ['Windshaper Horde'] },
  ...glossary.map((entry) => ({
    id: `glossary/${entry.id}`,
    type: 'Термин',
    title: entry.title,
    summary: entry.summary,
    href: `/WOW/glossary#${entry.id}`,
    status: entry.status,
    keywords: [entry.term, ...entry.aliases]
  }))
];

describe('search', () => {
  it('finds an exact English name', () => {
    expect(searchDocuments(documents, 'Arthas Menethil')[0].id).toBe('characters/arthas-menethil');
  });

  it('finds an entity by alias', () => {
    expect(searchDocuments(documents, 'Lich King').map((document) => document.id)).toContain('characters/arthas-menethil');
  });

  it('finds a glossary term by its Russian keyword and inflected forms', () => {
    for (const query of ['Орда', 'Орды', 'орде']) {
      expect(searchDocuments(documents, query).map((document) => document.id), query).toContain('glossary/horde');
    }
  });

  it('filters by lore status and type', () => {
    expect(searchDocuments(documents, 'Horde', { status: 'FOREVER' }).map((document) => document.id)).toEqual(['factions/windshapers']);
    expect(searchDocuments(documents, 'Horde', { type: 'Термин' }).every((document) => document.type === 'Термин')).toBe(true);
  });

  it('returns nothing for an empty or unmatched query', () => {
    expect(searchDocuments(documents, '')).toEqual([]);
    expect(searchDocuments(documents, 'Shadowlands')).toEqual([]);
  });

  it('normalises case, ё and apostrophes', () => {
    expect(tokenize('Kel’Thuzad')).toEqual(['kelthuzad']);
    expect(stem('орды')).toBe(stem('орда'));
  });

  it('never indexes chapter or dossier bodies', () => {
    const source = readFileSync(resolve('src/lib/search-index.ts'), 'utf8');

    expect(source).not.toMatch(/\.body\b|render\(/);
  });
});
