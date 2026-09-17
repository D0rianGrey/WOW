import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const chapterDir = resolve('src/content/chapters');

describe('guided lore chapter contract', () => {
  it('ships exactly eight ordered chapters with the required reading structure', () => {
    const files = readdirSync(chapterDir).filter((file) => file.endsWith('.md')).sort();
    expect(files).toEqual([
      '00-azeroth-before-civilization.md',
      '01-war-of-the-ancients.md',
      '02-kingdoms-and-peoples.md',
      '03-orcs-and-humans.md',
      '04-second-war.md',
      '05-thrall-and-new-horde.md',
      '06-arthas-and-lordaeron.md',
      '07-third-war-to-forever.md'
    ]);

    for (const [order, file] of files.entries()) {
      const chapter = readFileSync(resolve(chapterDir, file), 'utf8');
      expect(chapter).toMatch(new RegExp(`\\norder: ${order}\\n`));
      expect(chapter).toMatch(/\nreadingMinutes: (?:[5-9]|10)\n/);
      expect(chapter).toContain('data-depth="deep"');
      expect(chapter).toContain('## Почему это важно в Forever');
      expect(chapter).toContain('## Запомните три вещи');
      expect(chapter.match(/^\d\. /gm)).toHaveLength(3);
    }
  });

  it('keeps generic narrative nouns in Russian while allowing canonical names', () => {
    const genericEnglish = [
      'kingdom', 'kingdoms', 'refugees', 'nations', 'survivors', 'camps', 'manual', 'coalition',
      'account', 'preview', 'recap', 'path', 'quest', 'quests', 'level', 'levels', 'region', 'regions',
      'abilities', 'gameplay', 'campaign', 'missions', 'structure', 'homeland', 'traditions', 'power',
      'corruption', 'clans', 'original', 'modern', 'expansion', 'bridge', 'eastern'
    ];

    for (const file of readdirSync(chapterDir).filter((entry) => entry.endsWith('.md'))) {
      const body = readFileSync(resolve(chapterDir, file), 'utf8')
        .replace(/^---[\s\S]*?---/, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/Eastern Kingdoms|Forsaken Kingdom/gi, '');
      for (const token of genericEnglish) {
        expect(body, `${file} contains generic English token “${token}”`).not.toMatch(
          new RegExp(`\\b${token}\\b`, 'i')
        );
      }
    }
  });

  it('does not expose chapter citations that research marked inaccessible', () => {
    const chapters = readdirSync(chapterDir)
      .filter((entry) => entry.endsWith('.md'))
      .map((file) => readFileSync(resolve(chapterDir, file), 'utf8'))
      .join('\n');
    const sources = readFileSync(resolve('src/content/sources/core.json'), 'utf8');

    expect(chapters).not.toMatch(/warcraft-iii-manual|well-of-eternity-preview/);
    expect(sources).not.toMatch(/"id": "(?:warcraft-iii-manual|well-of-eternity-preview)"/);
  });
});
