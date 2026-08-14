import { test, expect } from '../fixtures/auth';

test.describe('Products Page', () => {

  test('products page loads with 6 items @smoke', 
    async ({ authenticatedPage, productsPage }) => {
      expect(await productsPage.isOnProductsPage()).toBe(true);
      expect(await productsPage.getProductCount()).toBe(6);
  });

  test('adding item to cart updates cart badge @regression', 
    async ({ authenticatedPage, productsPage }) => {
      await productsPage.addToCartByName('Sauce Labs Backpack');
      expect(await productsPage.isCartBadgeVisible()).toBe(true);
      expect(await productsPage.getCartCount()).toBe('1');
  });

});