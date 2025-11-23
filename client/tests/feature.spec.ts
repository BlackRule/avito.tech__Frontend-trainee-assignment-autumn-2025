import { test, expect, request } from '@playwright/test';

test.describe('Advertisement Management System', () => {
    test.afterAll(async () => {
        const apiContext = await request.newContext();
        await apiContext.post('http://localhost:3002/api/v1/reset');
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display the list of advertisements', async ({ page }) => {
        await expect(page.getByText('Объявления')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Объявления' })).toBeVisible();
        // Check if at least one ad card is visible
        const adCards = page.locator('.card');
        await expect(adCards.first()).toBeVisible();
    });

    test('should filter advertisements by status', async ({ page }) => {
        // Click on 'pending' filter
        await page.getByRole('button', { name: 'На проверке' }).click();

        // Wait for list to update - assuming there are pending ads
        // We can check if the badge 'pending' is visible on the cards
        const pendingBadges = page.locator('.badge-pending');
        await expect(pendingBadges.first()).toBeVisible();
    });

    test('should navigate to advertisement details', async ({ page }) => {
        // Click on the first "Review Ad" button
        await page.getByRole('link', { name: 'Открыть' }).first().click();

        // Check if we are on the details page
        await expect(page).toHaveURL(/\/item\/\d+/);

        const descriptionHeader = page.getByRole('heading', { name: 'Описание' });
        await descriptionHeader.scrollIntoViewIfNeeded();
        await expect(descriptionHeader).toBeVisible();

        const characteristicsHeader = page.getByRole('heading', { name: 'Характеристики' });
        await characteristicsHeader.scrollIntoViewIfNeeded();
        await expect(characteristicsHeader).toBeVisible();
    });

    test('should navigate to statistics page', async ({ page }) => {
        await page.getByRole('link', { name: 'Статистика' }).click();

        await expect(page).toHaveURL('/stats');
        await expect(page.getByRole('heading', { name: 'Статистика' })).toBeVisible();
        await expect(page.getByText('Всего проверено')).toBeVisible();
    });
});
