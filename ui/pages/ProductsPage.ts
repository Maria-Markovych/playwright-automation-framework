import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";
import { ProductsContainer } from "../containers/ProductsContainer";
import { ProductCard } from "../components/ProductCard";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { SidebarComponent } from "../components/SideBarComponent";
import { AddedModalComponent } from "../components/AddedModalComponent";



export class ProductsPage extends BasePage {
    private readonly productsContainer: ProductsContainer;
    readonly sidebar: SidebarComponent;

    constructor(readonly page: Page) {
        super(page);
        this.productsContainer = new ProductsContainer(this.page);
        this.sidebar = new SidebarComponent(this.page);
    }

    getCardByName(productName: string): ProductCard {
        return this.productsContainer.getCardByName(productName);
    }

    async getProductCards(): Promise<ProductCard[]> {
        return this.productsContainer.getProductCards();
    }

    async getProductCount(): Promise<number> {
        return this.productsContainer.getProductsCount();
    }

    async goToProductDetailsPage(productName: string): Promise<ProductDetailsPage> {
        await this.getCardByName(productName).clickViewProductBtn();
        return new ProductDetailsPage(this.page);
    }

    async goToAddedModal(productName: string): Promise<AddedModalComponent> {
        await this.getCardByName(productName).clickAddToCartBtn();
        return new AddedModalComponent(this.page);
    }

    async selectCategory(groupName: string, categoryName: string): Promise<void> {
        const before = await this.productsContainer.getProductNames();
        await this.sidebar.categoryTree.selectCategory(groupName, categoryName);
        await this.waitUntilProductsUpdated(before);
    }

    async selectBrand(brandName: string): Promise<void> {
        const before = await this.productsContainer.getProductNames();
        await this.sidebar.brandList.selectBrand(brandName);
        await this.waitUntilProductsUpdated(before);
    }

    async searchProduct(productName: string, waitForReload: boolean = true): Promise<void> {
        const before = await this.productsContainer.getProductNames();
        await this.productsContainer.searchProduct(productName);
        if (waitForReload) {
            await this.waitUntilProductsUpdated(before);
        }
    }

    private async waitUntilProductsUpdated(before: string[]): Promise<void> {
        const beforeState = before.join("|");
        await expect.poll(async () => {
            const after = await this.productsContainer.getProductNames();
            return after.join("|");
        }).not.toBe(beforeState);
    }

}