import { Locator } from "@playwright/test";

export class ProductCard {
    private readonly productNameLabel: Locator;
    private readonly addToCartBtn: Locator;
    private readonly viewProductBtn: Locator;


    constructor(private readonly cardRoot: Locator) {
        this.productNameLabel = this.cardRoot.locator("img[src *= 'get_product_picture'] ~ p");
        this.addToCartBtn = this.cardRoot.getByText("Add to cart").first();
        this.viewProductBtn = this.cardRoot.getByRole("link", { name: "View Product" });
    }

    async getProductName(): Promise<string> {
        return this.productNameLabel.innerText();
    }

    async clickAddToCartBtn(): Promise<void> {
        await this.addToCartBtn.click();
    }

    async clickViewProductBtn(): Promise<void> {
        await this.viewProductBtn.click();
    }
}