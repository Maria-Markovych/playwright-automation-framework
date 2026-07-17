import { Locator, Page } from "@playwright/test";
import { SidebarComponent } from "../components/SideBarComponent";
import { AddedModalComponent } from "../components/AddedModalComponent";


export class ProductDetailsPage {
    private readonly productNameLabel: Locator;
    private readonly categoryLabel: Locator;
    private readonly priceLabel: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartBtn: Locator;
    private readonly availabilityLabel: Locator;
    private readonly conditionLabel: Locator;
    private readonly brandLabel: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly reviewInput: Locator;
    private readonly submitBtn: Locator;
    readonly sidebar: SidebarComponent;

    constructor(readonly page: Page) {

        this.productNameLabel = this.page.locator("img + h2");
        this.categoryLabel = this.page.locator("img + h2 + p");
        this.priceLabel = this.page.locator("span span");
        this.quantityInput = this.page.locator("input#quantity");
        this.addToCartBtn = this.page.getByRole("button", { name: "Add to Cart" });
        this.availabilityLabel = this.page.locator("div.product-information p").filter({ hasText: "Availability" });
        this.conditionLabel = this.page.locator("div.product-information p").filter({ hasText: "Condition" });
        this.brandLabel = this.page.locator("div.product-information p").filter({ hasText: "Brand" });
        this.nameInput = this.page.getByPlaceholder("Your Name");
        this.emailInput = this.page.getByPlaceholder("Email Address");
        this.reviewInput = this.page.getByPlaceholder("Add Review Here!");
        this.submitBtn = this.page.getByRole("button", { name: "Submit" });
        this.sidebar = new SidebarComponent(this.page);
    }

    async getProductName(): Promise<string> {
        return this.productNameLabel.innerText();
    }

    async getCategory(): Promise<string> {
        const category = await this.categoryLabel.innerText();
        return category.replace("Category:", "").trim();
    }

    async getPrice(): Promise<number> {
        const price = await this.priceLabel.innerText();
        return Number(price.replace("Rs. ", ""));
    }

    async getAvailability(): Promise<string> {
        const availability = await this.availabilityLabel.innerText();
        return availability.replace("Availability:", "").trim();
    }


    async getCondition(): Promise<string> {
        const condition = await this.conditionLabel.innerText();
        return condition.replace("Condition:", "").trim();
    }

    async getBrand(): Promise<string> {
        const brand = await this.brandLabel.innerText();
        return brand.replace("Brand:", "").trim();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(quantity.toString());
    }

    async goToAddedModal(): Promise<AddedModalComponent> {
        await this.addToCartBtn.click();
        return new AddedModalComponent(this.page);
    }

}