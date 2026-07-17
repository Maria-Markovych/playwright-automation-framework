import { Locator, Page } from "@playwright/test";
import { CategoryTreeComponent } from "../widgets/CategoryTreeComponent";
import { BrandListComponent } from "../widgets/BrandListComponent";

export class SidebarComponent {
    private readonly categoriesSection: Locator;
    private readonly brandsSection: Locator;
    readonly categoryTree: CategoryTreeComponent;
    readonly brandList: BrandListComponent;

    constructor(private readonly page: Page) {
        this.categoriesSection = this.page.locator(".category-products");
        this.brandsSection = this.page.locator(".brands-name");
        this.categoryTree = new CategoryTreeComponent(this.categoriesSection);
        this.brandList = new BrandListComponent(this.brandsSection);
    }
}