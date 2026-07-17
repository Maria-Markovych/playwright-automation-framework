import { Endpoints } from "../client/Endpoints";
import { APIResponse } from "@playwright/test";
import { ApiClient } from "../client/ApiClient";
import { CreateAccountRequest } from "../models/requests/CreateAccountRequest";

export class AccountService extends ApiClient {

    async createAccount(account: CreateAccountRequest): Promise<APIResponse> {
        return this.request.post(Endpoints.createAccount, {
            form: { ...account }
        });
    }

    async deleteAccount(account: CreateAccountRequest): Promise<APIResponse> {
        return this.request.delete(Endpoints.deleteAccount, {
            form: {
                email: account.email,
                password: account.password
            }
        });
    }

    async updateAccount(account: CreateAccountRequest): Promise<APIResponse> {
        return this.request.put(Endpoints.updateAccount, {
            form: { ...account }
        });
    }

    async getUserDetailByEmail(email: string): Promise<APIResponse> {
        return this.request.get(Endpoints.getUserDetailByEmail, {
            params: {
                email
            }
        })
    }


}