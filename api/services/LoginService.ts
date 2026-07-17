import { Endpoints } from "../client/Endpoints";
import { APIResponse } from "@playwright/test";
import { ApiClient } from "../client/ApiClient";

export class LoginService extends ApiClient {

    async verifyLogin(email?: string, password?: string): Promise<APIResponse> {
        const form: Record<string, string> = {};

        if (email !== undefined) {
            form.email = email;
        }

        if (password !== undefined) {
            form.password = password;
        }

        return this.request.post(Endpoints.verifyLogin, {
            form
        });
    }
}