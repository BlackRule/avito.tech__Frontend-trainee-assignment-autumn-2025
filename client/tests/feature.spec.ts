import { test, expect } from '@playwright/test';

test.describe('Advertisement Management System', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display the list of advertisements', async ({ page }) => {
        await expect(page.getByText('Advertisements')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Advertisements' })).toBeVisible();
        // Check if at least one ad card is visible
        const adCards = page.locator('.card');
        await expect(adCards.first()).toBeVisible();
    });

    test('should filter advertisements by status', async ({ page }) => {
        // Click on 'pending' filter
        await page.getByRole('button', { name: 'pending' }).click();

        // Wait for list to update - assuming there are pending ads
        // We can check if the badge 'pending' is visible on the cards
        const pendingBadges = page.locator('.badge-pending');
        await expect(pendingBadges.first()).toBeVisible();
    });

    test('should navigate to advertisement details', async ({ page }) => {
        // Click on the first "Review Ad" button
        await page.getByRole('link', { name: 'Review Ad' }).first().click();

        // Check if we are on the details page
        await expect(page).toHaveURL(/\/item\/\d+/);
        await expect(page.getByText('Description')).toBeVisible();
        await expect(page.getByText('Characteristics')).toBeVisible();
    });

    test('should navigate to statistics page', async ({ page }) => {
        await page.getByRole('link', { name: 'Statistics' }).click();

        await expect(page).toHaveURL('/stats');
        await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible();
        await expect(page.getByText('Total Reviewed')).toBeVisible();
    });
});
