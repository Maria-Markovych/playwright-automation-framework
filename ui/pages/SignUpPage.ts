import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../../models/User";
import { HomePage } from "./HomePage";
import { AccountInformation } from "../../models/AccountInformation";
import { AddressData } from "../../models/AddressData";
import { AccountCreatedPage } from "./AccountCreatedPage";


export class SignUpPage extends BasePage {
    private readonly mrCheckbox: Locator;
    private readonly mrsCheckbox: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly daySelect: Locator;
    private readonly monthSelect: Locator;
    private readonly yearSelect: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyInput: Locator;
    private readonly address1Input: Locator;
    private readonly address2Input: Locator;
    private readonly countrySelect: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileNumberInput: Locator;
    private readonly createAccountBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.mrCheckbox = this.page.getByRole("radio", { name: "Mr." });
        this.mrsCheckbox = this.page.getByRole("radio", { name: "Mrs." })
        this.nameInput = this.page.getByLabel("Name");
        this.emailInput = this.page.getByLabel("Email");
        this.passwordInput = this.page.getByLabel("Password");
        this.daySelect = this.page.locator("select[data-qa='days']");
        this.monthSelect = this.page.locator("select[data-qa='months']");
        this.yearSelect = this.page.locator("select[data-qa='years']");
        this.firstNameInput = this.page.getByLabel("First name");
        this.lastNameInput = this.page.getByLabel("Last name");
        this.companyInput = this.page.locator("#company");
        this.address1Input = this.page.locator("#address1");
        this.address2Input = this.page.locator("#address2");
        this.countrySelect = this.page.locator("select[data-qa='country']");
        this.stateInput = this.page.locator("#state");
        this.cityInput = this.page.locator("#city");
        this.zipcodeInput = this.page.locator("#zipcode");
        this.mobileNumberInput = this.page.locator("#mobile_number");
        this.createAccountBtn = this.page.locator("button[data-qa='create-account']");
    }

    async selectGender(account: AccountInformation): Promise<void> {
        if (account.gender === "Mr") {
            await this.mrCheckbox.check()
        } else {
            await this.mrsCheckbox.check();
        }
    }

    async fillPasswordInput(user: User): Promise<void> {
        await this.passwordInput.fill(user.password);
    }

    async selectDateOfBirth(account: AccountInformation): Promise<void> {
        await this.daySelect.selectOption(account.day);
        await this.monthSelect.selectOption(account.month);
        await this.yearSelect.selectOption(account.year);
    }

    async fillAccountInformation(user: User, account: AccountInformation): Promise<void> {
        await this.selectGender(account);
        await this.fillPasswordInput(user);
        await this.selectDateOfBirth(account);

    }

    async fillAddressInformation(address: AddressData): Promise<void> {
        await this.firstNameInput.fill(address.firstName);
        await this.lastNameInput.fill(address.lastName);
        await this.companyInput.fill(address.company);
        await this.address1Input.fill(address.address1);
        await this.countrySelect.selectOption(address.country);
        await this.stateInput.fill(address.state);
        await this.cityInput.fill(address.city);
        await this.zipcodeInput.fill(address.zipcode);
        await this.mobileNumberInput.fill(address.mobileNumber);
    }

    async createAccount(): Promise<AccountCreatedPage> {
        await this.createAccountBtn.click();
        return new AccountCreatedPage(this.page);
    }
}