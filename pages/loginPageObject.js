import Actions from '../utils/actions.js';
import Assertions from '../utils/assertion.js';


const loginEmail="//form[@action='/login']/input[@name='email']";
const loginPassword="//form[@action='/login']/input[@name='password']";
const loginBtn="//button[text()='Login']";
const loggedinUserName="//i[@class='fa fa-user']//following-sibling::b"


class LoginPage {

  constructor(page,context) {
    this.actions = new Actions(page,context);
    this.assert = new Assertions(page,context);
}

async LoginTheAcount(lemail,lpassword)
{
    await this.actions.fill(loginEmail,lemail,"login email address")
    await this.actions.fill(loginPassword,lpassword,"Login password field")
    await this.actions.click(loginBtn,"login button")
}

async LoginPageValidation()
{
    const textVerified= await this.actions.getText(loggedinUserName,"logged in user name")
    await this.assert.verifyText(loggedinUserName,textVerified,"test presence")
}

}export default LoginPage;