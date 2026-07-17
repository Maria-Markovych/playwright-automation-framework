import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

import { HomePage } from "../../../ui/pages/HomePage";
import { users } from "../../../test-data/ui/users";

test.describe("Login tests", () => {

    test("Login with valid credentials", async ({ page }) => {

        await allure.description(
            "Verify that a registered user can successfully log in with valid credentials."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Smoke", "Login");

        const homePage = new HomePage(page);

        const loginPage = await allure.step(
            "Open login page",
            async () => {
                await homePage.open();
                return await homePage.goToLoginPage();
            }
        );

        const loggedHomePage = await allure.step(
            "Login with valid credentials",
            async () => {
                return await loginPage.login(users.validUser);
            }
        );

        await allure.step("Verify successful login", async () => {
            expect(
                await loggedHomePage.header.getloggedInAsLabel()
            ).toContain(users.validUser.username);
        });
    });

    const invalidUsers = [
        {
            name: "Invalid password",
            user: users.invalidPasswordUser
        },
        {
            name: "Invalid email",
            user: users.invalidEmailUser
        },
        {
            name: "Invalid email and password",
            user: users.invalidEmailAndPasswordUser
        }
    ];

    for (const { name, user } of invalidUsers) {

        test(`Login with ${name}`, async ({ page }) => {

            await allure.description(
                `Verify that login fails when using ${name.toLowerCase()}.`
            );
            await allure.severity("normal");
            await allure.tags("UI", "Regression", "Login");

            const homePage = new HomePage(page);

            const loginPage = await allure.step(
                "Open login page",
                async () => {
                    await homePage.open();
                    return await homePage.goToLoginPage();
                }
            );

            await allure.step(
                `Login with ${name.toLowerCase()}`,
                async () => {
                    await loginPage.submitLogin(user);
                }
            );

            await allure.step("Verify login error message", async () => {
                expect(
                    await loginPage.getLoginErrorMessage()
                ).toBe(loginPage.LOGIN_FAILED_MESSAGE);
            });
        });
    }

});