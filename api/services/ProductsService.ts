import { Endpoints } from "../client/Endpoints";
import { ApiClient } from "../client/ApiClient";
import { APIResponse } from "@playwright/test";

export class ProductsService extends ApiClient {

    async getProducts(): Promise<APIResponse> {
        return this.request.get(Endpoints.products);
    }

    async searchProducts(searchProduct?: string): Promise<APIResponse> {
        const form: Record<string, string> = {};

        if (searchProduct !== undefined) {
            form.search_product = searchProduct;
        }

        return this.request.post(Endpoints.searchProduct, {
            form
        })

    }

}