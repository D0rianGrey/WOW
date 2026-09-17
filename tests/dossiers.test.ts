import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { loadEntityIds } from './helpers/content-index';

const headings = {
  characters: ['## Кто это', '## Путь до первого года', '## В первый год', '## Почему это важно в Forever'],
  factions: ['## Происхождение', '## Лидеры и цели', '## В первый год', '## Почему это важно в Forever'],
  locations: ['## Где это', '## Что здесь произошло', '## Кто контролирует сейчас', '## Что может встретиться в Forever']
} as const;

function listField(markdown: string, field: string): string[] {
  const inline = markdown.match(new RegExp(`\\n${field}: \\[\\]\\n`));

  if (inline) {
    return [];
  }

  const block = markdown.match(new RegExp(`\\n${field}:\\n((?:  - .+\\n)+)`));
  return block ? block[1].trim().split('\n').map((line) => line.replace(/^\s*-\s*"?|"$/g, '').trim()) : [];
}

const entityIds = loadEntityIds();

describe('dossiers', () => {
  for (const collection of Object.keys(headings) as (keyof typeof headings)[]) {
    const directory = resolve('src/content', collection);
    const files = readdirSync(directory).filter((file) => file.endsWith('.md'));

    it(`${collection}: file name, frontmatter id and slug agree`, () => {
      expect(files.length).toBeGreaterThan(0);
      expect(files.map((file) => file.replace(/\.md$/, '')).sort()).toEqual(entityIds[collection]);
    });

    it(`${collection}: required sections, matching slug and registered related IDs`, () => {
      for (const file of files) {
        const markdown = readFileSync(resolve(directory, file), 'utf8');
        const id = file.replace(/\.md$/, '');

        expect(markdown, file).toMatch(new RegExp(`\\nid: ${id}\\n`));
        expect(markdown, file).toMatch(new RegExp(`\\nslug: ${id}\\n`));

        for (const heading of headings[collection]) {
          expect(markdown, `${file} misses ${heading}`).toContain(`${heading}\n`);
        }

        for (const related of listField(markdown, 'relatedCharacterIds')) {
          expect(entityIds.characters, `${file} -> ${related}`).toContain(related);
        }

        for (const related of listField(markdown, 'relatedFactionIds')) {
          expect(entityIds.factions, `${file} -> ${related}`).toContain(related);
        }

        for (const related of listField(markdown, 'relatedLocationIds')) {
          expect(entityIds.locations, `${file} -> ${related}`).toContain(related);
        }
      }
    });
  }

  it('keeps later Retail outcomes out of Year-1 dossiers', () => {
    const banned = /Broken Shore|Shadowlands|Icecrown Citadel|mana bomb|Cataclysm|Battle for Azeroth|val’kyr|Siege of Orgrimmar/i;

    for (const collection of Object.keys(headings)) {
      for (const file of readdirSync(resolve('src/content', collection))) {
        expect(readFileSync(resolve('src/content', collection, file), 'utf8'), `${collection}/${file}`).not.toMatch(banned);
      }
    }
  });
});
