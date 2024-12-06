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
        expect(response.ok()).toBeTruthy();
    }

}
module.exports = ApiUtils;