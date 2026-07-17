import { Endpoints } from "../client/Endpoints";
import { ApiClient } from "../client/ApiClient";
import { APIResponse } from "@playwright/test";

export class BrandsService extends ApiClient {

    async getBrands(): Promise<APIResponse> {
        return this.request.get(Endpoints.brands);
    }

}