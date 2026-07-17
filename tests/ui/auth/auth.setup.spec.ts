import { test } from "@playwright/test";

import { HomePage } from "../../../ui/pages/HomePage";
import { users } from "../../../test-data/ui/users";


test("Authentication setup", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.open();
    const loginPage = await homePage.goToLoginPage();
    await loginPage.login(users.validUser);
    await context.storageState({ path: "playwright/.auth/user.json" });
})
