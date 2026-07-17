import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "./HomePage";

export class AccountCreatedPage extends BasePage {
    readonly SUCCESS_MESSAGE = "ACCOUNT CREATED!";
    private readonly createdLabel: Locator;
    private readonly continueBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.createdLabel = this.page.locator("h2[data-qa='account-created']");
        this.continueBtn = this.page.locator("a[data-qa='continue-button']");
    }

    async getAccountCreatedLabel(): Promise<string> {
        return this.createdLabel.innerText();
    }

    async gotoHomePage(): Promise<HomePage> {
        await this.continueBtn.click();
        return new HomePage(this.page);
    }
}