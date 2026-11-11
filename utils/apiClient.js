import { request,expect } from '@playwright/test';

export default class apiClient {

    constructor(request, baseUrl) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async get(endpoint, headers = {}) {
        return await this.request.get(`${this.baseUrl}${endpoint}`, {
            headers
        });
    }

    async post(endpoint, data = {}, headers = {}) {
        return await this.request.post(`${this.baseUrl}${endpoint}`, {
            headers,
            form: data
        });
    }

    async put(endpoint, data = {}, headers = {}) {
        return await this.request.put(`${this.baseUrl}${endpoint}`, {
            headers,
            form: data
        });
    }

    async delete(endpoint, data = {}, headers = {}) {
        return await this.request.delete(`${this.baseUrl}${endpoint}`, {
            headers,
            form: data
        });
    }

    async getResponseBody(response) {
        return await response.json();
    }

    async verifyHttpStatus(response, expectedStatus) {
        expect(response.status()).toBe(Number(expectedStatus));
    }

    async verifyResponseValue(responseBody, key, expectedValue) {
        expect(responseBody[key]).toBe(expectedValue);
    }
}
