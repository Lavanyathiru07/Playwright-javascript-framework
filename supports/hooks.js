import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs';

import SignupPage from '../pages/signupPageObject.js';
import LoginPage from '../pages/loginPageObject.js';
import ProductPage from '../pages/productPageObject.js';
import ProductPurchasePage from '../pages/productPurchasePageObject.js';
import ApiPageObject from '../pages/apiPageObject.js'

// Set default timeout to 90 seconds
setDefaultTimeout(90 * 1000);

Before(async function () {
    this.browser = await chromium.launch({
        headless: false, // Set to true for CI/CD
        slowMo: 50, // Slow down actions by 50ms for visibility
        args: ['--start-maximized', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox']
        // args: ['--start-maximized', '--disable-web-security','--no-sandbox', '--disable-setuid-sandbox','--window-size=1920,1080']
 
    });

    this.context = await this.browser.newContext({
        viewport: null, // Allow browser to use full maximized window size
        // viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true
    });

    this.page = await this.context.newPage();
    console.log('Browser and page created for scenario');

     this.signupPage = new SignupPage(this.page, this.context);
     this.loginPage=new LoginPage(this.page, this.context);
     this.productPage=new ProductPage(this.page, this.context);
     this.productPurchasePage=new ProductPurchasePage(this.page, this.context);
     this.apiPage = new ApiPageObject();

 this.switchAllPagesToNewPage = (newPage) => {
        this.page = newPage;
        // Update all page objects' actions.page reference
        const pageObjects = [
            this.signupPage,
            this.loginPage,
            this.productPage,
            this.productPurchasePage,
            this.apiPage
        ];
             pageObjects.forEach(po => {
            if (po && po.actions) {
                po.actions.page = newPage;
            }
        });
        console.log('All page objects switched to new page');
    };

    console.log('All page objects initialized');
});


After(async function (scenario) {

  if (scenario.result.status === 'FAILED') {

    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });

    console.log(`📸 Screenshot captured for failed scenario`);

    // Attach to Cucumber report
    await this.attach(screenshot, 'image/png');
  }


  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});




