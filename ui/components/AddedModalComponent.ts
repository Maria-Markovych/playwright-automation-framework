import { Locator, Page } from "@playwright/test";
import { CartPage } from "../pages/CartPage";

export class AddedModalComponent {
    private readonly viewCartLink: Locator;
    private readonly continueShoppingBtn: Locator;

    constructor(private readonly page: Page) {
        this.viewCartLink = this.page.getByRole("link", { name: "View Cart" });
        this.continueShoppingBtn = this.page.getByRole("button", { name: "Continue Shopping" });
    }

    async clickContinueShoppingBtn(): Promise<void> {
        await this.continueShoppingBtn.click();
    }

    async gotoCartPage(): Promise<CartPage> {
        await this.viewCartLink.click();
        return new CartPage(this.page);
    }
}