import { Given, When, Then } from '@cucumber/cucumber';

When('I add product to cart', async function () {
  await this.productPurchasePage.addToCartProduct();
});

When('I click on View Cart button',async function () {
  await this.productPurchasePage.viewTheProduct();
});

Then('I verify product is displayed in cart',async function () {
await this.productPurchasePage.verifyTheAddedProductDetails();
});

When('I click on Proceed To Checkout',async function () {
  await this.productPurchasePage.proceedTocheckout();
});

Then('I verify address details are displayed',async function () {
  await this.productPurchasePage.verifyTheAddressDetails();
});

// Then('I verify order summary',async function () {
  
// });

When('I enter name on card name {string} and card number {string}',async function (Cname,Cnumber) {
 await this.productPurchasePage.entercardNameAndNumber(Cname,Cnumber);
});

When('I enter CVC {string},expiry month {string} and expiry year {string}',async function (Cvv,Cmonth,Cyear) {
  await this.productPurchasePage.enterCvvwithMonth(Cvv,Cmonth,Cyear)
});

When('I click on Pay and Confirm Order',async function () {
 await this.productPurchasePage.clickPaymentAndConfirmBtn()
});

Then('I verify order placed successfully',async function () {
  await this.productPurchasePage.invoiceDowuload();
});