import { test, expect } from '@playwright/test';

test('has saved button', async ({ page }) => {
  await page.goto('/');

  await expect(await page.getByText('Saving...')).toBeVisible();
});

test('search a node', async ({ page }) => {
  await page.goto('/');

  await expect(await page.getByTestId('search-input')).toBeVisible();
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('100');
  await expect(await page.getByTestId('dropdown-list')).toBeVisible();
  await expect((await page.getByTestId('dropdown-item').all()).length).toBe(10);
});
