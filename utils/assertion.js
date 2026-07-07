import Logger from './logger.js';

/**
 * Assertions class provides reusable validation methods.
 * 
 * This class is responsible for verifying UI state, text,
 * visibility, counts, and other validations across the application.
 * 
 */
export default class Assertions {

  /**
   * Initialize Assertions with Playwright page
   * 
   * @param {import('@playwright/test').Page}
   */

  constructor(page) {
    this.page = page;
  }

  /**
   * Verify element is visible
   * @param {string} locator
   * @param {string} elementName
   */

  async verifyVisible(locator, elementName) {
    Logger.step(`Verify visibility of ${elementName}`);

    const isVisible = await this.page.locator(locator).isVisible();

    if (isVisible) {
      Logger.success(`${elementName} is visible`);
    } else {
      Logger.error(`${elementName} is NOT visible`);
      throw new Error(`Visibility validation failed`);
    }
  }

  /**
   * Verify text equals expected value
   * 
   * @param {string} locator
   * @param {string} expectedText
   * @param {string} elementName
   */

  async verifyText(locator, expectedText, elementName) {
    Logger.step(`Verify text of ${elementName}`);

    const actualText = await this.page.locator(locator).textContent();

    if (actualText?.trim() === expectedText) {
      Logger.success(`Text matched for ${elementName}`);
    } else {
      Logger.error(`Expected: ${expectedText}, Actual: ${actualText}`);
      throw new Error(`Text validation failed`);
    }
  }

  /**
   * Verify text contains expected value
   * 
   * @param {string} locator
   * @param {string} expectedText
   * @param {string} elementName
   */

  async verifyTextContains(locator, expectedText, elementName) {
    Logger.step(`Verify ${elementName} contains "${expectedText}"`);

    const text = await this.page.locator(locator).textContent();

    if (text?.toLowerCase().includes(expectedText.toLowerCase())) {
      Logger.success(`Text validation passed`);
    } else {
      Logger.error(`Text does not contain expected value`);
      throw new Error(`Contains validation failed`);
    }
  }

  

  /**
   * Verify URL contains expected value
   * 
   * @param {string} expectedText
   * @param {string} pageName
   */


  async verifyUrlContains(expectedText, pageName) {
    Logger.step(`Verify URL for ${pageName}`);

    const url = this.page.url();

    if (url.includes(expectedText)) {
      Logger.success(`URL validation passed`);
    } else {
      Logger.error(`Current URL: ${url}`);
      throw new Error(`URL validation failed`);
    }
  }

  /**
   * Verify element count greater than a given value
   * 
   * @param {string} locator
   * @param {number} expectedCount
   * @param {string} elementName
   */

  async verifyCountGreaterThan(locator, expectedCount, elementName) {
    Logger.step(`Verify count of ${elementName}`);

    const count = await this.page.locator(locator).count();

    if (count > expectedCount) {
      Logger.success(`${elementName} count is valid: ${count}`);
    } else {
      Logger.error(`Expected > ${expectedCount}, Actual: ${count}`);
      throw new Error(`Count validation failed`);
    }
  }

  /**
   * Verify element count equals expected value
   * 
   * @param {string} locator
   * @param {number} expectedCount
   * @param {string} elementName
   */

  async verifyCountEquals(locator, expectedCount, elementName) {
    Logger.step(`Verify count equals ${expectedCount} for ${elementName}`);

    const count = await this.page.locator(locator).count();

    if (count === expectedCount) {
      Logger.success(`Count matched`);
    } else {
      Logger.error(`Expected: ${expectedCount}, Actual: ${count}`);
      throw new Error(`Count mismatch`);
    }
  }

  /**
   * Verify input field value
   * 
   * @param {string} locator
   * @param {string} expectedValue
   * @param {string} elementName
   */

  async verifyInputValue(locator, expectedValue, elementName) {
    Logger.step(`Verify input value of ${elementName}`);

    const value = await this.page.locator(locator).inputValue();

    if (value === expectedValue) {
      Logger.success(`Input value matched`);
    } else {
      Logger.error(`Expected: ${expectedValue}, Actual: ${value}`);
      throw new Error(`Input validation failed`);
    }
  }

  /**
   * Verify checkbox is checked
   * 
   * @param {string} locator
   * @param {string} elementName
   */

  async verifyChecked(locator, elementName) {
    Logger.step(`Verify ${elementName} is checked`);

    const isChecked = await this.page.locator(locator).isChecked();

    if (isChecked) {
      Logger.success(`${elementName} is checked`);
    } else {
      Logger.error(`${elementName} is NOT checked`);
      throw new Error(`Checkbox validation failed`);
    }
  }

  /**
   * Verify all elements contain expected text
   * 
   * @param {string} locator
   * @param {string} expectedText
   * @param {string} elementName
   */

  async verifyAllElementsContainText(locator, expectedText, elementName) {
    Logger.step(`Verify all ${elementName} contain "${expectedText}"`);

    const elements = this.page.locator(locator);
    const count = await elements.count();

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();

      if (!text.toLowerCase().includes(expectedText.toLowerCase())) {
        Logger.error(`Validation failed for item: ${text}`);
        throw new Error(`List validation failed`);
      }
    }

    Logger.success(`All ${elementName} validated successfully`);
  }
}
