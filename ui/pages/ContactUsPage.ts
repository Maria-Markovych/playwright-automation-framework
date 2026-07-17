import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ContactData } from "../../models/ContactData";
import { HomePage } from "./HomePage";

export class ContactUsPage extends BasePage {
    readonly SUCCESS_MESSAGE = "Success! Your details have been submitted successfully.";
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly subjectInput: Locator;
    private readonly messageInput: Locator;
    private readonly uploadInput: Locator;
    private readonly submitBtn: Locator;
    private readonly successMessageLabel: Locator;
    private readonly homeBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.nameInput = this.page.locator("input[data-qa='name']");
        this.emailInput = this.page.locator("input[data-qa='email']");
        this.subjectInput = this.page.locator("input[data-qa='subject']");
        this.messageInput = this.page.locator("textarea[data-qa='message']");
        this.uploadInput = this.page.locator("input[name='upload_file']");
        this.submitBtn = this.page.locator("input[data-qa='submit-button']");
        this.successMessageLabel = this.page.locator(".status");
        this.homeBtn = this.page.locator(".btn-success");
    }

    async fillContactForm(contact: ContactData): Promise<void> {
        await this.nameInput.fill(contact.name);
        await this.emailInput.fill(contact.email);
        await this.subjectInput.fill(contact.subject);
        await this.messageInput.fill(contact.message);
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.uploadInput.setInputFiles(filePath);
    }

    async submit(): Promise<void> {
        this.page.once("dialog", dialog => dialog.accept());
        await this.submitBtn.click();
    }

    async getSuccessMessage(): Promise<string> {
        return this.successMessageLabel.innerText();
    }

    async gotoHomePage(): Promise<HomePage> {
        await this.homeBtn.click();
        return new HomePage(this.page);
    }
}