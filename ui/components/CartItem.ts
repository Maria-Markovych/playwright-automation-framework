import { Locator } from "@playwright/test";

export class CartItem {
    private readonly cartNameLink: Locator;
    private readonly productCategoryLabel: Locator;
    private readonly cartPriceLabel: Locator;
    private readonly cartQuantityBtn: Locator;
    private readonly totalPriceLabel: Locator;
    private readonly cartDeleteBtn: Locator;

    constructor(private readonly cartItemRoot: Locator) {
        this.cartNameLink = this.cartItemRoot.locator(".cart_description a");
        this.productCategoryLabel = this.cartItemRoot.locator(".cart_description p");
        this.cartPriceLabel = this.cartItemRoot.locator(".cart_price p");
        this.cartQuantityBtn = this.cartItemRoot.locator(".cart_quantity button");
        this.totalPriceLabel = this.cartItemRoot.locator(".cart_total_price");
        this.cartDeleteBtn = this.cartItemRoot.locator(".cart_quantity_delete");
    }

    async getCartName(): Promise<string> {
        return this.cartNameLink.innerText();
    }

    async getCartCategory(): Promise<string> {
        return this.productCategoryLabel.innerText();
    }

    async getCartPrice(): Promise<number> {
        const price = await this.cartPriceLabel.innerText();
        return (Number(price.replace("Rs. ", "")));
    }

    async getCartQuantity(): Promise<number> {
        const quantity = await this.cartQuantityBtn.innerText();
        return (Number(quantity));
    }

    async getTotalPrice(): Promise<number> {
        const totalPrice = await this.totalPriceLabel.innerText();
        return (Number(totalPrice.replace("Rs. ", "")));
    }

    async deleteCartItem(): Promise<void> {
        await this.cartDeleteBtn.click();
    }
}