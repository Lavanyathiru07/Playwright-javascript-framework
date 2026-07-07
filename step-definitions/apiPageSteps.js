
import { Given,Then,When } from '@cucumber/cucumber';
import logger from '../utils/logger.js';

let response;
Given('I validate GET products API', async function () {
await this.apiPage.getAllProduct();
//   await this.assert.verifyStatusCode(response, 200);
});


Given('I create user with body', async function (docString) {

    const requestBody = JSON.parse(docString);

    const timestamp = Date.now();

     this.username= `${requestBody.name}_${timestamp}`;
     this.useremail= `user${timestamp}@gmail.com`;
     this.userpassword=requestBody.password;
    requestBody.name=this.username
    requestBody.email=this.useremail
    logger.info("Request Body:", requestBody);

    this.response = await this.apiPage.createUser(requestBody);
    logger.info(`User name is : ${requestBody.name}`)
    logger.info(`User email is : ${requestBody.email}`)
});


Then('response status should be {int}',async function (expectedCode) {

    
  await this.apiPage.statuscodeValidation(
        this.response,
        expectedCode
    );


 
});

When('I login the application',async function () {
 
const loginData={
  email:this.useremail,
  password:this.userpassword
}

this.response=await this.apiPage.loginUser(loginData)
const responseBody= await this.response.json();
logger.info(`login response ${JSON.stringify(responseBody, null, 2)}`);
this.token =await responseBody.data.token;
logger.info(`Token : ${this.token}`);

});
When('get the user profile details', async function () {

    this.response = await this.apiPage.getTheLoggeduser({
        'x-auth-token': this.token
    });

    const responseBody = await this.response.json();

    logger.info(
        `Response Body:\n${JSON.stringify(responseBody, null, 2)}`
    );

});

// When('I update user with PATCH using body',async function (docString) {
//   const requestBody = JSON.parse(docString);

//     const timestamp = Date.now();

//     this.updatename=`name${requestBody.name}_${timestamp}`


// });

When('get the user profile details after update', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('logout the user', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
