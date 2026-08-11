import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products Page', () => {

  test('products page loads with 6 items @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    expect(await productsPage.isOnProductsPage()).toBe(true);
    expect(await productsPage.getProductCount()).toBe(6);
  });

  test('adding item to cart updates cart badge @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName('Sauce Labs Backpack');
    expect(await productsPage.isCartBadgeVisible()).toBe(true);
    expect(await productsPage.getCartCount()).toBe('1');
  });

});