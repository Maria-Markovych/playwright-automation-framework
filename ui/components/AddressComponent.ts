import { Locator } from "@playwright/test";

export class AddressComponent {
    private readonly addressNameLabel: Locator;
    private readonly companyLabel: Locator;
    private readonly address1Label: Locator;
    private readonly cityStateZipcodeLabel: Locator;
    private readonly countryLabel: Locator;
    private readonly mobileNumberLabel: Locator;

    constructor(private readonly root: Locator) {
        this.addressNameLabel = this.root.locator(".address_firstname");
        this.companyLabel = this.root.locator(".address_address1").first();
        this.address1Label = this.root.locator(".address_address1").nth(1);
        this.cityStateZipcodeLabel = this.root.locator(".address_city");
        this.countryLabel = this.root.locator(".address_country_name");
        this.mobileNumberLabel = this.root.locator(".address_phone");
    }

    async getAddressName(): Promise<string> {
        return this.addressNameLabel.innerText();
    }

    async getCompany(): Promise<string> {
        return this.companyLabel.innerText();
    }

    async getAddress1(): Promise<string> {
        return this.address1Label.innerText();
    }

    async getCityStateZipCode(): Promise<string> {
        return this.cityStateZipcodeLabel.innerText();
    }

    async getCountry(): Promise<string> {
        return this.countryLabel.innerText();
    }

    async getMobileNumber(): Promise<string> {
        return this.mobileNumberLabel.innerText();
    }
}