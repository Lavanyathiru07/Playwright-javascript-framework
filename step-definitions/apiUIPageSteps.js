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