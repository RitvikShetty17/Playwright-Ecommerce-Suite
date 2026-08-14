import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly itemTotal: Locator;
  readonly orderTotal: Locator;
  readonly successHeader: Locator;
  readonly successText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.zipCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.errorMessage = page.locator('[data-test="error"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.orderTotal = page.locator('.summary_total_label');
    this.successHeader = page.locator('.complete-header');
    this.successText = page.locator('.complete-text');
  }

  async fillShippingInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getItemTotal(): Promise<string | null> {
    return this.itemTotal.textContent();
  }

  async getOrderTotal(): Promise<string | null> {
    return this.orderTotal.textContent();
  }

  async isOrderConfirmed(): Promise<boolean> {
    return this.successHeader.isVisible();
  }

  async getSuccessHeader(): Promise<string | null> {
    return this.successHeader.textContent();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}