import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productNames: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productNames = page.locator('.inventory_item_name');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async isOnProductsPage(): Promise<boolean> {
    return this.pageTitle.isVisible();
  }

  async getProductCount(): Promise<number> {
    return this.productNames.count();
  }

  async addToCartByName(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
    await product
      .locator('button[data-test^="add-to-cart"]')
      .click();
  }

  async getCartCount(): Promise<string | null> {
    return this.cartBadge.textContent();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.cartBadge.isVisible();
  }
}