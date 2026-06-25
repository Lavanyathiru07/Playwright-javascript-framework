import Logger from './logger.js';

class Assertions {

  constructor(page) {
    this.page = page;
  }

  /**
   * Verifies element is visible
   */
  async verifyVisible(locator, elementName) {
    Logger.step(`Verifying visibility of ${elementName}`);

    const isVisible = await this.page.locator(locator).isVisible();

    if (isVisible) {
      Logger.info(`${elementName} is visible`);
    } else {
      Logger.error(`${elementName} is not visible`);
      throw new Error(`Visibility validation failed for ${elementName}`);
    }
  }

  /**
   * Verifies text equals expected value
   */
  async verifyText(locator, expectedText, elementName) {
    Logger.step(`Verifying text of ${elementName}`);

    const actualText = await this.page.locator(locator).textContent();

    if (actualText.trim() === expectedText) {
      Logger.info(`Text matched for ${elementName}`);
    } else {
      Logger.error(`Expected: ${expectedText}, Actual: ${actualText}`);
      throw new Error(`Text validation failed for ${elementName}`);
    }
  }

  /**
   * Verifies text contains expected value
   */
  async verifyTextContains(locator, expectedText, elementName) {
    Logger.step(`Verifying ${elementName} contains "${expectedText}"`);

    const text = await this.page.locator(locator).textContent();

    if (text.toLowerCase().includes(expectedText.toLowerCase())) {
      Logger.info(`Text contains expected value`);
    } else {
      Logger.error(`Text does not contain expected value`);
      throw new Error(`Contains validation failed for ${elementName}`);
    }
  }

  /**
   * Verifies URL contains expected text
   */
  async verifyUrlContains(expectedText, pageName) {
    Logger.step(`Verifying URL for ${pageName}`);

    const url = this.page.url();

    if (url.includes(expectedText)) {
      Logger.info(`URL validation passed`);
    } else {
      Logger.error(`URL mismatch. Current URL: ${url}`);
      throw new Error(`URL validation failed`);
    }
  }

  /**
   * Verifies element count is greater than expected
   */
  async verifyCountGreaterThan(locator, expectedCount, elementName) {
    Logger.step(`Verifying count of ${elementName}`);

    const count = await this.page.locator(locator).count();

    if (count > expectedCount) {
      Logger.info(`${elementName} count is valid: ${count}`);
    } else {
      Logger.error(`Expected > ${expectedCount}, but got ${count}`);
      throw new Error(`Count validation failed for ${elementName}`);
    }
  }

  /**
   * Verifies element count is exact
   */
  async verifyCountEquals(locator, expectedCount, elementName) {
    Logger.step(`Verifying count of ${elementName} equals ${expectedCount}`);

    const count = await this.page.locator(locator).count();

    if (count === expectedCount) {
      Logger.info(`Count matched: ${count}`);
    } else {
      Logger.error(`Expected: ${expectedCount}, Actual: ${count}`);
      throw new Error(`Count mismatch for ${elementName}`);
    }
  }

  /**
   * Verifies checkbox is checked
   */
  async verifyChecked(locator, elementName) {
    Logger.step(`Verifying ${elementName} is checked`);

    const isChecked = await this.page.locator(locator).isChecked();

    if (isChecked) {
      Logger.info(`${elementName} is checked`);
    } else {
      Logger.error(`${elementName} is not checked`);
      throw new Error(`Checkbox validation failed`);
    }
  }

  /**
   * Verifies input field value
   */
  async verifyInputValue(locator, expectedValue, elementName) {
    Logger.step(`Verifying input value of ${elementName}`);

    const value = await this.page.locator(locator).inputValue();

    if (value === expectedValue) {
      Logger.info(`Input value matched`);
    } else {
      Logger.error(`Expected: ${expectedValue}, Actual: ${value}`);
      throw new Error(`Input value validation failed`);
    }
  }

  /**
   * Verifies all elements contain expected text
   */
  async verifyAllElementsContainText(locator, expectedText, elementName) {
    Logger.step(`Validating ${elementName} contains "${expectedText}"`);

    const elements = this.page.locator(locator);

    await elements.first().waitFor({ state: 'visible' });

    const count = await elements.count();

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();

      if (text.toLowerCase().includes(expectedText.toLowerCase())) {
        Logger.info(`PASS: ${text}`);
      } else {
        Logger.error(`FAIL: ${text}`);
        throw new Error(`Validation failed for ${elementName}`);
      }
    }

    Logger.info(`All ${elementName} validated successfully`);
  }
}

export default Assertions;