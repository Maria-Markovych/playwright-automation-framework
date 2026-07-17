import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "./HomePage";

export class DeleteAccountPage extends BasePage {
    readonly SUCCESS_MESSAGE = "ACCOUNT DELETED!";
    private readonly deletedLabel: Locator;
    private readonly continueBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.deletedLabel = this.page.locator("h2[data-qa='account-deleted']");
        this.continueBtn = this.page.locator("a[data-qa='continue-button']");
    }

    async getAccountDeletedLabel(): Promise<string> {
        return this.deletedLabel.innerText();
    }

    async gotoHomePage(): Promise<HomePage> {
        await this.continueBtn.click();
        return new HomePage(this.page);
    }
}