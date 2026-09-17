import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { searchDocuments, serializeSearchIndex, stem, tokenize, type SearchDocument } from '../src/lib/search';

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
    const terms = searchDocuments(documents, 'Horde', { type: 'Термин' }).map((document) => document.id);

    expect(terms.length).toBeGreaterThan(0);
    expect([...terms].sort()).toEqual(['glossary/azeroth', 'glossary/dark-portal', 'glossary/forsaken', 'glossary/horde']);
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

describe('search index serialization', () => {
  it('escapes "<" so content can never close the embedded script tag', () => {
    const payload = [{ id: 'x', title: '</script><script>alert(1)</script>', summary: 'a < b', href: '/WOW/x', type: 'Глава', status: 'ESTABLISHED', keywords: [] }];
    const serialized = serializeSearchIndex(payload as never);

    expect(serialized).not.toContain('<');
    expect(JSON.parse(serialized)[0].title).toBe('</script><script>alert(1)</script>');
  });
});
