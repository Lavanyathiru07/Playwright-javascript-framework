class ProductsApiPage {

    constructor(apiUtils) {
        this.apiUtils = apiUtils;
        this.productsEndpoint = '/api/productsList';
        this.searchProductEndpoint = '/api/searchProduct';
        this.verifyLoginEndpoint = '/api/verifyLogin';
    }

    async getAllProducts() {
        return await this.apiUtils.get(this.productsEndpoint);
    }

    async searchProduct(productName) {
        return await this.apiUtils.post(
            this.searchProductEndpoint,
            {
                search_product: productName
            }
        ) 
}

 async verifyLogin(email, password) {
            return await this.apiUtils.post(
                this.verifyLoginEndpoint,
                { email, password }
            );
        }

    


}export default ProductsApiPage;