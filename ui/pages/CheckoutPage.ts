import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AddressComponent } from "../components/AddressComponent";
import { CartContainer } from "../containers/CartContainer";
import { PaymentPage } from "./PaymentPage";
import { CartItem } from "../components/CartItem";

export class CheckoutPage extends BasePage {
    private readonly homeLink: Locator;
    private readonly addresscomponent: AddressComponent;
    private readonly cartContainer: CartContainer;
    private readonly totalAmountLabel: Locator;
    private readonly commentInput: Locator;
    private readonly placeOrderBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.homeLink = this.page.getByRole("link", { name: "Home" });
        this.addresscomponent = new AddressComponent(this.page.locator("#address_delivery"));
        this.totalAmountLabel = this.page.locator(".cart_total_price").last();
        this.cartContainer = new CartContainer(this.page);
        this.commentInput = this.page.locator(".form-control");
        this.placeOrderBtn = this.page.getByRole("link", { name: "Place Order" });
    }

    async getTotalAmount(): Promise<number> {
        const amount = (await this.totalAmountLabel.innerText()).replace("Rs. ", "");
        return Number(amount);
    }

    async goToPaymentPage(): Promise<PaymentPage> {
        await this.placeOrderBtn.click();
        return new PaymentPage(this.page);
    }

    getAddress(): AddressComponent {
        return this.addresscomponent;
    }

    async enterComment(comment: string): Promise<void> {
        this.commentInput.fill(comment);
    }

    async getCartItemByName(productName: string): Promise<CartItem> {
        return this.cartContainer.getCartItemByName(productName);
    }
}