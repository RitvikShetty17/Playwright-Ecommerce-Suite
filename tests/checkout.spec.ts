import { test, expect } from '../fixtures/auth';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {

  test('complete checkout flow succeeds',
    { tag: '@smoke' },
    async ({ authenticatedPage: page, productsPage }) => {
      await productsPage.addToCartByName('Sauce Labs Backpack');
      await page.locator('.shopping_cart_link').click();

      const cartPage = new CartPage(page);
      expect(await cartPage.getCartItemCount()).toBe(1);
      await cartPage.proceedToCheckout();

      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillShippingInfo('Ritvik', 'Shetty', '60601');
      const itemTotal = await checkoutPage.getItemTotal();
      expect(itemTotal).toContain('29.99');
      await checkoutPage.finishCheckout();

      expect(await checkoutPage.isOrderConfirmed()).toBe(true);
      expect(await checkoutPage.getSuccessHeader()).toContain('Thank you for your order');
  });

  test('checkout with empty shipping info shows error',
    { tag: '@sanity' },
    async ({ authenticatedPage: page, productsPage }) => {
      await productsPage.addToCartByName('Sauce Labs Backpack');
      await page.locator('.shopping_cart_link').click();

      const cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();

      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillShippingInfo('', '', '');
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });

});