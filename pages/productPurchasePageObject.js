
import Actions from '../utils/actions.js';
import Assertions from '../utils/assertion.js';

const productHover="(//div[@class='productinfo text-center'])[1]";
const addToCart="(//a[@class='btn btn-default add-to-cart'])[1]";
const viewCart="//u[text()='View Cart']";
const productDescriptionDetails="//tr[@id='product-1']/td/p";
const proceedTocheckoutBtn="//a[text()='Proceed To Checkout']"
const deliveryAddress="//ul[@class='address item box']/li";
const billingAddress="//ul[@class='address alternate_item box']/li";
const placeOrder="//a[text()='Place Order']";
const cardName="//input[@name='name_on_card']";
const cardNumber="//input[@name='card_number']";
const cvcfield="//input[@name='cvc']";
const expiryMonthfield="//input[@name='expiry_month']";
const expiryYearField="//input[@name='expiry_year']";
const payAndConfrimBtn="#submit";
const downloadInvoice="//a[text()='Download Invoice']";
const orderInvoiceContinue="//a[text()='Continue']";
const subscriptionlabel="//h2[text()='Subscription']";
const subEmailAddress="#susbscribe_email";
const subscriptionSymbol="#subscribe";


class productPurchasePage{

constructor(page,context) {
    this.actions = new Actions(page,context);
    this.assert = new Assertions(page,context);
}

async addToCartProduct()
{
    await this.actions.hoverAndClick(productHover,addToCart,"product click");
    
}

async viewTheProduct()
{
    await this.actions.click(viewCart,"View the cart");
}
async verifyTheAddedProductDetails()
{
    await this.actions.getAllTexts(productDescriptionDetails,"product details");
}

async proceedTocheckout()
{
    await this.actions.click(proceedTocheckoutBtn,"Proceed to checkout button");
}

async verifyTheAddressDetails(){
    await this.actions.getAllTexts(deliveryAddress,"devilvery address");
    await this.actions.getAllTexts(billingAddress,'Billing address');
    await this.actions.click(placeOrder,"Place Order");
}

async entercardNameAndNumber(Cname,Cnumber)
{
 await this.actions.fill(cardName,Cname,"card name");
 await this.actions.fill(cardNumber,Cnumber,"card Number");

}

async enterCvvwithMonth(Cvv,Cmonth,Cyear)
{
    await this.actions.fill(cvcfield,Cvv,"cvv number");
    await this.actions.fill(expiryMonthfield,Cmonth,"card expiry month");
    await this.actions.fill(expiryYearField,Cyear,"card expiry year");
}

async clickPaymentAndConfirmBtn(){
    await this.actions.click(payAndConfrimBtn,"payment And Confirm button");
}

async invoiceDowuload()
{
    await this.actions.click(downloadInvoice,"download Invoice");
    await this.actions.click(orderInvoiceContinue,"Order invoice continue");
}

async scrollToFooter()
{
    await this.actions.scrollTo(subscriptionlabel,"subscription label");
}

async subscribeTheAccount(email)
{
    await this.actions.fill(subEmailAddress,email,"email address");
    await this.actions.click(subscriptionSymbol,"Subscription search");
}



}export default productPurchasePage;