import Logger from './logger.js';

/**
 * Actions class provides reusable UI interaction methods.
 * 
 * Handles all browser actions like click, input, selection,
 * and navigation with proper logging and error handling.
 */
export default class Actions {

  /**
   * Initializes Actions with Playwright page instance
   * 
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Clicks an element
   * 
   * @param {string} locator 
   * @param {string} elementName 
   */
  async click(locator, elementName) {
    try {
      Logger.step(`Click on ${elementName}`);

      const element = this.page.locator(locator);
      await element.waitFor({ state: 'visible' });

      Logger.action(`Clicking ${elementName}`);
      await element.click();

      Logger.success(`${elementName} clicked successfully`);

    } catch (error) {
      Logger.error(`Failed to click ${elementName}`);
      throw error;
    }
  }

  
/**
 * Get current page URL
 * 
 * @param {string} elementName
 * @returns {string}
 */
async getUrl(elementName = 'Current Page') {
  Logger.step(`Get URL of ${elementName}`);

  const url = this.page.url();

  Logger.info(`${elementName} URL: ${url}`);

  return url;
}

/**
 * Get text from all elements in a list
 * 
 * @param {string} locator - Locator for list elements
 * @param {string} elementName - Logical name for logging
 * @returns {Promise<string[]>} Array of text values
 */
async getAllTexts(locator, elementName) {
  try {
    Logger.step(`Get all texts from ${elementName}`);

    const elements = this.page.locator(locator);

    await elements.first().waitFor({ state: 'visible' });

    const count = await elements.count();
    const textList = [];

    Logger.info(`Total ${elementName}: ${count}`);

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();

      Logger.action(`Reading text at index ${i}: ${text}`);

      textList.push(text.trim());
    }

    Logger.success(`All texts retrieved from ${elementName}`);

    return textList;

  } catch (error) {
    Logger.error(`Failed to get texts from ${elementName}`);
    throw error;
  }
}


/**
 * Scroll page by given pixels
 * 
 * @param {number} x
 * @param {number} y
 */
async scrollBy(x, y) {
  try {
    Logger.step(`Scroll page by X:${x}, Y:${y}`);

    await this.page.evaluate(([x, y]) => {
      window.scrollBy(x, y);
    }, [x, y]);

    Logger.success(`Page scrolled`);

  } catch (error) {
    Logger.error(`Failed to scroll page`);
    throw error;
  }
}

/**
 * Scroll to bottom of page
 */
async scrollToBottom() {
  try {
    Logger.step(`Scroll to bottom of page`);

    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    Logger.success(`Scrolled to bottom`);

  } catch (error) {
    Logger.error(`Failed to scroll to bottom`);
    throw error;
  }
}


/**
 * Hover on an element and click a target element
 * 
 * @param {string} hoverLocator - Element to hover on
 * @param {string} clickLocator - Element to click after hover
 * @param {string} elementName - Logical name for logging
 */
async hoverAndClick(hoverLocator, clickLocator, elementName) {
  try {
    Logger.step(`Hover and click ${elementName}`);

    const hoverElement = this.page.locator(hoverLocator);
    const clickElement = this.page.locator(clickLocator);

    await hoverElement.waitFor({ state: 'visible' });

    Logger.action(`Hovering on element`);
    await hoverElement.hover();

    await clickElement.waitFor({ state: 'visible' });

    Logger.action(`Clicking ${elementName}`);
    await clickElement.click();

    Logger.success(`${elementName} clicked after hover`);

  } catch (error) {
    Logger.error(`Failed to hover and click ${elementName}`);
    throw error;
  }
}


  /**
   * Enters value into input field
   * 
   * @param {string} locator
   * @param {string} value
   * @param {string} elementName
   */
  async fill(locator, value, elementName) {
    try {
      Logger.step(`Enter value into ${elementName}`);

      const element = this.page.locator(locator);
      await element.waitFor({ state: 'visible' });

      Logger.action(`Entering "${value}" into ${elementName}`);
      await element.fill('');
      await element.fill(value);

      Logger.success(`${elementName} filled successfully`);

    } catch (error) {
      Logger.error(`Failed to fill ${elementName}`);
      throw error;
    }
  }

  /**
   * Checks a checkbox if not selected
   */
  async check(locator, elementName) {
    try {
      Logger.step(`Select ${elementName}`);

      const element = this.page.locator(locator);
      await element.waitFor({ state: 'visible' });

      if (!(await element.isChecked())) {
        Logger.action(`Checking ${elementName}`);
        await element.check();
        Logger.success(`${elementName} selected`);
      } else {
        Logger.info(`${elementName} already selected`);
      }

    } catch (error) {
      Logger.error(`Failed to select ${elementName}`);
      throw error;
    }
  }

  /**
   * Unchecks a checkbox
   */
  async uncheck(locator, elementName) {
    try {
      Logger.step(`Unselect ${elementName}`);

      const element = this.page.locator(locator);
      await element.waitFor({ state: 'visible' });

      if (await element.isChecked()) {
        Logger.action(`Unchecking ${elementName}`);
        await element.uncheck();
        Logger.success(`${elementName} unselected`);
      } else {
        Logger.info(`${elementName} already unselected`);
      }

    } catch (error) {
      Logger.error(`Failed to unselect ${elementName}`);
      throw error;
    }
  }

  /**
   * Click element by index
   */
  async clickElementByIndex(locator, index, elementName) {
    try {
      Logger.step(`Click ${elementName} at index ${index}`);

      const elements = this.page.locator(locator);
      await elements.first().waitFor({ state: 'visible' });

      const count = await elements.count();

      if (index >= count) {
        throw new Error(`Index ${index} out of range`);
      }

      Logger.action(`Clicking ${elementName} at index ${index}`);
      await elements.nth(index).click();

      Logger.success(`${elementName} clicked successfully`);

    } catch (error) {
      Logger.error(`Failed to click ${elementName}`);
      throw error;
    }
  }

  /**
   * Select dropdown by label
   */
  async selectByLabel(locator, label, elementName) {
    try {
      Logger.step(`Select ${label} from ${elementName}`);

      const element = this.page.locator(locator);
      await element.waitFor({ state: 'visible' });

      Logger.action(`Selecting ${label}`);
      await element.selectOption({ label });

      Logger.success(`${label} selected`);

    } catch (error) {
      Logger.error(`Failed to select ${label}`);
      throw error;
    }
  }

  /**
   * Get text from element
   */
  async getText(locator, elementName) {
    Logger.step(`Get text from ${elementName}`);

    const text = await this.page.locator(locator).textContent();

    Logger.info(`Text from ${elementName}: ${text}`);
    return text;
  }

  /**
   * Get element count
   */
  async getCount(locator, elementName) {
    Logger.step(`Get count of ${elementName}`);

    const elements = this.page.locator(locator);
    await elements.first().waitFor({ state: 'visible' });

    const count = await elements.count();

    Logger.info(`${elementName} count: ${count}`);
    return count;
  }

  /**
   * Navigate to URL
   */
  async navigate(url) {
    Logger.step(`Navigate to URL`);

    await this.page.goto(url);

    Logger.success(`Navigation completed`);
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad() {
    Logger.step(`Wait for page load`);

    await this.page.waitForLoadState('networkidle');

    Logger.success(`Page loaded successfully`);
  }

  /**
   * Wait for element visibility
   */
  async waitForVisible(locator, elementName) {
    Logger.step(`Wait for ${elementName}`);

    await this.page.locator(locator).waitFor({ state: 'visible' });

    Logger.success(`${elementName} is visible`);
  }

  /**
   * Scroll to element
   */
  async scrollTo(locator, elementName) {
    Logger.step(`Scroll to ${elementName}`);

    await this.page.locator(locator).scrollIntoViewIfNeeded();

    Logger.success(`${elementName} in view`);
  }

  /**
 * Wait for element to be visible
 */
async waitForElement(locator, elementName) {
  try {
    Logger.step(`Wait for ${elementName} to be visible`);

    await this.page.locator(locator).waitFor({ state: 'visible' });

    Logger.success(`${elementName} is visible`);
  } catch (error) {
    Logger.error(`${elementName} not visible`);
    throw error;
  }
}

/**
 * Wait for element to disappear
 */
async waitForElementToDisappear(locator, elementName) {
  try {
    Logger.step(`Wait for ${elementName} to disappear`);

    await this.page.locator(locator).waitFor({ state: 'hidden' });

    Logger.success(`${elementName} disappeared`);
  } catch (error) {
    Logger.error(`${elementName} still present`);
    throw error;
  }
}

/**
 * Wait until URL contains expected value
 */
async waitForURL(expectedText) {
  try {
    Logger.step(`Wait for URL to contain ${expectedText}`);

    await this.page.waitForURL(`**${expectedText}**`);

    Logger.success(`URL contains ${expectedText}`);
  } catch (error) {
    Logger.error(`URL did not contain ${expectedText}`);
    throw error;
  }
}

/**
 * Wait for full page load
 */
async waitForPageLoad() {
  try {
    Logger.step(`Wait for page load`);

    await this.page.waitForLoadState('networkidle');

    Logger.success(`Page loaded successfully`);
  } catch (error) {
    Logger.error(`Page did not load properly`);
    throw error;
  }
}

/**
 * Hard wait (Use only if absolutely needed)
 */
async waitForTime(milliseconds) {
  Logger.warn(`Waiting for ${milliseconds} ms`);
  await this.page.waitForTimeout(milliseconds);
}
}

