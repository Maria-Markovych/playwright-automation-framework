import { Locator } from "@playwright/test";

export class CategoryTreeComponent {
    private readonly groupPanels: Locator;


    constructor(categoryRoot: Locator) {
        this.groupPanels = categoryRoot.locator(".panel");
    }

    async getCategories(): Promise<string[]> {
        return this.groupPanels.allInnerTexts();
    }

    async expandCategory(groupName: string): Promise<void> {
        const panel = this.getGroupPanel(groupName);
        if (!(await panel.locator(".panel-collapse.in").isVisible())) {
            await panel.locator(".fa-plus").click();
        }
    }

    async selectCategory(groupName: string, categoryName: string): Promise<void> {
        const panel = this.getGroupPanel(groupName);
        await this.expandCategory(groupName);
        await panel.locator(".panel-body a").filter({ hasText: categoryName }).click();
    }

    private getGroupPanel(groupName: string): Locator {
        return this.groupPanels.filter({ hasText: groupName });
    }
}