import { CreateAccountRequest } from "../api/models/requests/CreateAccountRequest";
import { UserFactory } from "./UserFactory";
import { AccountFactory } from "./AccountFactory";
import { AddressFactory } from "./AddressFactory";

export class CreateAccountFactory {

    static create(
        overrides?: Partial<CreateAccountRequest>
    ): CreateAccountRequest {

        const user = UserFactory.createUser();
        const account = AccountFactory.createAccount();
        const address = AddressFactory.createAddress();

        return {
            name: user.username!,
            email: user.email,
            password: user.password,

            title: account.gender,
            birth_date: account.day,
            birth_month: account.month,
            birth_year: account.year,

            firstname: address.firstName,
            lastname: address.lastName,
            company: address.company,
            address1: address.address1,
            address2: address.address2!,
            country: address.country,
            zipcode: address.zipcode,
            state: address.state,
            city: address.city,
            mobile_number: address.mobileNumber,

            ...overrides
        };
    }
}