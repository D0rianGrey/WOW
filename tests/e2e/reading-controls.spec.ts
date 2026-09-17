import { expect, test } from '@playwright/test';

test('reading depth persists and hides deep content by default', async ({ page }) => {
  await page.goto('/WOW/');
  await expect(page.locator('[data-depth="deep"]').first()).toBeHidden();
  await page.getByRole('button', { name: 'Подробно', exact: true }).click();
  await expect(page.locator('[data-depth="deep"]').first()).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Подробно', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('Retail and unconfirmed disclosure remain separate and safe', async ({ page }) => {
  await page.goto('/WOW/');
  const retail = page.locator('[data-spoiler-kind="retail"]');
  const note = page.locator('[data-spoiler-kind="unconfirmed"]');
  await expect(retail.locator('[data-spoiler-content]')).toBeHidden();
  await expect(note.locator('[data-spoiler-content]')).toBeHidden();
  expect(await page.locator('main').ariaSnapshot()).not.toContain('Самостоятельное продолжение Retail');
  await page.getByRole('button', { name: 'Спойлеры Retail', exact: true }).click();
  await expect(retail.locator('[data-spoiler-content]')).toBeVisible();
  await expect(note.locator('[data-spoiler-content]')).toBeHidden();
  await page.reload();
  await expect(retail.locator('[data-spoiler-content]')).toBeVisible();
  await expect(note.locator('[data-spoiler-content]')).toBeHidden();
  await note.getByRole('button', { name: 'Прочитать неподтверждённую заметку' }).click();
  await expect(note.locator('[data-spoiler-content]')).toBeVisible();
});

test('storage failures do not break controls or expose hidden content', async ({ page }) => {
  await page.addInitScript(() => {
    const originalGet = Storage.prototype.getItem;
    const originalSet = Storage.prototype.setItem;
    Storage.prototype.getItem = function (key) {
      if (key.startsWith('wow-')) throw new Error('Storage unavailable');
      return originalGet.call(this, key);
    };
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith('wow-')) throw new Error('Storage unavailable');
      return originalSet.call(this, key, value);
    };
  });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/WOW/');
  await expect(page.locator('[data-spoiler-content]').first()).toBeHidden();
  await page.getByRole('button', { name: 'Подробно', exact: true }).click();
  await expect(page.locator('[data-depth="deep"]').first()).toBeVisible();
  const retail = page.locator('[data-spoiler-kind="retail"]');
  await retail.getByRole('button', { name: 'Открыть раздел Retail' }).click();
  await expect(retail.locator('[data-spoiler-content]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Спойлеры Retail', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await retail.getByRole('button', { name: 'Скрыть раздел' }).click();
  await expect(retail.locator('[data-spoiler-content]')).toBeHidden();
  expect(errors).toEqual([]);
});

for (const width of [390, 768, 1440]) {
  test(`shell fits ${width}px and keyboard navigation works with reduced motion`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/WOW/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Перейти к содержанию' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
    if (width < 1100) {
      await page.getByRole('button', { name: 'Оглавление' }).click();
      await expect(page.getByRole('navigation', { name: 'Основные разделы' })).toBeVisible();
    }
    await expect(page.getByRole('navigation', { name: 'Основные разделы' }).getByRole('link')).toHaveCount(11);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width < 1100) {
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Оглавление' })).toBeFocused();
      await expect(page.getByRole('navigation', { name: 'Основные разделы' })).toBeHidden();
    }
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo(0, 0); });
    await page.screenshot({ path: `test-results/shell-${width}.png`, fullPage: true, style: 'astro-dev-toolbar { display: none !important; }' });
  });
}


test('progress counts only unique completed chapters in the supplied reading path', async ({ page }) => {
  await page.goto('/WOW/');
  await expect(page.locator('[data-progress-label]')).toHaveText('0 / 0 глав');
  await page.evaluate(() => {
    document.querySelector<HTMLElement>('[data-chapter-ids]')!.dataset.chapterIds = JSON.stringify(['prologue', 'first-war']);
    localStorage.setItem('wow-reading-progress', JSON.stringify(['prologue', 'prologue', 'unknown', 4]));
    window.dispatchEvent(new Event('wow:progress-changed'));
  });
  await expect(page.locator('[data-progress-label]')).toHaveText('1 / 2 глав');
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '1');
  await page.evaluate(() => {
    localStorage.setItem('wow-reading-progress', 'corrupt');
    window.dispatchEvent(new Event('wow:progress-changed'));
  });
  await expect(page.locator('[data-progress-label]')).toHaveText('0 / 2 глав');
});

test('guided path opens chapters in order and records explicit completion once', async ({ page }) => {
  await page.goto('/WOW/start-here');
  await expect(page.getByRole('heading', { name: 'Путь к Forever' })).toBeVisible();
  await expect(page.locator('[data-path-chapter]')).toHaveCount(8);
  await expect(page.locator('[data-progress-label]')).toHaveText('0 / 8 глав');

  await page.locator('[data-path-chapter]').first().getByRole('link').click();
  await expect(page).toHaveURL(/\/WOW\/chapters\/azeroth-before-civilization\/?$/);
  await page.getByRole('button', { name: 'Отметить главу прочитанной' }).click();
  await expect(page.locator('[data-progress-label]')).toHaveText('1 / 8 глав');
  await page.getByRole('button', { name: 'Глава прочитана' }).click();
  await expect(page.locator('[data-progress-label]')).toHaveText('1 / 8 глав');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('wow-reading-progress') || '[]'))).toEqual([
    'azeroth-before-civilization'
  ]);

  await page.getByRole('link', { name: /Следующая глава/ }).click();
  await expect(page).toHaveURL(/\/WOW\/chapters\/war-of-the-ancients\/?$/);
  await expect(page.getByRole('link', { name: /Предыдущая глава/ })).toBeVisible();
});

test('spoilers remain absent from accessibility tree without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/WOW/');
  expect(await page.locator('main').ariaSnapshot()).not.toContain('Самостоятельное продолжение Retail');
  await expect(page.locator('[data-spoiler-content]').first()).toBeHidden();
  await context.close();
});

test('a Retail block reveals only itself and forgets the choice on reload', async ({ page }) => {
  await page.goto('/WOW/');
  const retail = page.locator('[data-spoiler-kind="retail"]');
  const content = retail.locator('[data-spoiler-content]');
  const toolbar = page.getByRole('button', { name: 'Спойлеры Retail', exact: true });

  await retail.getByRole('button', { name: 'Открыть раздел Retail' }).click();
  await expect(content).toBeVisible();
  await expect(toolbar).toHaveAttribute('aria-pressed', 'false');
  expect(await page.evaluate(() => localStorage.getItem('wow-spoilers'))).not.toBe('shown');

  await page.reload();
  await expect(content).toBeHidden();
});

test('the toolbar reveals Retail blocks site-wide and a block can still hide itself', async ({ page }) => {
  await page.goto('/WOW/');
  const retail = page.locator('[data-spoiler-kind="retail"]');
  const content = retail.locator('[data-spoiler-content]');
  const toolbar = page.getByRole('button', { name: 'Спойлеры Retail', exact: true });

  await toolbar.click();
  await expect(content).toBeVisible();

  await retail.getByRole('button', { name: 'Скрыть раздел' }).click();
  await expect(content).toBeHidden();
  await expect(toolbar).toHaveAttribute('aria-pressed', 'true');

  await page.reload();
  await expect(content).toBeVisible();

  await toolbar.click();
  await expect(content).toBeHidden();
  await expect(toolbar).toHaveAttribute('aria-pressed', 'false');
});
