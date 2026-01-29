/**
 * Checkout Flow E2E Tests
 *
 * Tests end-to-end checkout process:
 * - Add product to cart
 * - Proceed to checkout
 * - Fill in customer information
 * - Select delivery method
 * - PromptPay payment
 * - Order confirmation
 */

import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/th');
  });

  test('should complete checkout flow', async ({ page }) => {
    // 1. Navigate to products page
    await page.click('text=สินค้า');
    await expect(page).toHaveURL(/\/th\/products/);

    // 2. Click on first product
    await page.locator('.product-card').first().click();
    await expect(page).toHaveURL(/\/th\/products\/.+/);

    // 3. Add to cart
    await page.click('text=เพิ่มลงตะกร้า');

    // Verify cart announcement
    await expect(page.locator('[role="status"]')).toContainText('เพิ่มสินค้า');

    // 4. Open cart
    await page.click('[aria-label="ตะกร้าสินค้า"]');
    await expect(page.locator('.cart-dropdown')).toBeVisible();

    // 5. Proceed to checkout
    await page.click('text=ดำเนินการชำระเงิน');
    await expect(page).toHaveURL(/\/th\/checkout/);

    // 6. Fill customer information
    await page.fill('input[name="firstName"]', 'ทดสอบ');
    await page.fill('input[name="lastName"]', 'ระบบ');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0812345678');

    // 7. Fill shipping address
    await page.fill('input[name="address"]', '123 ถนนทดสอบ');
    await page.fill('input[name="city"]', 'กรุงเทพมหานคร');
    await page.fill('input[name="province"]', 'พระนคร');
    await page.fill('input[name="postcode"]', '10100');

    // 8. Select delivery zone
    await page.selectOption('select[name="zone"]', 'bangkok');

    // 9. Verify shipping calculation
    await expect(page.locator('.shipping-fee')).toBeVisible();

    // 10. Select delivery day
    await page.click('text=เลือกวันจัดส่ง');
    await page.locator('.delivery-day').first().click();

    // 11. Place order
    await page.click('text=ยืนยันการสั่งซื้อ');

    // 12. Verify PromptPay QR code is displayed
    await expect(page.locator('.promptpay-qr')).toBeVisible();
    await expect(page.locator('.total-amount')).toBeVisible();

    // 13. Wait for order confirmation
    await expect(page).toHaveURL(/\/th\/checkout\/success/, { timeout: 30000 });

    // 14. Verify order details
    await expect(page.locator('.order-confirmation')).toBeVisible();
    await expect(page.locator('.order-id')).toContainText('#');
  });

  test('should validate required fields', async ({ page }) => {
    // Add product to cart first
    await page.goto('/th/products');
    await page.locator('.product-card').first().click();
    await page.click('text=เพิ่มลงตะกร้า');
    await page.click('[aria-label="ตะกร้าสินค้า"]');
    await page.click('text=ดำเนินการชำระเงิน');

    // Try to submit without filling required fields
    await page.click('text=ยืนยันการสั่งซื้อ');

    // Should show validation errors
    await expect(page.locator('text=กรุณากรอกข้อมูลให้ครบ')).toBeVisible();
  });

  test('should update cart quantity', async ({ page }) => {
    // Add product to cart
    await page.goto('/th/products');
    await page.locator('.product-card').first().click();
    await page.click('text=เพิ่มลงตะกร้า');

    // Open cart
    await page.click('[aria-label="ตะกร้าสินค้า"]');

    // Increase quantity
    await page.click('.quantity-increase');

    // Verify cart total updated
    await expect(page.locator('.cart-total')).not.toHaveText('0');
  });

  test('should remove item from cart', async ({ page }) => {
    // Add product to cart
    await page.goto('/th/products');
    await page.locator('.product-card').first().click();
    await page.click('text=เพิ่มลงตะกร้า');

    // Open cart
    await page.click('[aria-label="ตะกร้าสินค้า"]');

    // Remove item
    await page.click('.remove-item');

    // Verify cart is empty
    await expect(page.locator('text=ตะกร้าสินค้าว่าง')).toBeVisible();
  });

  test('should search for products', async ({ page }) => {
    // Click search button
    await page.click('[aria-label="ค้นหา"]');

    // Enter search term
    await page.fill('input[placeholder*="ค้นหา"]', 'ไม้');

    // Submit search
    await page.press('input[placeholder*="ค้นหา"]', 'Enter');

    // Verify search results page
    await expect(page).toHaveURL(/\/th\/search/);
    await expect(page.locator('.search-results')).toBeVisible();
  });

  test('should filter products by category', async ({ page }) => {
    // Navigate to products page
    await page.goto('/th/products');

    // Click category filter
    await page.click('text=ไม้กระดาน');

    // Verify filtered results
    await expect(page.locator('.product-card')).toHaveCount(10);
  });

  test('should login and access account', async ({ page }) => {
    // Navigate to login page
    await page.click('text=เข้าสู่ระบบ');
    await expect(page).toHaveURL(/\/th\/login/);

    // Fill login form
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');

    // Submit login
    await page.click('button[type="submit"]');

    // Verify redirect to account dashboard
    await expect(page).toHaveURL(/\/th\/account/, { timeout: 10000 });

    // Verify user is logged in
    await expect(page.locator('text=สวัสดี')).toBeVisible();
  });

  test('should display product comparison', async ({ page }) => {
    // Navigate to products page
    await page.goto('/th/products');

    // Add products to compare
    await page.locator('.product-card').first().locator('button[aria-label*="เปรียบเทียบ"]').click();
    await page.locator('.product-card').nth(1).locator('button[aria-label*="เปรียบเทียบ"]').click();

    // Open comparison
    await page.click('text=เปรียบเทียบสินค้า');

    // Verify comparison table
    await expect(page.locator('.comparison-table')).toBeVisible();
    await expect(page.locator('.comparison-product')).toHaveCount(2);
  });
});
