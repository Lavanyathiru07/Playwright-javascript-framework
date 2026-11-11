
const createAccountEndpoint = '/api/createAccount';
const deleteAccountEndpoint = '/api/deleteAccount';
    
class apiUIPageObject {
    constructor(apiUtils) {
        this.apiUtils = apiUtils;
     
    }

    async verifyAccountCreation (accountData) {
        return await this.apiUtils.post(
            createAccountEndpoint,accountData
        )
    }

    async verifyAccountDeletion (accountData) {
        return await this.apiUtils.delete(
            deleteAccountEndpoint,accountData
        )
    }
}export default apiUIPageObject;