import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartContainer } from "../containers/CartContainer";
import { CartItem } from "../components/CartItem";
import { HomePage } from "./HomePage";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage extends BasePage {
    readonly EMPTY_CART_MESSAGE = "Cart is empty!";
    private readonly cartContainer: CartContainer;
    private readonly homeBtn: Locator;
    private readonly proceedToCheckoutBtn: Locator;
    private readonly cartEmptyLabel: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.cartContainer = new CartContainer(page);
        this.homeBtn = page.getByRole("link", { name: "Home" });
        this.proceedToCheckoutBtn = page.getByText("Proceed To Checkout");
        this.cartEmptyLabel = this.page.locator("#empty_cart b");
    }

    async getCartItems(): Promise<CartItem[]> {
        return this.cartContainer.getCartItems();
    }

    async getCartItemByName(productName: string): Promise<CartItem> {
        return this.cartContainer.getCartItemByName(productName);
    }

    async getCartItemsName(): Promise<string[]> {
        return this.cartContainer.getCartItemsName();
    }

    async getCartItemsCount(): Promise<number> {
        return this.cartContainer.getCartItemsCount();
    }

    async getEmptyCartMessage(): Promise<string> {
        return this.cartEmptyLabel.innerText();
    }

    async gotoHomePage(): Promise<HomePage> {
        await this.homeBtn.click();
        return new HomePage(this.page);
    }

    async gotoCheckoutPage(): Promise<CheckoutPage> {
        await this.proceedToCheckoutBtn.click();
        return new CheckoutPage(this.page);
    }

    async clearCart(): Promise<void> {
        const items = await this.getCartItems();

        for (const item of items) {
            await item.deleteCartItem();
        }
    }

    async removeCartItem(productName: string): Promise<void> {
        const item = await this.getCartItemByName(productName);
        await item.deleteCartItem();

        await this.page
            .locator("#cart_info_table tbody tr")
            .filter({ hasText: productName })
            .waitFor({ state: "detached" });
    }

}