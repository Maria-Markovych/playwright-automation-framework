import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

import { HomePage } from "../../../ui/pages/HomePage";
import { UserFactory } from "../../../factories/UserFactory";
import { AccountFactory } from "../../../factories/AccountFactory";
import { AddressFactory } from "../../../factories/AddressFactory";
import { users } from "../../../test-data/ui/users";

test.describe("Registration", () => {

    test("Successful registration", async ({ page }) => {

        await allure.description(
            "Verify that a new user can successfully register an account."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Registration");

        const user = UserFactory.createUser();
        const account = AccountFactory.createAccount();
        const address = AddressFactory.createAddress();

        const homePage = new HomePage(page);

        const loginPage = await allure.step(
            "Open registration page",
            async () => {
                await homePage.open();
                return await homePage.goToLoginPage();
            }
        );

        const signupPage = await allure.step(
            "Start user registration",
            async () => {
                return await loginPage.signup(user);
            }
        );

        await allure.step(
            "Fill registration form",
            async () => {
                await signupPage.fillAccountInformation(user, account);
                await signupPage.fillAddressInformation(address);
            }
        );

        const createAccountPage = await allure.step(
            "Create user account",
            async () => {
                return await signupPage.createAccount();
            }
        );

        await allure.step(
            "Verify account creation",
            async () => {
                expect(
                    await createAccountPage.getAccountCreatedLabel()
                ).toBe(createAccountPage.SUCCESS_MESSAGE);
            }
        );

        const loggedHomePage = await allure.step(
            "Navigate to home page",
            async () => {
                return await createAccountPage.gotoHomePage();
            }
        );

        await allure.step(
            "Verify logged in user",
            async () => {
                expect(
                    await loggedHomePage.header.getloggedInAsLabel()
                ).toContain(user.username);
            }
        );
    });

    test("Registration with existing email", async ({ page }) => {

        await allure.description(
            "Verify that registration is not allowed when the email address already exists."
        );
        await allure.severity("normal");
        await allure.tags("UI", "Regression", "Registration");

        const user = UserFactory.createUser({
            email: users.validUser.email
        });

        const homePage = new HomePage(page);

        const loginPage = await allure.step(
            "Open registration page",
            async () => {
                await homePage.open();
                return await homePage.goToLoginPage();
            }
        );

        await allure.step(
            "Attempt registration with existing email",
            async () => {
                await loginPage.signup(user);
            }
        );

        await allure.step(
            "Verify existing email validation",
            async () => {
                expect(
                    await loginPage.getEmailAlreadyExistsMessage()
                ).toBe(loginPage.EMAIL_ALREADY_EXISTS_MESSAGE);
            }
        );
    });

    test("Delete account", async ({ page }) => {

        await allure.description(
            "Verify that a registered user can successfully delete their account."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Registration");

        const user = UserFactory.createUser();
        const account = AccountFactory.createAccount();
        const address = AddressFactory.createAddress();

        const homePage = new HomePage(page);

        const loginPage = await allure.step(
            "Open registration page",
            async () => {
                await homePage.open();
                return await homePage.goToLoginPage();
            }
        );

        const signupPage = await allure.step(
            "Start user registration",
            async () => {
                return await loginPage.signup(user);
            }
        );

        await allure.step(
            "Fill registration form",
            async () => {
                await signupPage.fillAccountInformation(user, account);
                await signupPage.fillAddressInformation(address);
            }
        );

        const createAccountPage = await allure.step(
            "Create user account",
            async () => {
                return await signupPage.createAccount();
            }
        );

        const loggedHomePage = await allure.step(
            "Navigate to home page",
            async () => {
                return await createAccountPage.gotoHomePage();
            }
        );

        await allure.step(
            "Verify logged in user",
            async () => {
                expect(
                    await loggedHomePage.header.getloggedInAsLabel()
                ).toContain(user.username);
            }
        );

        const deletedPage = await allure.step(
            "Delete user account",
            async () => {
                return await loggedHomePage.goToDeleteAccountPage();
            }
        );

        await allure.step(
            "Verify account deletion",
            async () => {
                expect(
                    await deletedPage.getAccountDeletedLabel()
                ).toBe(deletedPage.SUCCESS_MESSAGE);
            }
        );
    });

});