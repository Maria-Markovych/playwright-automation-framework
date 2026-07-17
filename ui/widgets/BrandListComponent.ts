import { Locator } from "@playwright/test";

export class BrandListComponent {
    private readonly brands: Locator;

    constructor(brandRoot: Locator) {
        this.brands = brandRoot.locator("a[href*='brand_products']");
    }

    async getBrands(): Promise<string[]> {
        return ((await this.brands.allInnerTexts()).map(text => text.trim()));
    }

    async selectBrand(name: string): Promise<void> {
        await this.brands.filter({ hasText: name }).click();
    }

}