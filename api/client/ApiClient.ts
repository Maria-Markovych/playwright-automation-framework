import { APIRequestContext } from "@playwright/test";

export abstract class ApiClient {
    constructor(protected readonly request: APIRequestContext) {

    }
}