import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";


export abstract class BasePage {
    protected readonly page: Page;
    readonly header: HeaderComponent;
    readonly footer: FooterComponent;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);
    }
}