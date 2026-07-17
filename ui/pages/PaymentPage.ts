import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CardData } from "../../models/CardData";
import { OrderPlacedPage } from "./OrderPlacedPage";

export class PaymentPage extends BasePage {
    private readonly cardNameInput: Locator;
    private readonly cardNumberInput: Locator;
    private readonly cvcInput: Locator;
    private readonly expirationMonthInput: Locator;
    private readonly expirationYearInput: Locator;
    private readonly payAndConfirmOrderBtn: Locator;

    constructor(readonly page: Page) {
        super(page)
        this.cardNameInput = this.page.locator("input[data-qa='name-on-card']");
        this.cardNumberInput = this.page.locator("input[data-qa='card-number']");
        this.cvcInput = this.page.locator("input[data-qa='cvc']");
        this.expirationMonthInput = this.page.locator("input[data-qa='expiry-month']");
        this.expirationYearInput = this.page.locator("input[data-qa='expiry-year']");
        this.payAndConfirmOrderBtn = this.page.locator("button[data-qa='pay-button']");
    }

    async enterCardData(card: CardData): Promise<void> {
        await this.cardNameInput.fill(card.cardName);
        await this.cardNumberInput.fill(card.cardNumber);
        await this.cvcInput.fill(card.cvc);
        await this.expirationMonthInput.fill(card.expirationMonth);
        await this.expirationYearInput.fill(card.expirationYear);
    }

    async placeOrder(): Promise<OrderPlacedPage> {
        await this.payAndConfirmOrderBtn.click();
        return new OrderPlacedPage(this.page);
    }
}