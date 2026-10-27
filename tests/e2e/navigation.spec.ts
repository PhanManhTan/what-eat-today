import { test, expect } from '@playwright/test';

test.describe('P0 Navigation and Smoke Tests', () => {
  test('loads Discover page and renders brand title and swipe deck', async ({ page }) => {
    await page.goto('/');

    // Check brand header
    await expect(page.locator('header')).toContainText('Hôm Nay Ăn Gì');

    // Check Discover heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Hôm nay bạn muốn ăn gì'
    );

    // Check that swipe action buttons exist
    await expect(page.getByTitle('Bỏ qua')).toBeVisible();
    await expect(page.getByTitle('Muốn ăn!')).toBeVisible();
    await expect(page.getByTitle('Chi tiết món')).toBeVisible();
  });

  test('toggles language between Vietnamese and English', async ({ page }) => {
    await page.goto('/');

    // Initial language is Vietnamese
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Hôm nay bạn muốn ăn gì'
    );

    // Click language switch button (VI -> EN)
    await page.getByRole('button', { name: 'Toggle language' }).click();

    // Now header and heading should be English
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'What do you want to eat today'
    );

    // Switch back to Vietnamese
    await page.getByRole('button', { name: 'Toggle language' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Hôm nay bạn muốn ăn gì'
    );
  });

  test('navigates through core routes via navigation', async ({ page }) => {
    await page.goto('/');

    // Explore page
    await page.goto('/explore');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Thực đơn');

    // Favorites page
    await page.goto('/favorites');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Yêu thích');

    // Preserved Meal Planner
    await page.goto('/planner');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Manual Weekly Meal Planner'
    );

    // Preserved Nutrition Dashboard
    await page.goto('/nutrition');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Personal Macro & Nutrition Dashboard'
    );

    // Settings
    await page.goto('/settings');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cài đặt');
  });
});
