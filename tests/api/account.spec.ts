import { apiTest as test, expect } from "../../fixtures/api";
import { ApiMessageResponse } from "../../api/models/responses/ApiMessageResponse";
import { accountData } from "../../test-data/api/accountData";
import { CreateAccountFactory } from "../../factories/CreateAccountFactory";
import { AccountDetailsResponse } from "../../api/models/responses/AccountDetailsResponse";
import { environment } from "../../utils/env";
import * as allure from "allure-js-commons";

test.describe("Account API", () => {

    test("Create account successfully", async ({ accountService }) => {

        await allure.description(
            "Verify that a new user account can be successfully created."
        );
        await allure.severity("critical");
        await allure.tags("API", "Smoke", "Account");

        const response = await allure.step(
            "Create a new user account",
            async () => {
                return await accountService.createAccount(
                    CreateAccountFactory.create()
                );
            }
        );

        const body = await response.json() as ApiMessageResponse;

        await allure.attachment(
            "Response Body",
            JSON.stringify(body, null, 2),
            "application/json"
        );

        await allure.step("Verify account creation response", async () => {
            expect(response.status()).toBe(200);
            expect(body).toMatchObject(accountData.createAccountResponse);
        });
    });

    test("Create account with existing email", async ({ accountService }) => {

        await allure.description(
            "Verify that account creation is rejected when the email already exists."
        );
        await allure.severity("normal");
        await allure.tags("API", "Regression", "Account");

        const account = CreateAccountFactory.create();

        const response = await allure.step(
            "Create account with an existing email",
            async () => {
                return await accountService.createAccount({
                    ...account,
                    email: environment.userEmail
                });
            }
        );

        const body = await response.json() as ApiMessageResponse;

        await allure.step("Verify existing email validation", async () => {
            expect(response.status()).toBe(200);
            expect(body).toMatchObject(accountData.existingEmailResponse);
        });
    });

    test("Delete account successfully", async ({ accountService }) => {

        await allure.description(
            "Verify that an existing user account can be successfully deleted."
        );
        await allure.severity("critical");
        await allure.tags("API", "Regression", "Account");

        const account = CreateAccountFactory.create();

        const createResponse = await allure.step(
            "Create a new user account",
            async () => {
                return await accountService.createAccount(account);
            }
        );

        const createBody = await createResponse.json() as ApiMessageResponse;

        await allure.step("Verify account creation response", async () => {
            expect(createResponse.status()).toBe(200);
            expect(createBody).toMatchObject(accountData.createAccountResponse);
        });

        const deleteResponse = await allure.step(
            "Delete the user account",
            async () => {
                return await accountService.deleteAccount(account);
            }
        );

        const deleteBody = await deleteResponse.json() as ApiMessageResponse;

        await allure.step("Verify account deletion response", async () => {
            expect(deleteResponse.status()).toBe(200);
            expect(deleteBody).toMatchObject(accountData.deleteAccountResponse);
        });
    });

    test("Update account successfully", async ({ accountService }) => {

        await allure.description(
            "Verify that an existing user account can be successfully updated."
        );
        await allure.severity("critical");
        await allure.tags("API", "Regression", "Account");

        const account = CreateAccountFactory.create();

        const createResponse = await allure.step(
            "Create a new user account",
            async () => {
                return await accountService.createAccount(account);
            }
        );

        const createBody = await createResponse.json() as ApiMessageResponse;

        await allure.step("Verify account creation response", async () => {
            expect(createResponse.status()).toBe(200);
            expect(createBody).toMatchObject(accountData.createAccountResponse);
        });

        const updatedAccount = {
            ...account,
            name: "newname",
            firstname: "newfirstname",
        };

        const updateResponse = await allure.step(
            "Update the user account",
            async () => {
                return await accountService.updateAccount(updatedAccount);
            }
        );

        const updateBody = await updateResponse.json() as ApiMessageResponse;

        await allure.step("Verify account update response", async () => {
            expect(updateResponse.status()).toBe(200);
            expect(updateBody).toMatchObject(accountData.updateAccountResponse);
        });
    });

    test("Get user account detail by email", async ({ accountService }) => {

        await allure.description(
            "Verify that user account details can be successfully retrieved by email."
        );
        await allure.severity("critical");
        await allure.tags("API", "Regression", "Account");

        const account = CreateAccountFactory.create();

        const createResponse = await allure.step(
            "Create a new user account",
            async () => {
                return await accountService.createAccount(account);
            }
        );

        const createBody = await createResponse.json() as ApiMessageResponse;

        await allure.step("Verify account creation response", async () => {
            expect(createResponse.status()).toBe(200);
            expect(createBody).toMatchObject(accountData.createAccountResponse);
        });

        const accountDetailResponse = await allure.step(
            "Retrieve account details by email",
            async () => {
                return await accountService.getUserDetailByEmail(account.email);
            }
        );

        const accountDetailBody = await accountDetailResponse.json() as AccountDetailsResponse;

        await allure.step("Verify account details", async () => {
            expect(accountDetailResponse.status()).toBe(200);
            expect(accountDetailBody.responseCode).toBe(200);

            expect(accountDetailBody.user).toMatchObject({
                name: account.name,
                email: account.email,
                title: account.title,
                first_name: account.firstname,
                last_name: account.lastname,
                company: account.company,
                address1: account.address1,
                address2: account.address2,
                country: account.country,
                state: account.state,
                city: account.city,
                zipcode: account.zipcode
            });
        });
    });

});