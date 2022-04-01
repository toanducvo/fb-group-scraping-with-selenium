const { By, ThenableWebDriver } = require("selenium-webdriver");
require("dotenv").config();

/**
 * Login Simulator to Facebook
 * @param {ThenableWebDriver} driver
 */
const loginSimulator = async (driver) => {
  const email = process.env.EMAIL || null;
  const password = process.env.PASSWORD || null;

  if (email == null || password == null) {
    console.warn("INFO: No credentials found");
    console.warn("INFO: Login Simulator will be skipped");
    return;
  }

  await driver.get("https://www.facebook.com/");

  // Sleep for 5 seconds by default
  await driver.sleep(5000);
  await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(email);
  console.warn("INFO: Email entered");

  await driver.sleep(2000);
  await driver.findElement(By.xpath("//input[@id='pass']")).sendKeys(password);
  console.warn("INFO: Password entered");

  await driver.sleep(3000);
  await driver.findElement(By.xpath("//button[@name='login']")).click();
  console.warn("INFO: Login button clicked");

  await driver.sleep(5000);
};

module.exports = {
  loginSimulator,
};
