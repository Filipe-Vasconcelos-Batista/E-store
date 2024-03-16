import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('.icon-text-container > .svg-inline--fa > path').first().click();
  await page.getByRole('heading', { name: 'Filters' }).click();
  await page.getByLabel('skincare').check();
  await page.getByText('Hyaluronic Acid SerumRating:').click();
  await expect(page.getByRole('button', { name: 'Favorite' })).toBeVisible();
});
