import { Given, When, Then } from '@cucumber/cucumber';

// import DataReader from '../utils/dataReader.js';

// const users = DataReader.read('./testData/users.json');


Then('I am on the Login page with email address {string} and password {string}',async function (lemail,lpassword) {
    await this.loginPage.LoginTheAcount(lemail,lpassword)
// const email = users.validUser.email;
//   const password = users.validUser.password;

//     await this.loginPage.LoginTheAcount(email,password)
});

Then('I navigate to Home page',async function () {
    await this.loginPage.LoginPageValidation();
    
});

