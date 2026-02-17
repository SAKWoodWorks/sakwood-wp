/**
 * Product Comparison E2E Tests
 *
 * End-to-end tests for the product comparison workflow
 */

import { test, expect } from '@playwright/test';

test.describe('Product Comparison', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to shop page
    await page.goto('/th/shop');
    await page.waitForLoadState('networkidle');
  });

  test('should add product to comparison from product card', async ({ page }) => {
    // Find first product card with compare button
    const firstProduct = page.locator('[data-testid="product-card"]').first();

    // Click add to compare button
    await firstProduct.locator('[data-testid="add-to-compare"]').click();

    // Verify check icon appears
    await expect(firstProduct.locator('[data-testid="compare-check-icon"]')).toBeVisible();

    // Verify compare count in header (if icon is implemented)
    // const compareIcon = page.locator('[data-testid="compare-icon"]');
    // await expect(compareIcon).toContainText('1');
  });

  test('should add up to 4 products to comparison', async ({ page }) => {
    const compareButtons = page.locator('[data-testid="add-to-compare"]');

    // Add 4 products
    for (let i = 0; i < 4; i++) {
      await compareButtons.nth(i).click();
      await page.waitForTimeout(500); // Brief pause for state update
    }

    // Verify all 4 are added
    const addedCount = await page.locator('[data-testid="compare-check-icon"]').count();
    expect(addedCount).toBeGreaterThanOrEqual(4);

    // Try to add 5th product
    const fifthButton = compareButtons.nth(4);
    await fifthButton.click();

    // Should show error/warning or not add
    const toast = page.locator('[data-testid="toast-error"]');
    if (await toast.isVisible()) {
      await expect(toast).toContainText('Maximum 4');
    }
  });

  test('should remove product from comparison', async ({ page }) => {
    const firstProduct = page.locator('[data-testid="product-card"]').first();

    // Add to compare
    await firstProduct.locator('[data-testid="add-to-compare"]').click();
    await expect(firstProduct.locator('[data-testid="compare-check-icon"]')).toBeVisible();

    // Remove from compare
    await firstProduct.locator('[data-testid="add-to-compare"]').click();
    await expect(firstProduct.locator('[data-testid="compare-check-icon"]')).not.toBeVisible();
  });

  test('should navigate to comparison page', async ({ page }) => {
    // Add a product to compare
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.locator('[data-testid="add-to-compare"]').click();

    // Navigate to compare page
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Verify comparison page loads
    await expect(page.locator('h1')).toContainText('เปรียบเทียบสินค้า');

    // Verify product is displayed
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
  });

  test('should display product details in comparison table', async ({ page }) => {
    // Add 2 products to compare
    const compareButtons = page.locator('[data-testid="add-to-compare"]');
    await compareButtons.nth(0).click();
    await compareButtons.nth(1).click();

    // Navigate to compare page
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Verify both products are shown
    const productColumns = page.locator('[data-testid="comparison-product-column"]');
    await expect(productColumns).toHaveCount(2);

    // Verify product details are displayed
    await expect(page.locator('text=ราคา')).toBeVisible();
    await expect(page.locator('text=ขนาด')).toBeVisible();
  });

  test('should remove product from comparison page', async ({ page }) => {
    // Add 2 products
    const compareButtons = page.locator('[data-testid="add-to-compare"]');
    await compareButtons.nth(0).click();
    await compareButtons.nth(1).click();

    // Navigate to compare page
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Count initial products
    const initialCount = await page.locator('[data-testid="comparison-product-column"]').count();
    expect(initialCount).toBe(2);

    // Remove first product
    await page.locator('[data-testid="remove-from-compare"]').first().click();
    await page.waitForTimeout(500);

    // Verify only 1 product remains
    const finalCount = await page.locator('[data-testid="comparison-product-column"]').count();
    expect(finalCount).toBe(1);
  });

  test('should clear all products from comparison', async ({ page }) => {
    // Add products
    const compareButtons = page.locator('[data-testid="add-to-compare"]');
    await compareButtons.nth(0).click();
    await compareButtons.nth(1).click();

    // Navigate to compare page
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Click clear all button
    await page.locator('[data-testid="clear-compare"]').click();
    await page.waitForTimeout(500);

    // Verify empty state
    await expect(page.locator('text=ไม่มีสินค้าที่เลือกเปรียบเทียบ')).toBeVisible();
  });

  test('should show empty state when no products to compare', async ({ page }) => {
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Verify empty state message
    await expect(page.locator('text=ไม่มีสินค้าที่เลือกเปรียบเทียบ')).toBeVisible();

    // Verify back to shopping button
    const backButton = page.locator('text=กลับไปหน้าร้านค้า');
    await expect(backButton).toBeVisible();

    // Click back to shopping
    await backButton.click();
    await page.waitForLoadState('networkidle');

    // Verify navigates to shop
    await expect(page).toHaveURL(/\/th\/shop/);
  });

  test('should persist comparison across page navigation', async ({ page }) => {
    // Add product to compare
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.locator('[data-testid="add-to-compare"]').click();

    // Navigate to different page
    await page.goto('/th/about');
    await page.waitForLoadState('networkidle');

    // Navigate back to compare
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Verify product still in comparison
    await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Add products
    const compareButtons = page.locator('[data-testid="add-to-compare"]');
    await compareButtons.nth(0).click();
    await compareButtons.nth(1).click();

    // Navigate to compare page
    await page.goto('/th/compare');
    await page.waitForLoadState('networkidle');

    // Verify mobile layout
    await expect(page.locator('[data-testid="comparison-mobile-layout"]')).toBeVisible();

    // Verify stacked layout for mobile
    const productCards = page.locator('[data-testid="comparison-product-card"]');
    await expect(productCards).toHaveCount(2);
  });
});

test.describe('Product Comparison Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/th/shop');
    await page.waitForLoadState('networkidle');

    const compareButton = page.locator('[data-testid="add-to-compare"]').first();
    await expect(compareButton).toHaveAttribute('aria-label');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/th/shop');
    await page.waitForLoadState('networkidle');

    // Tab to compare button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // May need multiple tabs

    // Press Enter to add
    await page.keyboard.press('Enter');

    // Verify product added (check icon visible)
    const checkIcon = page.locator('[data-testid="compare-check-icon"]').first();
    await expect(checkIcon).toBeVisible();
  });
});
