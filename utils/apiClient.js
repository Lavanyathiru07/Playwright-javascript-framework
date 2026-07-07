import { request } from '@playwright/test';
import Logger from '../utils/logger.js';
import config from '../config.js';

export default class ApiClient {

    constructor(baseURL) {
        this.baseURL = config.dev.apiURL;
    }

    /**
     * Creates Playwright API Context
     *
     * @param {Object} headers - Optional request headers
     * @returns {Promise<import('@playwright/test').APIRequestContext>}
     */
    async createContext(headers = {}) {

        return await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: headers
        });

    }

    /**
     * Generic GET Method
     *
     * @param {string} endpoint
     * @param {Object} headers
     * @returns {Promise<Response>}
     */
    async get(endpoint, headers = {}) {

        try {

            Logger.step(`GET ${endpoint}`);

            const apiContext = await this.createContext(headers);

            const response = await apiContext.get(endpoint);

            Logger.info(`Status Code: ${response.status()}`);

            return response;

        } catch (error) {

            Logger.error(`GET Request Failed: ${endpoint}`);
            throw error;
        }
    }

    /**
     * Generic POST Method
     *
     * @param {string} endpoint
     * @param {Object} data
     * @param {Object} headers
     * @returns {Promise<Response>}
     */
    async post(endpoint, data, headers = {}) {

        try {

            Logger.step(`POST ${endpoint}`);

            Logger.info(
                `Request Body:\n${JSON.stringify(data, null, 2)}`
            );

            const apiContext = await this.createContext(headers);

            const response = await apiContext.post(endpoint, {
                data
            });

            Logger.info(`Status Code: ${response.status()}`);

            return response;

        } catch (error) {

            Logger.error(`POST Request Failed: ${endpoint}`);
            throw error;
        }
    }

    /**
     * Generic PUT Method
     *
     * @param {string} endpoint
     * @param {Object} data
     * @param {Object} headers
     * @returns {Promise<Response>}
     */
    async put(endpoint, data, headers = {}) {

        try {

            Logger.step(`PUT ${endpoint}`);

            Logger.info(
                `Request Body:\n${JSON.stringify(data, null, 2)}`
            );

            const apiContext = await this.createContext(headers);

            const response = await apiContext.put(endpoint, {
                data
            });

            Logger.info(`Status Code: ${response.status()}`);

            return response;

        } catch (error) {

            Logger.error(`PUT Request Failed: ${endpoint}`);
            throw error;
        }
    }

    /**
     * Generic PATCH Method
     *
     * @param {string} endpoint
     * @param {Object} data
     * @param {Object} headers
     * @returns {Promise<Response>}
     */
    async patch(endpoint, data, headers = {}) {

        try {

            Logger.step(`PATCH ${endpoint}`);

            Logger.info(
                `Request Body:\n${JSON.stringify(data, null, 2)}`
            );

            const apiContext = await this.createContext(headers);

            const response = await apiContext.patch(endpoint, {
                data
            });

            Logger.info(`Status Code: ${response.status()}`);

            return response;

        } catch (error) {

            Logger.error(`PATCH Request Failed: ${endpoint}`);
            throw error;
        }
    }

    /**
     * Generic DELETE Method
     *
     * @param {string} endpoint
     * @param {Object} headers
     * @returns {Promise<Response>}
     */
    async delete(endpoint, headers = {}) {

        try {

            Logger.step(`DELETE ${endpoint}`);

            const apiContext = await this.createContext(headers);

            const response = await apiContext.delete(endpoint);

            Logger.info(`Status Code: ${response.status()}`);

            return response;

        } catch (error) {

            Logger.error(`DELETE Request Failed: ${endpoint}`);
            throw error;
        }
    }

    /**
     * Validates Response Status Code
     *
     * @param {Response} response
     * @param {number} expectedStatusCode
     */
    verifyStatusCode(response, expectedStatusCode) {

        const actualStatusCode = response.status();

        if (actualStatusCode !== expectedStatusCode) {

            throw new Error(
                `Status Code Validation Failed.
Expected: ${expectedStatusCode}
Actual: ${actualStatusCode}`
            );
        }

        Logger.info(
            `Status Code Validation Passed. Expected: ${expectedStatusCode}, Actual: ${actualStatusCode}`
        );
    }

    /**
     * Logs JSON Response
     *
     * @param {Response} response
     */
    async logResponse(response) {

        try {

            const body = await response.json();

            Logger.info(
                `Response Body:\n${JSON.stringify(body, null, 2)}`
            );

        } catch {

            const body = await response.text();

            Logger.info(`Response Body:\n${body}`);
        }
    }
}