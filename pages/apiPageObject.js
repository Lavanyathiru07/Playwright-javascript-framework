
import Logger from '../utils/logger.js';
import ApiClient from '../utils/apiClient.js';


class apipage{

    constructor()
    {
        this.api=new ApiClient();
    }

    async getAllProduct()
    {
        Logger.step(`Fetch all product via API`)
        const response = await this.api.get('/productsList');
        return response;
    }

   
 async createUser(data) {
        Logger.step('Create User');
   return await this.api.post('/users/register', data);
    }


    async loginUser(data)
    {
        Logger.step('Post login the user')
        return this.api.post('/users/login',data)
    }

    async getTheLoggeduser(header)
    {
        Logger.step('Get the logged in user details')
        return this.api.get('/users/profile',header)
    }

    async statuscodeValidation(response,expectedStatusCode)
    {
        await this.api.verifyStatusCode(response, expectedStatusCode);
    }

    
}export default apipage;