import { test, expect } from "../../../fixtures";
import * as allure from "allure-js-commons";

import { productData } from "../../../test-data/ui/productData";

test.describe("Remove from cart", () => {

    test.beforeEach(async ({ loggedCartPage }) => {
        await loggedCartPage.clearCart();
    });

    test("Remove single product from cart", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that a user can remove the only product from the shopping cart."
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
            "Open cart page",
            async () => {
                return await modal.gotoCartPage();
            }
        );

        await allure.step(
            "Remove product from cart",
            async () => {
                const cartItem = await cartPage.getCartItemByName(expected.productName);
                await cartItem.deleteCartItem();
            }
        );

        await allure.step(
            "Verify cart is empty",
            async () => {
                expect(await cartPage.getEmptyCartMessage())
                    .toBe(cartPage.EMPTY_CART_MESSAGE);
            }
        );
    });

    test("Remove one product from multiple products", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that a user can remove one product while keeping the remaining products in the cart."
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

        const modal = await allure.step(
            "Add products to cart",
            async () => {
                const modal1 = await productsPage.goToAddedModal(product1.productName);
                await modal1.clickContinueShoppingBtn();
                return await productsPage.goToAddedModal(product2.productName);
            }
        );

        const cartPage = await allure.step(
            "Open cart page",
            async () => {
                return await modal.gotoCartPage();
            }
        );

        await allure.step(
            "Remove one product from cart",
            async () => {
                await cartPage.removeCartItem(product1.productName);
            }
        );

        await allure.step(
            "Verify remaining products in cart",
            async () => {
                const remainingItem = await cartPage.getCartItemByName(product2.productName);

                expect(await remainingItem.getCartName()).toBe(product2.productName);
                expect(await cartPage.getCartItemsCount()).toBe(1);
            }
        );
    });

});