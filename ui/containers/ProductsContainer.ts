import { Locator, Page } from "@playwright/test";
import { ProductCard } from "../components/ProductCard";

export class ProductsContainer {
    private readonly productCards: Locator;
    private readonly searchInput: Locator;
    private readonly searchBtn: Locator;

    constructor(private readonly page: Page) {
        this.searchInput = this.page.getByPlaceholder("Search Product");
        this.searchBtn = this.page.locator("#submit_search");
        this.productCards = this.page.locator("div.product-image-wrapper");
    }

    async getProductCards(): Promise<ProductCard[]> {
        const cards: ProductCard[] = [];
        const count = await this.productCards.count();
        for (let i = 0; i < count; i++) {
            cards.push(new ProductCard(this.productCards.nth(i)));
        }
        return cards;
    }

    getCardByName(productName: string): ProductCard {
        const cardRoot = this.productCards.filter({ hasText: productName }).first();
        return new ProductCard(cardRoot);
    }

    async getProductNames(): Promise<string[]> {
        return this.productCards.locator(".productinfo p").allInnerTexts();
    }

    async getProductsCount(): Promise<number> {
        return this.productCards.count();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchBtn.click();
    }
}
