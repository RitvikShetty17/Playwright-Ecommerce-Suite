import { test, expect } from '../fixtures/auth';

test.describe('Cart Flow', () => {

  test('added item appears in cart',
    { tag: '@smoke' },
    async ({ authenticatedPage: page, productsPage, cartPage }) => {
      await productsPage.addToCartByName('Sauce Labs Backpack');
      await page.locator('.shopping_cart_link').click();
      expect(await cartPage.isOnCartPage()).toBe(true);
      expect(await cartPage.getCartItemCount()).toBe(1);
      const itemNames = await cartPage.getItemNames();
      expect(itemNames).toContain('Sauce Labs Backpack');
  });

  test('multiple items appear in cart',
    { tag: '@regression' },
    async ({ authenticatedPage: page, productsPage, cartPage }) => {
      await productsPage.addToCartByName('Sauce Labs Backpack');
      await productsPage.addToCartByName('Sauce Labs Bike Light');
      await page.locator('.shopping_cart_link').click();
      expect(await cartPage.getCartItemCount()).toBe(2);
      const itemNames = await cartPage.getItemNames();
      expect(itemNames).toContain('Sauce Labs Backpack');
      expect(itemNames).toContain('Sauce Labs Bike Light');
  });

  test('removing item from cart updates cart',
    { tag: '@regression' },
    async ({ authenticatedPage: page, productsPage, cartPage }) => {
      await productsPage.addToCartByName('Sauce Labs Backpack');
      await page.locator('.shopping_cart_link').click();
      await cartPage.removeItemByName('Sauce Labs Backpack');
      expect(await cartPage.getCartItemCount()).toBe(0);
  });

});