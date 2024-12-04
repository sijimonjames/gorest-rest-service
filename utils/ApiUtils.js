import config from '../playwright.config'
import responseVerification from './response-verification';


class ApiUtils 
{
    constructor(apiContext) 
    {

        this.apiContext = apiContext;
    }

    async CreateUser(uri, data)
    {
        const createData = {
            headers: config.use.headers,
            data: JSON.stringify(data)
        };

        const response = await this.apiContext.post(uri, createData);
        const body = await response.json();
        responseVerification.assertResponseStatusCode(response.status(), 201);

        return body;

    }

}
module.exports = ApiUtils;