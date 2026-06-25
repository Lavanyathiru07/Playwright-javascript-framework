import { Given, When, Then } from '@cucumber/cucumber';

Given('I am on Home page I click on Products page',async function () {
  await this.productPage.productPage();
});

When('I verify user is navigated to products page',async function () {
    await this.productPage.getAllProductCount();
});

Then('I am on Product page I verify all products should be displayed',async function () {
  await this.productPage.productPageValidation();
});

When('I am on product page I  search the product {string}',async function (product) {
 await this.productPage.searchTheProduct(product);
});

Then('I verify all searched {string} products are visible',async function (product) {
  await this.productPage.verifySeachProductList(product);
});

When('I click on first product',async function () {
  await this.productPage.selectTheFristProduct();

});

Then('I verify that product detail page is displayed',async function () {
  await this.productPage.productdetailPage();
});

Then('I verify product name, price, description are visible',async function () {
  await this.productPage.productetailsValidation();
});