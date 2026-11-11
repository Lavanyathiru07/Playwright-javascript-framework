import { Given, When, Then,Before,After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';
import ApiUtils from '../utils/apiClient.js';

import ProductsApiPage from '../pages/ProductsApiPage.js';

let apiContext;
let apiUtils;
let productsApiPage;

function validateProducts(responseBody, searchTerm) {
    expect(responseBody).toEqual(expect.objectContaining({
        responseCode: 200,
        products: expect.any(Array)
    }));
    expect(responseBody.products.length).toBeGreaterThan(0);

    for (const product of responseBody.products) {
        expect(product).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            brand: expect.any(String),
            category: expect.any(Object)
        }));
        expect(product.name.trim().length).toBeGreaterThan(0);
        expect(product.price.trim().length).toBeGreaterThan(0);
        expect(product.brand.trim().length).toBeGreaterThan(0);

        if (searchTerm) {
            expect(product.name.toLowerCase()).toContain(searchTerm.toLowerCase());
        }
    }
}

Before(async function (scenario) {

    console.log(`\n[API Scenario] ${scenario.pickle.name}`);

    apiContext = await request.newContext();

    apiUtils = new ApiUtils(
        apiContext,
        'https://automationexercise.com'
    );

    productsApiPage = new ProductsApiPage(apiUtils);
});

When(
    'user verifies API login with email {string} and password {string}',
    async function (email, password) {
        console.log(`[API Request] POST ${productsApiPage.verifyLoginEndpoint} (email: ${email})`);
        this.response = await productsApiPage.verifyLogin(email, password);
        this.responseBody = await apiUtils.getResponseBody(this.response);
    }
);

Then('API login should be successful', async function () {
    expect(this.responseBody.responseCode).toBe(200);
    expect(this.responseBody.message).toBe('User exists!');
    console.log(`[API Response] Login verified: ${this.responseBody.message} (responseCode: ${this.responseBody.responseCode})`);
});

When('user sends GET request to get all products', async function () {

    console.log(`[API Request] GET ${productsApiPage.productsEndpoint}`);

    this.response = await productsApiPage.getAllProducts();

    this.responseBody =
        await apiUtils.getResponseBody(this.response);
});

Then(
    'API response status should be {int}',
    async function (statusCode) {

        const actualStatus = this.response.status();
        console.log(`[API Response] HTTP status ${actualStatus} (expected ${statusCode})`);

        await apiUtils.verifyHttpStatus(
            this.response,
            statusCode
        );
        expect(this.responseBody).toEqual(expect.objectContaining({
            responseCode: statusCode
        }));
    }
);

Then('products list should be returned', async function () {
    validateProducts(this.responseBody);
    const productNames = this.responseBody.products
        .slice(0, 5)
        .map(product => product.name)
        .filter(Boolean);
    console.log(`[API Response] Returned ${this.responseBody.products.length} products: ${productNames.join(', ')}`);
});

When(
    'user searches product {string} through API',
    async function (productName) {

        console.log(`[API Request] POST ${productsApiPage.searchProductEndpoint} (search_product: ${productName})`);
        this.searchTerm = productName;

        this.response =
            await productsApiPage.searchProduct(productName);

        this.responseBody =
            await apiUtils.getResponseBody(this.response);
    }
);

Then(
    'search product response should contain products',
    async function () {
        validateProducts(this.responseBody, this.searchTerm);

        const productNames = this.responseBody.products
            .map(product => product.name)
            .filter(Boolean);
        console.log(`[API Response] Found ${this.responseBody.products.length} matching products: ${productNames.join(', ')}`);
    }
);

After(async function (scenario) {

    if (apiContext) {
        await apiContext.dispose();
        console.log(`[API Scenario] Finished: ${scenario.pickle.name} (${scenario.result?.status})`);
    }
});
