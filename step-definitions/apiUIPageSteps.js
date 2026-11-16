import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';
import ApiUtils from '../utils/apiClient.js';
import ApiUIPageObject from '../pages/apiUIPageObject.js';
import Assertions from '../utils/assertion.js';

let apiContext;
let apiUtils;
let apiUIPage;
let assertions;

const userData = {
  "name": "Lavanya",
  "email": `lavanya${Date.now()}${Math.floor(Math.random() * 1000)}@gmail.com`,
  "password": "Lavanya@123",
  "title": "Mrs",

  "birth_date": "10",

  "birth_month": "5",

  "birth_year": "1999",

  "firstname": "Lavanya",

  "lastname": "T",

  "company": "CTS",

  "address1": "Chennai",

  "address2": "Guindy",

  "country": "India",

  "zipcode": "600032",

  "state": "Tamil Nadu",

  "city": "Chennai",

  "mobile_number": "9876543210"
};

Given('user creates account through API', async function () {
  apiContext = await request.newContext();
  apiUtils = new ApiUtils(apiContext, 'https://automationexercise.com');
  apiUIPage = new ApiUIPageObject(apiUtils);
  assertions = new Assertions(this.page);
  this.response =
    await apiUIPage.verifyAccountCreation(userData);

  this.userEmail =
    userData.email;

  this.userPassword =
    userData.password;

  this.userName =
    userData.name;
  const contentType = this.response.headers()['content-type'] || 'unknown';
  const rawResponseBody = await this.response.text();
  const responseExcerpt = rawResponseBody.replace(/\s+/g, ' ').slice(0, 300);
  console.log(
    `[API account creation] HTTP ${this.response.status()}, Content-Type: ${contentType}, Body: ${responseExcerpt}`
  );
  this.responseBody = await apiUtils.getResponseBody(this.response);
  await apiUtils.verifyHttpStatus(this.response, 200);
  await apiUtils.verifyResponseValue(this.responseBody, 'responseCode', 201);
  await apiUtils.verifyResponseValue(this.responseBody, 'message', 'User created!');
});

When('user logs into application', async function () {
  await this.signupPage.navigate('https://automationexercise.com/login');
  await this.signupPage.signloginbtn();
  await this.loginPage.LoginTheAcount(this.userEmail, this.userPassword);
  await assertions.verifyToBEVisible(`Logged in as ${this.userName}`);
});

When('user deletes account through API',async function () {
  this.deleteResponse = await apiUIPage.verifyAccountDeletion({
    email: this.userEmail,
    password: this.userPassword
  });

  await apiUtils.verifyHttpStatus(this.deleteResponse, 200);
  this.deleteResponseBody = await apiUtils.getResponseBody(this.deleteResponse);
  await apiUtils.verifyResponseValue(this.deleteResponseBody, 'responseCode', 200);
  await apiUtils.verifyResponseValue(this.deleteResponseBody, 'message', 'Account deleted!');
});

Then('user should not be able to login',async function () {
  await this.signupPage.navigate('https://automationexercise.com/login');
  await this.signupPage.signloginbtn();
  await this.loginPage.LoginTheAcount(this.userEmail, this.userPassword);
 await assertions.verifyToBEVisible('Your email or password is incorrect!');
})


Then('user name should be displayed on homepage',async function () {
  await assertions.verifyToBEVisible(`Logged in as ${this.userName}`);
});

When('user updates account details through API',async function () {
  const updateName= "lavanyaupdated";
  this.updateResponse = await apiUIPage.verifyAccountUpdate({
    email: this.userEmail,
    password: this.userPassword,
    name: updateName
  });
  this.userName = updateName;

  await apiUtils.verifyHttpStatus(this.updateResponse, 200);
  this.updateResponseBody = await apiUtils.getResponseBody(this.updateResponse);
  await apiUtils.verifyResponseValue(this.updateResponseBody, 'responseCode', 200);
  await apiUtils.verifyResponseValue(this.updateResponseBody, 'message', 'User updated!');
});

When('user refreshes the application',async function () {
  await this.page.reload();
});

Then('updated account details should be reflected in UI',async function () {
  await assertions.verifyToBEVisible(`Logged in as ${this.userName}`);
});



When('user retrieves all products through API',async function () {
  this.productApiResponse = await apiUIPage.verifyGetAllProducts();
});

When('user selects a product from API response',async function () {
  const body = await apiUtils.getResponseBody(this.productApiResponse);
  this.product = body.products[0];
  this.productName = this.product.name;
  this.productPrice = this.product.price;
});

When('user searches same product in UI',async function () {
  await this.productPage.productPage();
  await this.productPage.searchTheProduct(this.productName);
});

Then('product name should match API response', async function () {
  const productNameUI = await this.productPage.getProductNameUI();
  await assertions.verifyEquals(this.productName, productNameUI, 'Product name validation between API and UI');
});

Then('product price should match API response',async function () {
  const productPriceUI = await this.productPage.getProductPriceUI();
  await assertions.verifyEquals(this.productPrice, productPriceUI, 'Product price validation between API and UI');
});


Then('cart price should match API price',async function () {
  const productCartPriceUI = (await this.productPage.verifyCartPriceUI()).trim();
  await assertions.verifyEquals(this.productPrice, productCartPriceUI, 'Product price validation between API and UI');
});

When('user proceeds to checkout',async function () {
    await this.productPurchasePage.proceedTocheckout();
 
});

When('places order successfully',async function () {
  await this.productPurchasePage.verifyTheAddressDetails();
});
When('user verifies login through API',async function () {
  this.loginresponse=await apiUIPage.verifyLogin({
    email: this.userEmail,
    password: this.userPassword
  });
  await apiUtils.verifyHttpStatus(this.loginresponse, 200);
});

Then('login verification should be successful',async function () {
  this.loginResponseBody = await apiUtils.getResponseBody(this.loginresponse);
  await apiUtils.verifyResponseValue(this.loginResponseBody, 'responseCode', 200);
  await apiUtils.verifyResponseValue(this.loginResponseBody, 'message', 'User exists!');
});


When('user verifies login using deleted credentials',async function () {
  this.loginresponse=await apiUIPage.verifyLogin({
    email: this.userEmail,
    password: this.userPassword
  });
  await apiUtils.verifyHttpStatus(this.loginresponse, 200);
});

Then('login verification should fail',async function () {
  this.loginResponseBody = await apiUtils.getResponseBody(this.loginresponse);
  await apiUtils.verifyResponseValue(this.loginResponseBody, 'responseCode', 404);
  await apiUtils.verifyResponseValue(this.loginResponseBody, 'message', 'User not found!');
});


