import Logger from './logger.js';

/**
 * Actions class encapsulates all reusable UI interaction methods.
 * 
 * This class provides a centralized abstraction over Playwright actions
 * such as click, fill, select, and check. It improves readability,
 * maintainability, and consistency across test scripts.
 */
export default class Actions {

  /**
   * Constructor to initialize Playwright page instance.
   * 
   * @param {Page} page - Playwright page object
   */
  
  constructor(page) {
    this.page = page;   // ✅ MUST be assigned
  }


  /**
   * Clicks on a web element after ensuring it is visible.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name of the element for logging
   */
  async click(locator, elementName) {
    Logger.step(`Click on ${elementName}`);

    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    await element.click();

    Logger.info(`${elementName} clicked successfully`);
  }

  /**
   * Clears existing value and enters text into an input field.
   * 
   * @param {string} locator - Element selector
   * @param {string} value - Value to enter
   * @param {string} elementName - Logical field name for logging
   */
  async fill(locator, value, elementName) {
    Logger.step(`Enter value into ${elementName}`);

    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });

    await element.fill('');
    await element.fill(value);

    Logger.info(`${value} entered into ${elementName}`);
  }

  /**
   * Selects a checkbox or radio button if not already selected.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name for logging
   */
  async check(locator, elementName) {
    Logger.step(`Select ${elementName}`);

    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });

    const isChecked = await element.isChecked();

    if (!isChecked) {
      await element.check();
      Logger.info(`${elementName} selected`);
    } else {
      Logger.info(`${elementName} already selected`);
    }
  }

  

async getUrl(elementName = "Current Page URL") {
  Logger.step(`Getting URL of ${elementName}`);

  const url = this.page.url();

  Logger.info(`URL of ${elementName}: ${url}`);

  return url;
}

/**
 * Retrieves the total count of elements matching the given locator.
 * 
 * Waits for at least one element to be visible before counting,
 * ensuring that the elements are properly loaded on the page.
 * 
 * @param {string} locator - Element selector (XPath or CSS) used to identify elements
 * @param {string} elementName - Logical name of the element for logging purposes
 * @returns {number} Total number of elements found
 */
async getCount(locator, elementName) {
  Logger.step(`Getting count of ${elementName}`);

  const elements = this.page.locator(locator);

  await elements.first().waitFor({ state: 'visible' });

  const count = await elements.count();

  Logger.info(`Total count of ${elementName}: ${count}`);

  return count;
}


  /**
   * Unchecks a checkbox if selected.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name for logging
   */
  async uncheck(locator, elementName) {
    Logger.step(`Unselect ${elementName}`);

    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });

    const isChecked = await element.isChecked();

    if (isChecked) {
      await element.uncheck();
      Logger.info(`${elementName} unselected`);
    } else {
      Logger.info(`${elementName} already unselected`);
    }
  }


  /**
 * Clicks an element from the list based on given index
 * 
 * @param {string} locator - Element selector (XPath or CSS)
 * @param {number} index - Index of element to click (0-based)
 * @param {string} elementName - Logical name for logging
 * 
 * 
elements.first()   → first element ✅  
elements.last()    → last element ✅  
elements.nth(3)    → 4th element ✅

 */
async clickElementByIndex(locator, index, elementName) {
  Logger.step(`Clicking ${elementName} at index ${index}`);

  const elements = this.page.locator(locator);

  await elements.first().waitFor({ state: 'visible' });

  const count = await elements.count();

  if (index >= count) {
    Logger.error(`Index ${index} is out of range. Total elements: ${count}`);
    throw new Error(`Invalid index for ${elementName}`);
  }

  await elements.nth(index).click();

  Logger.info(`Clicked ${elementName} at index ${index}`);
}

  /**
   * Selects an option from dropdown using visible label.
   * 
   * @param {string} locator - Element selector
   * @param {string} label - Visible text of dropdown option
   * @param {string} elementName - Logical name for logging
   */
  async selectByLabel(locator, label, elementName) {
    Logger.step(`Select ${label} from ${elementName}`);

    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });

    await element.selectOption({ label });

    Logger.info(`${label} selected from ${elementName}`);
  }




  /**
   * Selects an option from dropdown using value.
   * 
   * @param {string} locator - Element selector
   * @param {string} value - Option value
   * @param {string} elementName - Logical name for logging
   */
  async selectByValue(locator, value, elementName) {
    Logger.step(`Select value from ${elementName}`);

    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });

    await element.selectOption(value);

    Logger.info(`${value} selected from ${elementName}`);
  }

  /**
   * Hovers over an element.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name for logging
   */
  async hover(locator, elementName) {
    Logger.step(`Hover on ${elementName}`);

    const element = this.page.locator(locator);
    await element.hover();

    Logger.info(`Hovered on ${elementName}`);
  }

  /**
   * Waits until the element becomes visible.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name for logging
   */
  async waitForVisible(locator, elementName) {
    Logger.step(`Wait for ${elementName} to be visible`);

    await this.page.locator(locator).waitFor({ state: 'visible' });

    Logger.info(`${elementName} is visible`);
  }

  /**
   * Scrolls to the specified element.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name for logging
   */
  async scrollTo(locator, elementName) {
    Logger.step(`Scroll to ${elementName}`);

    await this.page.locator(locator).scrollIntoViewIfNeeded();

    Logger.info(`${elementName} is in view`);
  }

  /**
   * Retrieves text content from an element.
   * 
   * @param {string} locator - Element selector
   * @param {string} elementName - Logical name for logging
   * @returns {Promise<string>} text content of the element
   */
  async getText(locator, elementName) {
    Logger.step(`Get text from ${elementName}`);

    const text = await this.page.locator(locator).textContent();
    console.log(`this is the text: ${text}`);

    Logger.info(`Text retrieved from ${elementName}`);

    return text;
  }

  /**
   * Navigates to a given URL.
   * 
   * @param {string} url - Target URL
   */
  async navigate(url) {
    Logger.step(`Navigate to URL`);

    await this.page.goto(url);

    Logger.info(`Navigation completed`);
  }

  /**
   * Waits for page load to complete.
   */
  async waitForPageLoad() {
    Logger.step(`Wait for page load`);

    await this.page.waitForLoadState('networkidle');

    Logger.info(`Page load completed`);
  }
}
