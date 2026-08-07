import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {

  test('valid login navigates to products page @smoke', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('invalid login shows error message @sanity', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('wrong_user');
    await page.locator('#password').fill('wrong_pass');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('empty credentials shows error message @sanity', async ({ page }) => {
    await page.goto('/');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

});