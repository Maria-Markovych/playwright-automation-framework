import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { environment } from "../../utils/env";
import { ProductsPage } from "./ProductsPage";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { ContactUsPage } from "./ContactUsPage";
import { DeleteAccountPage } from "./DeleteAccountPage";

export class HomePage extends BasePage {

    constructor(readonly page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.page.goto(environment.baseUrl, {
            waitUntil:"domcontentloaded"
        });
    }

    async goToLoginPage(): Promise<LoginPage> {
        await this.header.clickLoginLink();
        return new LoginPage(this.page);
    }

    async goToProductsPage(): Promise<ProductsPage> {
        await this.header.clickProductsLink();
        return new ProductsPage(this.page);
    }

    async goToCartPage(): Promise<CartPage> {
        await this.header.clickCartLink();
        return new CartPage(this.page);
    }

    async goToContactUsPage(): Promise<ContactUsPage> {
        await this.header.clickContuctUsLink();
        return new ContactUsPage(this.page);
    }

    async goToDeleteAccountPage(): Promise<DeleteAccountPage> {
        await this.header.clickDeleteAccountLink();
        return new DeleteAccountPage(this.page);
    }
}