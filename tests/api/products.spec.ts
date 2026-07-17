import { apiTest as test, expect } from "../../fixtures/api";
import { ProductsResponse } from "../../api/models/responses/ProductsResponse";
import { ApiMessageResponse } from "../../api/models/responses/ApiMessageResponse";
import { productData } from "../../test-data/api/productData";
import * as allure from "allure-js-commons";

test.describe("Products API", () => {

    test("Get products list successfully", async ({ productsService }) => {

        await allure.description(
            "Verify that the products list can be successfully retrieved."
        );
        await allure.severity("critical");
        await allure.tags("API", "Smoke", "Products");

        const response = await allure.step(
            "Retrieve products list",
            async () => {
                return await productsService.getProducts();
            }
        );

        const body = await response.json() as ProductsResponse;
        const firstProduct = body.products[0];

        await allure.step("Verify products list response", async () => {
            expect(response.status()).toBe(200);
            expect(body.responseCode).toBe(200);
            expect(body.products).toBeInstanceOf(Array);
            expect(body.products.length).toBeGreaterThan(0);

            expect(firstProduct).toMatchObject(productData.firstProduct);
        });
    });

    test("Search products successfully", async ({ productsService }) => {

        await allure.description(
            "Verify that products can be searched by a keyword."
        );
        await allure.severity("critical");
        await allure.tags("API", "Regression", "Products");

        const response = await allure.step(
            "Search products by keyword",
            async () => {
                return await productsService.searchProducts("top");
            }
        );

        const body = await response.json() as ProductsResponse;

        await allure.step("Verify search results", async () => {
            expect(response.status()).toBe(200);
            expect(body.responseCode).toBe(200);
            expect(body.products).toBeInstanceOf(Array);
            expect(body.products.length).toBeGreaterThan(0);

            for (const product of body.products) {
                expect(
                    product.name.toLowerCase().includes("top") ||
                    product.category.category.toLowerCase().includes("top")
                ).toBeTruthy();
            }
        });
    });

    test("Search products without parameter", async ({ productsService }) => {

        await allure.description(
            "Verify that searching products without a search parameter returns the expected validation message."
        );
        await allure.severity("normal");
        await allure.tags("API", "Regression", "Products");

        const response = await allure.step(
            "Search products without search parameter",
            async () => {
                return await productsService.searchProducts();
            }
        );

        const body = await response.json() as ApiMessageResponse;

        await allure.step("Verify missing search parameter response", async () => {
            expect(response.status()).toBe(200);
            expect(body).toMatchObject(productData.missingSearchParameter);
        });
    });

});