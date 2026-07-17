import { AddressData } from "../models/AddressData";

export class AddressFactory {
    static createAddress(overrides?: Partial<AddressData>): AddressData {
        return {
            firstName: "first name",
            lastName: "last name",
            company: "test company",
            address1: "address1",
            address2: "address2",
            country: "Australia",
            state: "test state",
            city: "test city",
            zipcode: "1234",
            mobileNumber: "123456789",
            ...overrides
        }
    }
}