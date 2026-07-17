import { test, expect } from "../../../fixtures";
import * as allure from "allure-js-commons";

import { productData } from "../../../test-data/ui/productData";
import { searchData } from "../../../test-data/ui/searchData";

test.describe("Products", () => {

    test("Verify All Products and product detail page", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that product details are displayed correctly on the Product Details page."
        );
        await allure.severity("critical");
        await allure.owner("Mariia");
        await allure.tags("UI", "Regression", "Products");

        const expected = productData.blueTop;

        const productDetails = await allure.step(
            "Open product details page",
            async () => {
                const productsPage = await loggedHomePage.goToProductsPage();
                return await productsPage.goToProductDetailsPage(expected.productName);
            }
        );

        await allure.step(
            "Verify product details",
            async () => {
                expect(await productDetails.getProductName()).toBe(expected.productName);
                expect(await productDetails.getCategory()).toBe(expected.category);
                expect(await productDetails.getPrice()).toBe(expected.price);
                expect(await productDetails.getAvailability()).toBe(expected.availability);
                expect(await productDetails.getCondition()).toBe(expected.condition);
                expect(await productDetails.getBrand()).toBe(expected.brand);
            }
        );
    });

    test("Verify filtering products by category", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that products can be filtered by category."
        );
        await allure.severity("normal");
        await allure.owner("Mariia");
        await allure.tags("UI", "Regression", "Category");

        const productsPage = await allure.step(
            "Open products page and filter by category",
            async () => {
                const page = await loggedHomePage.goToProductsPage();
                await page.selectCategory("WOMEN", "TOPS");
                return page;
            }
        );

        const products = await productsPage.getProductCards();

        await allure.step(
            "Verify filtered products are displayed",
            async () => {
                expect(products.length).toBeGreaterThan(0);
            }
        );

        const MAX_PRODUCTS_TO_VERIFY = 2;

        await allure.step(
            "Verify category for displayed products",
            async () => {
                for (const product of products.slice(0, MAX_PRODUCTS_TO_VERIFY)) {
                    const productName = await product.getProductName();
                    const detailsPage = await productsPage.goToProductDetailsPage(productName);

                    expect(await detailsPage.getCategory()).toBe("Women > Tops");

                    await detailsPage.goBack();
                }
            }
        );
    });

    for (const search of searchData) {

        test(`Search product: ${search.searchText}`, async ({ loggedHomePage }) => {

            await allure.description(
                `Verify search results for query "${search.searchText}".`
            );
            await allure.severity("critical");
            await allure.tags("UI", "Regression", "Search");

            const productsPage = await allure.step(
                `Search for "${search.searchText}"`,
                async () => {
                    const page = await loggedHomePage.goToProductsPage();
                    await page.searchProduct(search.searchText);
                    return page;
                }
            );

            const cards = await productsPage.getProductCards();

            await allure.step(
                "Verify search results",
                async () => {
                    expect(cards.length).toBe(search.expectedCount);

                    for (let i = 0; i < cards.length; i++) {
                        expect(await cards[i].getProductName()).toBe(search.expectedProducts[i].productName);
                    }
                }
            );
        });
    }

    test("Search invalid product", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that searching for a non-existing product returns no results."
        );
        await allure.severity("normal");
        await allure.tags("UI", "Negative", "Search");

        const productPage = await allure.step(
            "Search invalid product",
            async () => {
                const page = await loggedHomePage.goToProductsPage();
                await page.searchProduct("invalid product");
                return page;
            }
        );

        await allure.step(
            "Verify no products are found",
            async () => {
                const cards = await productPage.getProductCards();
                expect(cards.length).toBe(0);
            }
        );
    });

    test("Search empty string", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that searching with an empty string keeps the original product list."
        );
        await allure.severity("minor");
        await allure.tags("UI", "Search");

        const productPage = await loggedHomePage.goToProductsPage();

        await allure.step(
            "Search with empty string",
            async () => {
                const before = await productPage.getProductCount();

                await productPage.searchProduct("", false);

                const after = await productPage.getProductCount();

                expect(after).toBe(before);
            }
        );
    });

});