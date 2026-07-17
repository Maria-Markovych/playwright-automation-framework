import { Locator, Page } from "@playwright/test";

export class AdvertisementComponent {
    private readonly closeButton: Locator;
    private readonly topAdCollapseButton: Locator;

    constructor(private readonly page: Page) {
        // Bottom floating advertisement
        this.closeButton = page.locator("div.close-button-outer");
        // Top Google Anchor advertisement
        this.topAdCollapseButton = page.locator("g.up");
    }

    private async clickIfExists(locator: Locator): Promise<void> {
        if (await locator.count()) {
            await locator.click();
        }
    }

    async closeIfVisible(): Promise<void> {
        await this.clickIfExists(this.closeButton);
        await this.clickIfExists(this.topAdCollapseButton);
    }
}