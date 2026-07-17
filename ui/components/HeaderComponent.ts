import { Locator, Page } from "@playwright/test";
import { AdvertisementComponent } from "./AdvertisementComponent";


export class HeaderComponent {
    private readonly homeLink: Locator;
    private readonly productsLink: Locator;
    private readonly cartLink: Locator;
    private readonly loginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly testCasesLink: Locator;
    private readonly apiTestingLink: Locator;
    private readonly videoTutorialsLink: Locator;
    private readonly contactUsLink: Locator;
    private readonly deleteAccountLink: Locator;
    private readonly loggedInAsLocator: Locator;
    private readonly advertisement: AdvertisementComponent;

    constructor(private readonly page: Page) {
        this.homeLink = this.page.getByRole("link", { name: "Home" });
        this.productsLink = this.page.getByRole("link", { name: "Products" });
        this.cartLink = this.page.getByRole("link", { name: "Cart" });
        this.loginLink = this.page.getByRole("link", { name: "Signup / Login" });
        this.logoutLink = this.page.getByRole("link", { name: "Logout" });
        this.testCasesLink = this.page.getByRole("link", { name: "Test Cases" });
        this.apiTestingLink = this.page.getByRole("link", { name: "API Testing" });
        this.videoTutorialsLink = this.page.getByRole("link", { name: "Video Tutorials" });
        this.contactUsLink = this.page.getByRole("link", { name: "Contact us" });
        this.deleteAccountLink = this.page.getByRole("link", { name: "Delete Account" });
        this.loggedInAsLocator = this.page.locator(".fa-user + b");
        this.advertisement = new AdvertisementComponent(this.page);
    }

    private async clickAndHandlePopup(locator: Locator): Promise<void> {
        await locator.click();
        await this.advertisement.closeIfVisible();
    }


    async clickHomeLink(): Promise<void> {
        await this.clickAndHandlePopup(this.homeLink);
    }

    async clickProductsLink(): Promise<void> {
        await this.clickAndHandlePopup(this.productsLink);
    }

    async clickCartLink(): Promise<void> {
        await this.clickAndHandlePopup(this.cartLink);
    }

    async clickContuctUsLink(): Promise<void> {
        await this.clickAndHandlePopup(this.contactUsLink);
    }

    async clickLoginLink(): Promise<void> {
        if (!(await this.loginLink.isVisible())) {
            throw new Error("User is logged in");
        }
        await this.clickAndHandlePopup(this.loginLink);
    }

    async getloggedInAsLabel(): Promise<string> {
        return this.loggedInAsLocator.innerText();
    }

    async clickLogoutLink(): Promise<void> {
        if (!(await this.logoutLink.isVisible())) {
            throw new Error("User is not logged in");
        }
        await this.clickAndHandlePopup(this.logoutLink);
    }

    async clickDeleteAccountLink(): Promise<void> {
        if (!(await this.deleteAccountLink.isVisible())) {
            throw new Error("User is not logged in");
        }
        await this.clickAndHandlePopup(this.deleteAccountLink);
    }

}