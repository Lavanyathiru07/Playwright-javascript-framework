import Logger from './logger.js';
import { expect } from '@playwright/test';

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
   * Verify element is visible // isn't wait message visible
   * @param {string} locator
   * @param {string} elementName
   */

  async verifyVisible(locator, elementName) {
    Logger.step(`Verify visibility of ${elementName}`);

    await expect(this.page.locator(locator)).toBeVisible();

    Logger.success(`${elementName} is visible`);
  }

  /**
   * Verify element to be  visible //waiting for message until the assertion fail 
   * @param {string} Message
   */

  async verifyToBEVisible(message) {
  Logger.step(`Verify to be visibility of ${message}`);
  await expect(this.page.getByText(message)).toBeVisible();
  Logger.success(`${message} to be visible`);
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

    await expect(this.page.locator(locator)).toHaveText(expectedText);
    Logger.success(`Text matched for ${elementName}`);
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

    await expect(this.page.locator(locator)).toContainText(expectedText, {
      ignoreCase: true
    });
    Logger.success(`Text validation passed for ${elementName}`);
  }

  

  /**
   * Verify URL contains expected value
   * 
   * @param {string} expectedText
   * @param {string} pageName
   */


  async verifyUrlContains(expectedText, pageName) {
    Logger.step(`Verify URL for ${pageName}`);

    await expect.poll(() => this.page.url()).toContain(expectedText);
    Logger.success(`URL validation passed for ${pageName}`);
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

    await expect.poll(() => this.page.locator(locator).count())
      .toBeGreaterThan(expectedCount);
    Logger.success(`${elementName} count is greater than ${expectedCount}`);
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

    await expect(this.page.locator(locator)).toHaveCount(expectedCount);
    Logger.success(`Count matched for ${elementName}`);
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

    await expect(this.page.locator(locator)).toHaveValue(expectedValue);
    Logger.success(`Input value matched for ${elementName}`);
  }

  /**
   * Verify checkbox is checked
   * 
   * @param {string} locator
   * @param {string} elementName
   */

  async verifyChecked(locator, elementName) {
    Logger.step(`Verify ${elementName} is checked`);

    await expect(this.page.locator(locator)).toBeChecked();
    Logger.success(`${elementName} is checked`);
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
      await expect(elements.nth(i)).toContainText(expectedText, {
        ignoreCase: true
      });
    }

    Logger.success(`All ${elementName} validated successfully`);
  }

  /**
 * Verify actual value equals expected value
 *
 * @param {string} actualValue
 * @param {string} expectedValue
 * @param {string} fieldName
 */
async verifyEquals(actualValue, expectedValue, fieldName) {

    Logger.step(
        `Verify ${fieldName} equals "${expectedValue}"`
    );

    await expect(actualValue)
        .toBe(expectedValue);

    Logger.success(
        `${fieldName} matched successfully`
    );
}

/**
 * Verify actual value contains expected value
 *
 * @param {string} actualValue
 * @param {string} expectedValue
 * @param {string} fieldName
 */
async verifyContains(actualValue,expectedValue,fieldName){

    Logger.step(
        `Verify ${fieldName} contains "${expectedValue}"`
    );

    await expect(actualValue)
        .toContain(expectedValue);

    Logger.success(
        `${fieldName} contains expected value`
    );

}

}
