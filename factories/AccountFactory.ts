import { AccountInformation } from "../models/AccountInformation"

export class AccountFactory {
    static createAccount(overrides?: Partial<AccountInformation>): AccountInformation {
        return {
            gender: "Mr",
            day: "23",
            month: "April",
            year: "2000",
            ...overrides
        }
    }
}