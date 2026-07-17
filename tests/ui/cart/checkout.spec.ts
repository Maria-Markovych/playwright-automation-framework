import { test, expect } from "../../../fixtures";
import * as allure from "allure-js-commons";

import { productData } from "../../../test-data/ui/productData";
import { addressData } from "../../../test-data/ui/addressData";
import { cardData } from "../../../test-data/ui/cardData";

test.describe("Checkout", () => {

    test.beforeEach(async ({ loggedCartPage }) => {
        await loggedCartPage.clearCart();
    });

    test("Checkout with one product", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that checkout information is displayed correctly for a single product."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Checkout");

        const product = productData.blueTop;
        const expectedAddress = addressData.test_user;

        const productsPage = await allure.step(
            "Open products page",
            async () => {
                return await loggedHomePage.goToProductsPage();
            }
        );

        const modal = await allure.step(
            "Add product to cart",
            async () => {
                return await productsPage.goToAddedModal(product.productName);
            }
        );

        const cartPage = await allure.step(
            "Open checkout page",
            async () => {
                const cartPage = await modal.gotoCartPage();
                return await cartPage.gotoCheckoutPage();
            }
        );

        const actualAddress = cartPage.getAddress();
        const cartItem = await cartPage.getCartItemByName(product.productName);

        await allure.step(
            "Verify checkout information",
            async () => {

                const addressName = await actualAddress.getAddressName();
                const cityStateZip = await actualAddress.getCityStateZipCode();

                expect.soft(addressName).toContain(expectedAddress.firstName);
                expect.soft(addressName).toContain(expectedAddress.lastName);
                expect.soft(await actualAddress.getCompany()).toBe(expectedAddress.company);
                expect.soft(await actualAddress.getAddress1()).toBe(expectedAddress.address1);
                expect.soft(cityStateZip).toContain(expectedAddress.city);
                expect.soft(cityStateZip).toContain(expectedAddress.state);
                expect.soft(cityStateZip).toContain(expectedAddress.zipcode);
                expect.soft(await actualAddress.getCountry()).toBe(expectedAddress.country);
                expect.soft(await actualAddress.getMobileNumber()).toBe(expectedAddress.mobileNumber);

                expect.soft(await cartItem.getCartName()).toBe(product.productName);
                expect.soft(await cartItem.getCartQuantity()).toBe(1);
                expect.soft(await cartItem.getCartPrice()).toBe(product.price);
                expect.soft(await cartPage.getTotalAmount()).toBe(product.price);
            }
        );
    });

    test("Checkout with multiple products", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that checkout information is displayed correctly for multiple products."
        );
        await allure.severity("critical");
        await allure.tags("UI", "Regression", "Checkout");

        const product1 = productData.blueTop;
        const product2 = productData.menTshirt;
        const expectedTotalAmount = product1.price + product2.price;

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

        const checkoutPage = await allure.step(
            "Open checkout page",
            async () => {
                const cartPage = await modal.gotoCartPage();
                return await cartPage.gotoCheckoutPage();
            }
        );

        const cartItem1 = await checkoutPage.getCartItemByName(product1.productName);
        const cartItem2 = await checkoutPage.getCartItemByName(product2.productName);

        await allure.step(
            "Verify checkout information",
            async () => {
                expect(await cartItem1.getCartName()).toBe(product1.productName);
                expect(await cartItem1.getCartQuantity()).toBe(1);
                expect(await cartItem1.getCartPrice()).toBe(product1.price);

                expect(await cartItem2.getCartName()).toBe(product2.productName);
                expect(await cartItem2.getCartQuantity()).toBe(1);
                expect(await cartItem2.getCartPrice()).toBe(product2.price);

                expect(await checkoutPage.getTotalAmount()).toBe(expectedTotalAmount);
            }
        );
    });

    test("Place order with one product", async ({ loggedHomePage }) => {

        await allure.description(
            "Verify that a user can successfully place an order after completing checkout."
        );
        await allure.severity("blocker");
        await allure.tags("UI", "Regression", "Checkout", "Order");

        const product = productData.blueTop;

        const productsPage = await allure.step(
            "Open products page",
            async () => {
                return await loggedHomePage.goToProductsPage();
            }
        );

        const modal = await allure.step(
            "Add product to cart",
            async () => {
                return await productsPage.goToAddedModal(product.productName);
            }
        );

        const checkoutPage = await allure.step(
            "Open checkout page",
            async () => {
                const cartPage = await modal.gotoCartPage();
                return await cartPage.gotoCheckoutPage();
            }
        );

        const paymentPage = await allure.step(
            "Proceed to payment",
            async () => {
                await checkoutPage.enterComment("test comment");
                return await checkoutPage.goToPaymentPage();
            }
        );

        const orderPage = await allure.step(
            "Place order",
            async () => {
                await paymentPage.enterCardData(cardData.validCard);
                return await paymentPage.placeOrder();
            }
        );

        await allure.step(
            "Verify successful order placement",
            async () => {
                expect(await orderPage.getOrderPlacedMessage())
                    .toBe(orderPage.SUCCESS_MESSAGE);
            }
        );
    });

});