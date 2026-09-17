import { expect, test } from '@playwright/test';

const origin = 'http://127.0.0.1:4321';

function internalLinks(html: string): string[] {
  return [...html.matchAll(/href="(\/WOW[^"]*)"/g)].map((match) => match[1].replaceAll('&amp;', '&'));
}

test('every internal link on the built site resolves, including its #anchor', async ({ request }) => {
  const pages = new Map<string, string>();
  const queue = ['/WOW/'];
  const failures: string[] = [];
  const anchors: { from: string; path: string; id: string }[] = [];

  while (queue.length > 0) {
    const path = queue.shift()!;

    if (pages.has(path)) {
      continue;
    }

    const response = await request.get(`${origin}${path}`);
    pages.set(path, '');

    if (response.status() !== 200) {
      failures.push(`${path} → ${response.status()}`);
      continue;
    }

    if (!(response.headers()['content-type'] ?? '').includes('text/html')) {
      continue;
    }

    const html = await response.text();
    pages.set(path, html);

    for (const href of internalLinks(html)) {
      const [target, id] = href.split('#');
      const targetPath = target.split('?')[0] || path;

      if (id) {
        anchors.push({ from: path, path: targetPath, id: decodeURIComponent(id) });
      }

      if (!pages.has(targetPath)) {
        queue.push(targetPath);
      }
    }
  }

  for (const anchor of anchors) {
    const html = pages.get(anchor.path) ?? '';

    if (!html.includes(`id="${anchor.id}"`)) {
      failures.push(`${anchor.from} → ${anchor.path}#${anchor.id} (anchor missing)`);
    }
  }

  expect(pages.size).toBeGreaterThan(60);
  expect([...new Set(failures)]).toEqual([]);
});

test('home leads to the guided path', async ({ page }) => {
  await page.goto('/WOW/');
  await page.getByRole('link', { name: 'Начать знакомство' }).click();

  await expect(page).toHaveURL(/\/WOW\/start-here\/?$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Путь к Forever' })).toBeVisible();
});

test('the "you are here" anchor lands on the Forever event of the timeline', async ({ page }) => {
  await page.goto('/WOW/');
  await page.getByRole('link', { name: /Вы здесь/ }).click();

  await expect(page).toHaveURL(/\/WOW\/timeline\/?#forever$/);
  await expect(page.locator('#forever')).toBeInViewport();
});

test('Forever changes compare the original Year-1 world with Forever', async ({ page }) => {
  await page.goto('/WOW/forever-changes');

  await expect(page.getByRole('heading', { level: 1, name: 'Изменения Forever' })).toBeVisible();
  const change = page.locator('.forever-change').first();
  await expect(change).toContainText('Первый год оригинального WoW');
  await expect(change).toContainText('World of Warcraft: Forever');
});

test('mobile navigation opens at 390px and reaches a section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/WOW/');
  const navigation = page.getByRole('navigation', { name: 'Основные разделы' });

  await expect(navigation).toBeHidden();
  await page.getByRole('button', { name: 'Оглавление' }).click();
  await navigation.getByRole('link', { name: /Словарь/ }).click();

  await expect(page).toHaveURL(/\/WOW\/glossary\/?$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('search matches an inflected Russian alias and links to the dossier', async ({ page }) => {
  await page.goto(`/WOW/search?q=${encodeURIComponent('принца Arthas')}`);

  await expect(page.locator('[data-search-count]')).toContainText('Найдено');
  await page.locator('[data-search-results] a', { hasText: 'Arthas' }).first().click();

  await expect(page).toHaveURL(/\/WOW\/characters\/arthas-menethil\/?$/);
});
