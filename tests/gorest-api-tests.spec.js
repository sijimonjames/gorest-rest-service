import { test, expect, request } from '@playwright/test';
import config from '../playwright.config'
import { generateUserData } from '../utils/faker_data.js'
import ApiEndPoint from '../utils/ApiEndPoint';

const ApiUtils = require('../utils/ApiUtils.js');


test.describe('CRUD operations for GOREST api', async () => {

    let userid;
    let apiContext;
    let apiUtils;
    const userUri = `${config.use.path}${ApiEndPoint.CREATE_USER}`;
    const userData = generateUserData();


    test.beforeAll('Initialization for all tests', async () => {

        apiContext = await request.newContext();
        apiUtils = new ApiUtils(apiContext);

    })

    test('should return success for create user gorest api @smoke', async () => {

        const CreateUserData = await apiUtils.CreateUser(userUri, userData);
        
        userid = CreateUserData.id;
        expect(userid).toBeGreaterThan(0);
        expect(CreateUserData.name).toBe(userData.name);
        //another way to verify
        expect(CreateUserData).toHaveProperty("email", userData.email)

    })

    test('should return unauthorized for create user with no authontication @smoke', async () => {

        const createData = {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(userData)
        };

        const response = await apiContext.post(`${userUri}`, createData);
        const body = await response.json();
        ApiUtils.assertResponseStatusCode(response, 401);


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
        ApiUtils.assertSuccessResponseStatusCode(response);

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
        ApiUtils.assertSuccessResponseStatusCode(response);

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
        ApiUtils.assertSuccessResponseStatusCode(response);

    })

});
