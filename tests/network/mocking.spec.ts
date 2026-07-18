import { test, expect } from "../../fixtures";
import * as allure from "allure-js-commons";
import { environment } from "../../utils/env";
import { ProductsPage } from "../../ui/pages/ProductsPage";

test.describe("Network Mocking", () => {
    test('should mock products page with route.fulfill', async ({ page }) => {
        await allure.description("Demonstrates how to completely mock a page response using route.fulfill.");
        await allure.tags("UI", "Network", "Mocking");

        await page.route('**/products', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Mock Products</title>
          </head>
          <body>
            <h2 class="title text-center">Mock Products</h2>

            <div class="product">
              <h2>Rs. 9999</h2>
              <p>Mock Product</p>
            </div>
          </body>
        </html>
      `,
            });
        });

        await page.goto(
            `${environment.baseUrl}products`,
            {
                waitUntil: 'domcontentloaded'
            }
        );


        await expect(page.locator('h2.title')).toHaveText('Mock Products');

        await expect(page.locator('.product p')).toHaveText('Mock Product');
    });

    test('should modify products request before sending it to the server', async ({ page }) => {
        await allure.description("Demonstrates how to modify request parameters before sending a request to the server.");
        await allure.tags("UI", "Network", "Mocking");

        await page.route('**/products', async route => {
            const url = new URL(route.request().url());

            url.searchParams.set('search', 'Blue Top');

            await route.continue({
                url: url.toString(),
            });
        });

        await page.goto(
            `${environment.baseUrl}products`,
            {
                waitUntil: 'domcontentloaded'
            }
        );
        const productsPage = new ProductsPage(page);
        const cards = await productsPage.getProductCards();

        expect(cards.length).toBe(1);
        expect(await cards[0].getProductName()).toBe("Blue Top");
    });

    test('should abort products page request', async ({ page }) => {
        await allure.description("Demonstrates how to abort a network request using route.abort() and verify the resulting request failure.");
        await allure.tags("UI", "Network", "Mocking");

        let productsRequestFailed = false;

        await page.route('**/products', async route => {
            await route.abort();
        });

        page.on('requestfailed', request => {
            if (request.url().includes('/products')) {
                productsRequestFailed = true;
            }
        });

        await expect(
            page.goto(
                `${environment.baseUrl}products`,
                {
                    waitUntil: 'domcontentloaded'
                }
            )
        ).rejects.toThrow();

        await expect.poll(() => productsRequestFailed).toBe(true);
    });
});