import { expect } from '@playwright/test';

/**
 * Utility class for verification and assertion functions related to API responses
 */
class Verification {

    /**
     * Asserts that the response status code matches the expected status code
     * @param {Response} response 
     * @param {number} expectedStatusCode 
     */
    assertResponseStatusCode(response, expectedStatusCode) {
        console.log("Response Status code is: ", expectedStatusCode);
        expect(response).toBe(expectedStatusCode);
    }

}

export default new Verification;