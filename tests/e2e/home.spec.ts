import { expect, test } from '@playwright/test';

test('home shows the encyclopedia title and start link', async ({ page }) => {
  await page.goto('/WOW/');

  await expect(page).toHaveTitle('World of Warcraft: Forever — энциклопедия');
  await expect(page.getByRole('link', { name: 'Начать знакомство' })).toHaveAttribute(
    'href',
    '/WOW/start-here'
  );
});
