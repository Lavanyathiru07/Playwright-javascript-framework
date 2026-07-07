import { Given, When, Then } from '@cucumber/cucumber';

When('I scroll to footer',async function () {
  await this.productPurchasePage.scrollToFooter();
});

When('I enter email {string} in subscription field and click subscribe button',async function (email) {
 await this.productPurchasePage.subscribeTheAccount(email);
});