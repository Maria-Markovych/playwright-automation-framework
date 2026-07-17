import { test, expect } from "../../../fixtures";
import * as allure from "allure-js-commons";

import { contactData } from "../../../test-data/ui/contactData";
import { TestFiles } from "../../../test-data/ui/paths";

test.describe("Contact us", () => {

    test("Submit contact form with attachment", async ({ loggedContactUsPage }) => {

        await allure.description(
            "Verify that a user can successfully submit the contact form with a file attachment."
        );
        await allure.severity("normal");
        await allure.tags("UI", "Regression", "Contact Us");

        await allure.step(
            "Fill contact form",
            async () => {
                await loggedContactUsPage.fillContactForm(contactData.validMessage);
            }
        );

        await allure.step(
            "Upload attachment and submit form",
            async () => {
                await loggedContactUsPage.uploadFile(TestFiles.contact);
                await loggedContactUsPage.submit();
            }
        );

        await allure.step(
            "Verify successful submission",
            async () => {
                expect(await loggedContactUsPage.getSuccessMessage())
                    .toBe(loggedContactUsPage.SUCCESS_MESSAGE);
            }
        );
    });

    test("Submit contact form without attachment", async ({ loggedContactUsPage }) => {

        await allure.description(
            "Verify that a user can successfully submit the contact form without an attachment."
        );
        await allure.severity("normal");
        await allure.tags("UI", "Regression", "Contact Us");


        await allure.step(
            "Fill and submit contact form",
            async () => {
                await loggedContactUsPage.fillContactForm(contactData.validMessage);
                await loggedContactUsPage.submit();
            }
        );

        await allure.step(
            "Verify successful submission",
            async () => {
                expect(await loggedContactUsPage.getSuccessMessage())
                    .toBe(loggedContactUsPage.SUCCESS_MESSAGE);
            }
        );
    });

});