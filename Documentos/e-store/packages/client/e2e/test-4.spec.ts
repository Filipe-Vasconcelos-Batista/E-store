import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('heading', { name: 'Our Catalog' }).click();
  await page.getByRole('heading', { name: 'Our Catalog' }).click({
    clickCount: 3
  });
  await page.getByRole('heading', { name: 'Our Catalog' }).click();
  await page.getByRole('heading', { name: 'Our Catalog' }).click({
    clickCount: 3
  });
});
