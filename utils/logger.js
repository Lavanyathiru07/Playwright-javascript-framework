/**
 * Logger utility to standardize logging across the framework.
 * 
 * Provides structured logging methods for test steps,
 * informational messages, warnings, and errors.
 * 
 * This helps improve debugging, reporting, and readability.
 */
class Logger {

  /**
   * Logs a test step.
   * 
   * @param {string} message - Description of the test step
   */
  static step(message) {
    console.log(`[STEP] ${message}`);
  }

  /**
   * Logs an informational message.
   * 
   * @param {string} message - Information message
   */
  static info(message) {
    console.log(`[INFO] ${message}`);
  }

  /**
   * Logs a warning message.
   * 
   * @param {string} message - Warning message
   */
  static warn(message) {
    console.warn(`[WARN] ${message}`);
  }

  /**
   * Logs an error message.
   * 
   * @param {string} message - Error message
   */
  static error(message) {
    console.error(`[ERROR] ${message}`);
  }

}

export default Logger;