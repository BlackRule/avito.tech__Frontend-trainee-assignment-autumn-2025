import { test, expect, request } from '@playwright/test';

test.describe('Visual Tests', () => {
    test.afterAll(async () => {
        const apiContext = await request.newContext();
        await apiContext.post('http://localhost:3002/api/v1/reset');
    });

    test('list page screenshot', async ({ page }) => {
        await page.goto('/list');
        await page.waitForSelector('.card'); // Wait for ads to load
        await expect(page).toHaveScreenshot('list-page.png', { fullPage: true });
    });

    test('detail page screenshot', async ({ page }) => {
        // Go to a specific item, e.g., item 115 which we know exists from manual verification
        // Or just click the first one
        await page.goto('/list');
        await page.waitForSelector('.card');
        await page.getByRole('link', { name: 'Review Ad' }).first().click();
        await page.waitForSelector('h1'); // Wait for title
        await expect(page).toHaveScreenshot('detail-page.png', { fullPage: true });
    });

    test('stats page screenshot', async ({ page }) => {
        await page.goto('/stats');
        await page.waitForSelector('.recharts-wrapper'); // Wait for charts
        await expect(page).toHaveScreenshot('stats-page.png', { fullPage: true });
    });
});
