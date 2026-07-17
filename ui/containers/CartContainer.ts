import { Locator, Page } from "@playwright/test";
import { CartItem } from "../components/CartItem";

export class CartContainer {
    private readonly cartItems: Locator;

    constructor(private readonly page: Page) {
        this.cartItems = this.page.locator("#cart_info tbody tr");
    }

    async getCartItems(): Promise<CartItem[]> {
        const cartItems: CartItem[] = [];
        const count = await this.cartItems.count();
        for (let i = 0; i < count; i++) {
            cartItems.push(new CartItem(this.cartItems.nth(i)));
        }
        return cartItems;
    }

    getCartItemByName(productName: string): CartItem {
        const cartRoot = this.cartItems.filter({ hasText: productName });
        return new CartItem(cartRoot);
    }

    async getCartItemsName(): Promise<string[]> {
        return this.cartItems.locator(".cart_description a").allInnerTexts();
    }

    async getCartItemsCount(): Promise<number> {
        return this.cartItems.count();
    }
}