import Actions from '../utils/actions.js';
import Assertions from '../utils/assertion.js';


const productbtn="//a[@href='/products']";
const productPage="//h2[text()='All Products']";
const allProductList="//div[@class='productinfo text-center']";
const productSearch="//input[@name='search']";
const productSearchBtn="//button[@id='submit_search']";
const productSearchList="//div[@class='productinfo text-center']/p";
const productViewDetails="//div[@class='productinfo text-center']/parent::div//following-sibling::div[@class='choose']";
const ProductViewText="//div[@class='product-information']/h2";
const productPrice="//div[@class='product-information']/span/span";
const productFristprice="(//div[@class='productinfo text-center']/parent::div//following-sibling::div/h2)[1]"
const productFristName="(//div[@class='productinfo text-center']/p)[1]"
const productCartPrice="//td[@class='cart_price']"  //(//div[@class='productinfo text-center']/parent::div//following-sibling::div/p)[1]

class productdetail{

constructor(page,context) {
    this.actions = new Actions(page,context);
    this.assert = new Assertions(page,context);
}

async productPage()
{
    await this.actions.click(productbtn,"Product button");
}

async getAllProductCount()
{
    await this.actions.getCount(allProductList,"Product list");
}

async productPageValidation()
{
    const currentUrl=await this.actions.getUrl();
    
  if (currentUrl.includes('products')) {
    console.log(`currently on this page ${currentUrl}`)
  }else{
    throw new error(`Expected product page but got ${currentUrl}`);
  }

}

async searchTheProduct(product){
    await this.actions.fill(productSearch,product,"producd search");
    await this.actions.click(productSearchBtn,"Product search button");
    
}

async verifySeachProductList(product)
{
    await this.assert.verifyAllElementsContainText(productSearchList,product,"product list")
}


async selectTheFristProduct()
{
  await this.actions.clickElementByIndex(productViewDetails,0,"view details button")   
}

async productdetailPage()
{
    const url=await this.actions.getUrl();
    if(url.includes('product_details')){
   console.log(`currently on this page ${url}`)
  }else{
   console.log(`Expected product details page but got ${url}`);
  }
}

async productetailsValidation()
{
    await this.assert.verifyVisible(productPrice,"product Price")
    await this.assert.verifyVisible(ProductViewText,"Product view text")
}

async getProductNameUI()
{
    return await this.actions.getText(productFristName,"product name");
}

async getProductPriceUI()
{
    return await this.actions.getText(productFristprice,"product price");
}

async verifyCartPriceUI()
{
    return await this.actions.getText(productCartPrice,"cart price");
}


}export default productdetail;