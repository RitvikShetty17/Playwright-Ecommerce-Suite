import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {

  test('complete checkout flow succeeds @smoke', async ({ page }) => {
    // Step 1 — Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 2 — Add product
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName('Sauce Labs Backpack');

    // Step 3 — Go to cart
    await page.locator('.shopping_cart_link').click();
    const cartPage = new CartPage(page);
    expect(await cartPage.getCartItemCount()).toBe(1);
    await cartPage.proceedToCheckout();

    // Step 4 — Fill shipping info
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo('Ritvik', 'Shetty', '60601');

    // Step 5 — Verify order summary and finish
    const itemTotal = await checkoutPage.getItemTotal();
    expect(itemTotal).toContain('29.99');
    await checkoutPage.finishCheckout();

    // Step 6 — Confirm order
    expect(await checkoutPage.isOrderConfirmed()).toBe(true);
    expect(await checkoutPage.getSuccessHeader()).toContain('Thank you for your order');
  });

  test('checkout with empty shipping info shows error @sanity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
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