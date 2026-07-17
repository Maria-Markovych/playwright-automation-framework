import { test as base, APIRequestContext, request as playwrightRequest } from "@playwright/test";
import { ProductsService } from "../api/services/ProductsService";
import { LoginService } from "../api/services/LoginService";
import { AccountService } from "../api/services/AccountService";
import { environment } from "../utils/env";


type ApiFixtures = {
    apiRequest: APIRequestContext;
    productsService: ProductsService;
    loginService: LoginService;
    accountService: AccountService;
}

export const apiTest = base.extend<ApiFixtures>({
    apiRequest: async ({ }, use) => {
        const apiContext = await playwrightRequest.newContext({
            baseURL: environment.apiUrl
        });
        await use(apiContext);
        await apiContext.dispose();
    },

    productsService: async ({ apiRequest }, use) => {
        const productsService = new ProductsService(apiRequest);
        await use(productsService);
    },

    loginService: async ({ apiRequest }, use) => {
        const loginService = new LoginService(apiRequest);
        await use(loginService);
    },

    accountService: async ({ apiRequest }, use) => {
        const accountService = new AccountService(apiRequest);
        await use(accountService);
    }
});

export { expect } from "@playwright/test";