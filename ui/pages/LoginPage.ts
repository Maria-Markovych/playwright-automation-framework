import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePage } from "./HomePage";
import { User } from "../../models/User";
import { environment } from "../../utils/env";
import { SignUpPage } from "./SignUpPage";


export class LoginPage extends BasePage {
    readonly EMAIL_ALREADY_EXISTS_MESSAGE = "Email Address already exist!";
    readonly LOGIN_FAILED_MESSAGE = "Your email or password is incorrect!";

    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly nameInput: Locator;
    private readonly emailAddressInput: Locator;
    private readonly signupButton: Locator;
    private readonly emailAlreadyExistsLabel: Locator;
    private readonly loginErrorLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.locator("input[data-qa='login-email']");
        this.passwordInput = this.page.locator("input[data-qa='login-password']");
        this.loginButton = this.page.locator("button[data-qa='login-button']");
        this.nameInput = this.page.locator("input[data-qa='signup-name']");
        this.emailAddressInput = this.page.locator("input[data-qa='signup-email']");
        this.signupButton = this.page.locator("button[data-qa='signup-button']");
        this.emailAlreadyExistsLabel = this.page.locator("input[name='form_type'] + p");
        this.loginErrorLabel = this.page.locator("input[data-qa='login-password'] + p");
    }

    async getEmailAlreadyExistsMessage(): Promise<string> {
        await this.emailAlreadyExistsLabel.waitFor({ state: "visible" });
        return this.emailAlreadyExistsLabel.innerText();
    }

    async getLoginErrorMessage(): Promise<string> {
        await this.loginErrorLabel.waitFor({ state: "visible" });
        return this.loginErrorLabel.innerText();
    }

    async submitLogin(user: User): Promise<void> {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }

    async login(user: User): Promise<HomePage> {
        await Promise.all([
            this.page.waitForURL(environment.baseUrl),
            this.submitLogin(user)
        ]);


        return new HomePage(this.page);
    }

    async signup(user: User): Promise<SignUpPage> {
        if (!user.username) {
            throw new Error("Username is required for signup.");
        }
        await this.nameInput.fill(user.username);
        await this.emailAddressInput.fill(user.email);
        await this.signupButton.click();
        return new SignUpPage(this.page);
    }
}