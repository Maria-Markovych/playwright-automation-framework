import { test, expect } from "../../../fixtures";
import { productData } from "../../../test-data/ui/productData";
import * as allure from "allure-js-commons";


test.describe("Add to cart", () => {
    test.beforeEach(async ({ loggedCartPage }) => {
        await loggedCartPage.clearCart();
    });

    test("Add one product to cart", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that a user can add a single product to the shopping cart."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Cart");

        const expected = productData.blueTop;

        const productsPage = await allure.step(
            "Open products page",
            async () => {
                return await loggedHomePage.goToProductsPage();
            }
        );

        const modal = await allure.step(
            "Add product to cart",
            async () => {
                return await productsPage.goToAddedModal(expected.productName);
            }
        );

        const cartPage = await allure.step(
            "Open shopping cart",
            async () => {
                return await modal.gotoCartPage();
            }
        );

        const cartItem = await cartPage.getCartItemByName(expected.productName);

        await allure.step(
            "Verify cart item",
            async () => {
                expect(await cartItem.getCartName()).toBe(expected.productName);
                expect(await cartItem.getCartCategory()).toBe(expected.category);
                expect(await cartItem.getCartPrice()).toBe(expected.price);
                expect(await cartItem.getCartQuantity()).toBe(1);
                expect(await cartItem.getTotalPrice()).toBe(expected.price);
                expect(await cartPage.getCartItemsCount()).toBe(1);
            }
        );
    });

    test("Add multiple products", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that a user can add multiple products to the shopping cart."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Cart");

        const product1 = productData.blueTop;
        const product2 = productData.menTshirt;

        const productsPage = await allure.step(
            "Open products page",
            async () => {
                return await loggedHomePage.goToProductsPage();
            }
        );

        await allure.step(
            "Add first product to cart",
            async () => {
                const modal = await productsPage.goToAddedModal(product1.productName);
                await modal.clickContinueShoppingBtn();
            }
        );

        const modal = await allure.step(
            "Add second product to cart",
            async () => {
                return await productsPage.goToAddedModal(product2.productName);
            }
        );

        const cartPage = await allure.step(
            "Open shopping cart",
            async () => {
                return await modal.gotoCartPage();
            }
        );

        const cartItem1 = await cartPage.getCartItemByName(product1.productName);
        const cartItem2 = await cartPage.getCartItemByName(product2.productName);

        await allure.step(
            "Verify products in cart",
            async () => {
                expect(await cartItem1.getCartName()).toBe(product1.productName);
                expect(await cartItem2.getCartName()).toBe(product2.productName);
                expect(await cartItem1.getCartQuantity()).toBe(1);
                expect(await cartItem2.getCartQuantity()).toBe(1);
                expect(await cartPage.getCartItemsCount()).toBe(2);
            }
        );
    });

    test("Add product with custom quantity", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that a user can add a product to the shopping cart with a custom quantity."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Cart");

        const product = productData.blueTop;
        const quantity = 4;
        const expectedTotalPrice = quantity * product.price;

        const productsPage = await allure.step(
            "Open products page",
            async () => {
                return await loggedHomePage.goToProductsPage();
            }
        );

        const productDetailsPage = await allure.step(
            "Open product details",
            async () => {
                return await productsPage.goToProductDetailsPage(product.productName);
            }
        );

        const modal = await allure.step(
            "Add product to cart with custom quantity",
            async () => {
                await productDetailsPage.setQuantity(quantity);
                return await productDetailsPage.goToAddedModal();
            }
        );

        const cartPage = await allure.step(
            "Open shopping cart",
            async () => {
                return await modal.gotoCartPage();
            }
        );

        const cartItem = await cartPage.getCartItemByName(product.productName);

        await allure.step(
            "Verify product quantity in cart",
            async () => {
                expect(await cartItem.getCartQuantity()).toBe(quantity);
                expect(await cartItem.getTotalPrice()).toBe(expectedTotalPrice);
            }
        );
    });

});