import { test, expect, request } from '@playwright/test';
import config from '../playwright.config'
import { generateUserData } from '../utils/faker_data.js'

import ApiEndPoint from '../utils/ApiEndPoint';
import responseVerification from '../utils/response-verification.js';
const ApiUtils = require('../utils/ApiUtils.js');

test.describe('CRUD operations for GOREST api', async () => {

    let userid;
    let apiContext;
    let apiUtils;
    const userUri = config.use.path + ApiEndPoint.CREATE_USER;
    const userData = generateUserData();


    test.beforeAll(async () => {

        apiContext = await request.newContext();
        apiUtils = new ApiUtils(apiContext);

    })

    test('should return success for create user gorest api @regression', async () => {

        const CreateUserData = await apiUtils.CreateUser(userUri, userData);
        userid = CreateUserData.id;
        expect(userid).toBeGreaterThan(0);

        expect(CreateUserData.name).toBe(userData.name);
        //another way to verify
        expect(CreateUserData).toHaveProperty("email", userData.email)

    })

    test('should return success to read user from gorest api @regression', async () => {
        if (!userid) {

            const getUserData = await apiUtils.CreateUser(userUri, userData);
            userid = getUserData.id;
        }

        const fetchData = {
            headers: config.use.headers
        };

        const response = await apiContext.get(`${userUri}/${userid}`, fetchData);

        const body = await response.json();
        responseVerification.assertResponseStatusCode(response.status(), 200);

        expect(body.id).toBe(userid);
        expect(body.name).toBe(userData.name);
        expect(body.email).toBe(userData.email);

    })

    test('should return success to update user data for gorest api @regression', async () => {

        if (!userid) {
            const CreateUserData = await apiUtils.CreateUser(userUri, userData);
            userid = CreateUserData.id;
        }

        const fetchData = {
            headers: config.use.headers,
            data: {
                status: "inactive"
            }
        };

        const response = await apiContext.put(`${userUri}/${userid}`, fetchData);

        const updateData = await response.json();
        responseVerification.assertResponseStatusCode(response.status(), 200);

        expect(updateData.status).toBe('inactive');
        expect(updateData.id).toBe(userid);
        expect(updateData.name).toBe(userData.name);
        expect(updateData.email).toBe(userData.email);

    })


    test('should return success for delete user gorest api @regression', async () => {

        if (!userid) {

            const CreateUserData = await apiUtils.CreateUser(userUri, userData);
            userid = CreateUserData.id;
        }

        const fetchData = {
            headers: config.use.headers
        };

        const response = await apiContext.delete(`${userUri}/${userid}`, fetchData);

        responseVerification.assertResponseStatusCode(response.status(), 204);

    })

});
