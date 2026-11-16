
const createAccountEndpoint = '/api/createAccount';
const deleteAccountEndpoint = '/api/deleteAccount';
const updateAccountEndpoint = '/api/updateAccount';
const getAllProductListEndpoint = '/api/productsList';
const loginEndpoint = '/api/verifyLogin';
    
class apiUIPageObject {
    constructor(apiUtils) {
        this.apiUtils = apiUtils;
     
    }

    async verifyAccountCreation (accountData) {
        return await this.apiUtils.post(
            createAccountEndpoint,accountData
        )
    }

    async verifyLogin (loginData) {
        return await this.apiUtils.post(
            loginEndpoint,loginData
        )
    }

    async verifyAccountDeletion (accountData) {
        return await this.apiUtils.delete(
            deleteAccountEndpoint,accountData
        )
    }

    async verifyAccountUpdate (accountData) {
        return await this.apiUtils.put(
            updateAccountEndpoint,accountData
        )
    }

    async verifyGetAllProducts () {
        return await this.apiUtils.get(
            getAllProductListEndpoint
        )
    }



}export default apiUIPageObject;