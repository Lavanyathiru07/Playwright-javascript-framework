import { Given, When, Then } from '@cucumber/cucumber';

Then('I am on the Login page with email address {string} and password {string}',async function (lemail,lpassword) {
   await this.loginPag.LoginTheAcount(lemail,lpassword)
});

Then('I navigate to Home page',async function () {
    await this.loginPage.LoginPageValidation();
  
});