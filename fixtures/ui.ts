import { test as base } from "@playwright/test";
import { HomePage } from "../ui/pages/HomePage";
import { CartPage } from "../ui/pages/CartPage";
import { ContactUsPage } from "../ui/pages/ContactUsPage";

type UIFixtures = {
    loggedHomePage: HomePage;
    loggedCartPage: CartPage;
    loggedContactUsPage: ContactUsPage;
};

export const uiTest = base.extend<UIFixtures>({
    loggedHomePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: "playwright/.auth/user.json"
        });
        const page = await context.newPage();
        await page.goto("/");
        const homePage = new HomePage(page);
        await use(homePage);
        await context.close();
    },

    loggedCartPage: async ({ loggedHomePage }, use) => {
        const cartPage = await loggedHomePage.goToCartPage();
        await use(cartPage);

    },
    
    loggedContactUsPage: async ({ loggedHomePage }, use) => {
        const contactUsPage = await loggedHomePage.goToContactUsPage();
        await use(contactUsPage);
    }
});

export { expect } from "@playwright/test";

