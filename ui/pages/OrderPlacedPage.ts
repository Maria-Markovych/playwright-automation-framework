import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderPlacedPage extends BasePage {
    readonly SUCCESS_MESSAGE = "ORDER PLACED!";
    private readonly orderPlacedLabel: Locator;
    private readonly downloadInvoiceBtn: Locator;
    private readonly continueBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.orderPlacedLabel = this.page.locator("h2[data-qa='order-placed']");
        this.downloadInvoiceBtn = this.page.locator(".check_out");
        this.continueBtn = this.page.locator("a[data-qa='continue-button']");
    }

    async getOrderPlacedMessage(): Promise<string> {
        return this.orderPlacedLabel.innerText();
    }

}