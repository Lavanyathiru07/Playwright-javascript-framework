 const config={
    dev: {
    baseURL: "https://automationexercise.com",
    apiURL: "https://practice.expandtesting.com/notes/api"
  }

 };export default config;

 
 
/**
 * Read ENV variable from system
 */
export const env = process.env.ENV || "dev";

/**
 * Get current environment config
 */
export const currentConfig = config[env];

/**
 * Safety check (important)
 */
if (!currentConfig) {
  throw new Error(`Invalid ENV: ${env}`);
}
