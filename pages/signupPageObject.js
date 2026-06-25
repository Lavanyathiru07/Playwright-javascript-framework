import Actions from '../utils/actions.js';
import Assertions from '../utils/assertion.js';
import { generateRandomEmail } from '../utils/dateGenerator.js';

const signloginbtn="//a[@href='/login']";
const signupname="//form[@action='/signup']//input[@placeholder='Name']";
const emailadd="//form[@action='/signup']//input[@placeholder='Email Address']";
const signupbtn="//button[text()='Signup']";
const mrradiobtn="//input[@id='id_gender1']";
const mrsRadiobtn="//input[@id='id_gender2']";
const passwordfield="#password";
const pagelabel="//b[text()='Enter Account Information']";
const dayfield="#days";
const monthfield="#months";
const yearfield="#years";
const checkbox1="//label[@for='newsletter']";
const checkbox2="//label[@for='optin']";
const firstName="#first_name";
const LastName="#last_name";
const companyfield="#company";
const address="#address1";
const countryselection="#country";
const statefield="#state";
const cityfield="#city";
const zipcodefield="#zipcode";
const mobileNumber="#mobile_number";
const createaccountBtn="//button[text()='Create Account']";
const createContinueBtn="//a[text()='Continue']";
const loggedinUserName="//i[@class='fa fa-user']//following-sibling::b"
const logoutbtn="//a[@href='/logout']";
const deleteAccountBtn="//a[@href='/delete_account']";
const deleteContinueBtn="//a[text()='Continue']";

class SignupPage {

  constructor(page,context) {
    this.actions = new Actions(page,context);
    this.assert = new Assertions(page,context);
   this.nameInput = page.getByRole('textbox', { name: 'Name' });
  
  }

  async navigate(url) {
    await this.actions.navigate(url);
  }

  async signloginbtn(){
    await this.actions.click(signloginbtn,"sign login button")
  }

  async signuppage(name)
  {
    const email = generateRandomEmail();
    await this.actions.fill(signupname,name,"name");
    await this.actions.fill(emailadd,email,"email address");
    await this.actions.click(signupbtn,"sign up button")
  }

  async selectTile(title)
  {
   await this.assert.verifyVisible(pagelabel,"page validation")
   if(title==="Mr")
   {
    await this.actions.check(mrradiobtn,"mr radio button")
   }else{
    await this.actions.check(mrsRadiobtn,"mrs radio button");
   }
  }


  async enterPassword(password)
  {
    await this.actions.fill(passwordfield,password)
  }

  async dateSelection(days,month,year)
  {
    await this.actions.selectByValue(dayfield,days,"days selection");
    await this.actions.selectByLabel(monthfield,month,"month selection");
    await this.actions.selectByValue(yearfield,year,"year selection");

  }

  async selectTheCheckbox()
  {
   await this.actions.check(checkbox1,"Sign up for our newsletter!")
   await this.actions.check(checkbox2,"Receive special offers from our partners!")
    
  }

  async enterFirstNameAndLastName(Fname,lname)
  {
    await this.actions.fill(firstName,Fname,"First name");
    await this.actions.fill(LastName,lname,"lastname")
  }

  async enterCompanyAddressDetails(cName,Addressvalue)
  {
    await this.actions.fill(companyfield,cName,"company name");
    await this.actions.fill(address,Addressvalue,"Address value")
  }

  async selectTheCountry(country)
  {
    await this.actions.selectByValue(countryselection,country,"country")
  }

  async enterStateAndCity(state,city)
  {
    await this.actions.fill(statefield,state,"state");
    await this.actions.fill(cityfield,city,"city");
  }

  async enterZipcodeAndMobile(zipcode,mobileNum)
  {
    await this.actions.fill(zipcodefield,zipcode,"zipcode")
    await this.actions.fill(mobileNumber,mobileNum,"mobile number")
  }

  async createAccountbtn()
  {
    await this.actions.click(createaccountBtn,"create account button");
    await this.actions.click(createContinueBtn,"continue button")
   const textVerified= await this.actions.getText(loggedinUserName,"logged in user name")
   await this.assert.verifyText(loggedinUserName,textVerified,"test presence")
  }

  async deleteAccount()
  {
    await this.actions.click(deleteAccountBtn,"delete Account")
    await this.actions.click(deleteContinueBtn,"delete continue button")
  }
}

export default SignupPage;

