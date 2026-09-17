import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { chapterIllustrations } from '../src/lib/illustrations';

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
      const takeaways = chapter.split('## Запомните три вещи')[1];
      expect(takeaways.match(/^\d\. /gm), `${file} must end with exactly three takeaways`).toHaveLength(3);
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

  it('marks mixed-status passages with a valid, labelled status block', () => {
    const labels: Record<string, string> = {
      ESTABLISHED: 'История Warcraft',
      FOREVER: 'Forever',
      CHANGED: 'Изменено',
      BETA: 'Бета · может измениться',
      UNCONFIRMED: 'Не подтверждено'
    };

    for (const file of readdirSync(chapterDir).filter((entry) => entry.endsWith('.md'))) {
      const chapter = readFileSync(resolve(chapterDir, file), 'utf8');
      const blocks = [...chapter.matchAll(/<div class="lore-status-block" data-lore-status="([A-Z]+)">\n(.+)\n/g)];

      for (const [, status, badgeLine] of blocks) {
        expect(Object.keys(labels), `${file} uses unknown status ${status}`).toContain(status);
        expect(badgeLine, `${file} ${status} block needs a visible badge`).toContain(`class="lore-badge status-${status.toLowerCase()}"`);
        expect(badgeLine, `${file} ${status} block label`).toContain(labels[status]);
      }
    }
  });

  it('keeps the research process out of reader-facing prose', () => {
    for (const file of readdirSync(chapterDir).filter((entry) => entry.endsWith('.md'))) {
      const body = readFileSync(resolve(chapterDir, file), 'utf8').replace(/^---[\s\S]*?---/, '');
      expect(body, `${file} mentions the internal research process`).not.toMatch(/исследовательск/i);
    }
  });
});

describe('chapter illustrations', () => {
  it('point to existing chapters and to both image sizes in public/', () => {
    const slugs = readdirSync(resolve('src/content/chapters'))
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/^\d+-/, '').replace(/\.md$/, ''));

    for (const [slug, illustration] of Object.entries(chapterIllustrations)) {
      expect(slugs, slug).toContain(slug);
      expect(existsSync(resolve('public', illustration.src.replace(/^\//, ''))), illustration.src).toBe(true);
      expect(existsSync(resolve('public', illustration.srcSmall.replace(/^\//, ''))), illustration.srcSmall).toBe(true);
      expect(illustration.alt.length, slug).toBeGreaterThan(20);
    }
  });
});
