import { apiTest as test, expect } from "../../fixtures/api";
import { ApiMessageResponse } from "../../api/models/responses/ApiMessageResponse";
import { loginData } from "../../test-data/api/loginData";
import * as allure from "allure-js-commons";

test.describe("Login API", () => {

    test("Verify login successfully", async ({ loginService }) => {

        await allure.description(
            "Verify that a user can successfully authenticate with valid credentials."
        );
        await allure.severity("critical");
        await allure.tags("API", "Smoke", "Login");

        const response = await allure.step(
            "Verify user credentials",
            async () => {
                return await loginService.verifyLogin(
                    loginData.validUser.email,
                    loginData.validUser.password
                );
            }
        );

        const body = await response.json() as ApiMessageResponse;

        await allure.step("Verify successful login response", async () => {
            expect(response.status()).toBe(200);
            expect(body).toMatchObject(loginData.validResponse);
        });
    });

    for (const loginCase of loginData.invalidCases) {

        test(`Verify login with ${loginCase.title}`, async ({ loginService }) => {

            await allure.description(
                `Verify that authentication fails with ${loginCase.title.toLowerCase()}.`
            );
            await allure.severity("normal");
            await allure.tags("API", "Regression", "Login");

            const response = await allure.step(
                `Verify login with ${loginCase.title}`,
                async () => {
                    return await loginService.verifyLogin(
                        loginCase.email,
                        loginCase.password
                    );
                }
            );

            const body = await response.json() as ApiMessageResponse;

            await allure.step("Verify invalid credentials response", async () => {
                expect(response.status()).toBe(200);
                expect(body).toMatchObject(loginData.invalidCredentialsResponse);
            });
        });
    }

    test("Verify login without email", async ({ loginService }) => {

        await allure.description(
            "Verify that authentication fails when the email parameter is missing."
        );
        await allure.severity("normal");
        await allure.tags("API", "Regression", "Login");

        const response = await allure.step(
            "Verify login without email",
            async () => {
                return await loginService.verifyLogin(
                    undefined,
                    loginData.validUser.password
                );
            }
        );

        const body = await response.json() as ApiMessageResponse;

        await allure.step("Verify missing credentials response", async () => {
            expect(response.status()).toBe(200);
            expect(body).toMatchObject(loginData.missingCredentialsResponse);
        });
    });

    test("Verify login without password", async ({ loginService }) => {

        await allure.description(
            "Verify that authentication fails when the password parameter is missing."
        );
        await allure.severity("normal");
        await allure.tags("API", "Regression", "Login");

        const response = await allure.step(
            "Verify login without password",
            async () => {
                return await loginService.verifyLogin(
                    loginData.validUser.email,
                    undefined
                );
            }
        );

        const body = await response.json() as ApiMessageResponse;

        await allure.step("Verify missing credentials response", async () => {
            expect(response.status()).toBe(200);
            expect(body).toMatchObject(loginData.missingCredentialsResponse);
        });
    });

});