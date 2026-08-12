import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Flow', () => {

  test('added item appears in cart @smoke', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add item to cart
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName('Sauce Labs Backpack');

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    const cartPage = new CartPage(page);

    // Verify
    expect(await cartPage.isOnCartPage()).toBe(true);
    expect(await cartPage.getCartItemCount()).toBe(1);
    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
  });

  test('multiple items appear in cart @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.addToCartByName('Sauce Labs Bike Light');

    await page.locator('.shopping_cart_link').click();
    const cartPage = new CartPage(page);

    expect(await cartPage.getCartItemCount()).toBe(2);
    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
  });

  test('removing item from cart updates cart @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName('Sauce Labs Backpack');

    await page.locator('.shopping_cart_link').click();
    const cartPage = new CartPage(page);

    await cartPage.removeItemByName('Sauce Labs Backpack');
    expect(await cartPage.getCartItemCount()).toBe(0);
  });

});