import { test, expect } from '@playwright/test';
import apiEndPoint from '../utils/endpoinUrls';
import config from '../playwright.config'
import { generateUserData } from '../utils/faker_data.js'
import verification from '../utils/response-verification.js';


test.describe('CRUD operations for GOREST api', () => {

    let userid;

    let userUri = config.use.path + apiEndPoint.CREATE_USER;
    let userData = generateUserData();

    const createData = {
        headers: config.use.headers,
        data: JSON.stringify(userData)
    };

    test('should return success for create user gorest api @regression', async ({ request }) => {

        const response = await request.post(userUri, createData);
        const body = await response.json();

        userid = body.id;
        expect(body.name).toBe(userData.name);
        expect(body.email).toBe(userData.email);

        verification.assertResponseStatusCode(response.status(), 201);
    })

    test('should return success to read user from gorest api @regression', async ({ request }) => {


        if (isNaN(userid)) {

            const response = await request.post(userUri, createData);
            const body = await response.json();

            userid = body.id;

        }

        const fetchData = {
            headers: config.use.headers
        };

        const response = await request.get(userUri + "/" + userid, fetchData);

        const body = await response.json();
        verification.assertResponseStatusCode(response.status(), 200);

        expect(body.id).toBe(userid);
        expect(body.name).toBe(userData.name);
        expect(body.email).toBe(userData.email);

    })

    test('should return success to update user data for gorest api @regression', async ({ request }) => {

        
        if (isNaN(userid)) {

            const response = await request.post(userUri, createData);
            const body = await response.json();

            userid = body.id;

        }
        
        const fetchData = {
            headers: config.use.headers,
            data: {
                active: "inactive"
            }
        };

        const response = await request.put(userUri + "/" + userid, fetchData);

        verification.assertResponseStatusCode(response.status(), 200);
        const body = await response.json();

        expect(body.id).toBe(userid);
        expect(body.name).toBe(userData.name);
        expect(body.email).toBe(userData.email);

    })


    test('should return success for delete user gorest api @regression', async ({ request }) => {

        if (isNaN(userid)) {

            const response = await request.post(userUri, createData);
            const body = await response.json();

            userid = body.id;

        }

        const fetchData = {
            headers: config.use.headers
        };

        const response = await request.delete(userUri + "/" + userid, fetchData);

        verification.assertResponseStatusCode(response.status(), 204);
    })

});

