


import { Given, When, Then } from '@cucumber/cucumber';



Given('I navigate to {string} website', async function (url) {
  await this.signupPage.navigate(url);
});

When('I am on Home page I click the signup or login button', async function () {
 await this.signupPage.signloginbtn();
})

Then('I am on login page I signup with {string} and email for signup', async function (name) {
  await this.signupPage.signuppage(name);
  
});

Then('I am on signup page I select the Title {string}',async function (title) {
  await this.signupPage.selectTile(title);
  
});

Then('I am on signup page I enter the password {string}', async function (password) {
  await this.signupPage.enterPassword(password);
});

Then('I am on signup page I select the date {string} month {string} and year {string}',async function (day,month, year) {
   await this.signupPage.dateSelection(day,month,year)
});

Then('I am on signup page I select the checkbox',async function () {
  await this.signupPage.selectTheCheckbox();
});

Then('I am on signup page I enter the firstname {string} and secondname {string}',async function (Fname,lname) {
  await this.signupPage.enterFirstNameAndLastName(Fname,lname)
});

Then('I am on signup page I enter the company name {string} and address {string}', async function (cName,Addressvalue) {
await this.signupPage.enterCompanyAddressDetails(cName,Addressvalue)  

});

Then('I am on signup page I select the country {string}',async function (country) {
  await this.signupPage.selectTheCountry(country)
});

Then('I am on signup page I enter the state {string} city {string}',async function (state,city) {
  await this.signupPage.enterStateAndCity(state,city)

});

Then('I am on signup page I enter the zipcode {string} and mobileNumber {string}',async function (zipcode,mobileNum) {
  await this.signupPage.enterZipcodeAndMobile(zipcode,mobileNum)
});

When('I am on signup page I click the create account button',async function () {
  await this.signupPage.createAccountbtn();
});

Then('I am on Home Page I delete the account', async function () {
  await this.signupPage.deleteAccount();
});
