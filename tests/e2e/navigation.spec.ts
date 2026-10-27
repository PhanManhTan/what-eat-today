import { test, expect } from '@playwright/test';

test.describe('P0 Navigation and Smoke Tests', () => {
  test('loads dashboard and renders macro cards and brand title', async ({ page }) => {
    await page.goto('/');

    // Check brand header
    await expect(page.locator('header')).toContainText('what-eat-today');
    await expect(page.locator('header')).toContainText('Local-First / Free');

    // Check main dashboard heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Personal Macro & Nutrition Dashboard'
    );

    // Check macro cards exist
    await expect(page.getByText('Daily Calorie Target')).toBeVisible();
    await expect(page.getByText('Daily Protein Floor')).toBeVisible();
    await expect(page.getByText('Base Burn (BMR)')).toBeVisible();
  });

  test('navigates through all core routes via header navigation', async ({ page }) => {
    await page.goto('/');

    // Recipes
    await page.getByRole('link', { name: 'Recipes' }).first().click();
    await expect(page).toHaveURL('/recipes');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Recipe Catalog');

    // Meal Planner
    await page.getByRole('link', { name: 'Meal Planner' }).first().click();
    await expect(page).toHaveURL('/planner');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Manual Weekly Meal Planner'
    );

    // Grocery List
    await page.getByRole('link', { name: 'Grocery List' }).first().click();
    await expect(page).toHaveURL('/grocery');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Smart Grocery List');

    // Settings
    await page.getByRole('link', { name: 'Settings' }).first().click();
    await expect(page).toHaveURL('/settings');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Settings & Personal Metrics'
    );
  });
});
