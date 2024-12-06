import { log } from 'console';
import config from '../playwright.config'
import { expect } from '@playwright/test';



class ApiUtils {
    constructor(apiContext) {

        this.apiContext = apiContext;
    }

    async CreateUser(uri, data) {
        const createData = {
            headers: config.use.headers,
            data: JSON.stringify(data)
        };

        const response = await this.apiContext.post(uri, createData);
        const body = await response.json();
        ApiUtils.assertSuccessResponseStatusCode(response);

        return body;

    }

    static assertSuccessResponseStatusCode(response) {
        console.log(`Status Code is: ${response.status()}`)
        expect(response.ok()).toBeTruthy();
    }

    static assertResponseStatusCode(response, statusCode) {
        console.log(`Status Code is: ${response.status()}`)
        expect(response.status()).toBe(statusCode);
    }

}
module.exports = ApiUtils;