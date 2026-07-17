import { AddressData } from "../../models/AddressData";

export const addressData = {
    test_user: {
        firstName: "Mariia",
        lastName: "Ivanova",
        company: "test comopany",
        address1: "test",
        country: "Canada",
        state: "efsdf",
        city: "sdfsf",
        zipcode: "2525",
        mobileNumber: "12345678"
    }
} satisfies Record<string, AddressData>;