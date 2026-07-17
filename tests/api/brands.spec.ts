import { apiTest as test, expect } from "../../fixtures/api";
import { BrandsService } from "../../api/services/BrandsService";
import { BrandsResponse } from "../../api/models/responses/BrandsResponse";
import { brandData } from "../../test-data/api/brandData";
import * as allure from "allure-js-commons";

test("Get brands list successfully", async ({ apiRequest }) => {

    await allure.description(
        "Verify that the brands list can be successfully retrieved."
    );
    await allure.severity("critical");
    await allure.tags("API", "Smoke", "Brands");

    const brandsService = new BrandsService(apiRequest);

    const response = await allure.step(
        "Retrieve brands list",
        async () => {
            return await brandsService.getBrands();
        }
    );

    const body = await response.json() as BrandsResponse;
    const firstBrand = body.brands[0];

    await allure.step("Verify brands list response", async () => {
        expect(response.status()).toBe(200);
        expect(body.responseCode).toBe(200);
        expect(body.brands).toBeInstanceOf(Array);
        expect(body.brands.length).toBeGreaterThan(0);

        expect(firstBrand).toMatchObject(brandData.firstBrand);
    });
});