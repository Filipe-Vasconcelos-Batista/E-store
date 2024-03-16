import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  expect(page.getByRole('heading', { name: 'Our Catalog' }).textContent).toBe('Our Catalog');
});
