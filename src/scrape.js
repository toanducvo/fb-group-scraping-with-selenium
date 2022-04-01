const { By, ThenableWebDriver } = require("selenium-webdriver");
const { extractPost } = require("./extract");
const { writeFile } = require("./save");

/**
 * @param {ThenableWebDriver} driver
 * @param {URL} target
 */

const scrape = async (driver, target) => {
  try {
    await driver.get(target.href);

    // Go through all pages
    while (true) {
      const scrapedAt = new Date();

      // Get all posts
      const posts = await driver.findElements(
        By.xpath("//div[@id='m_group_stories_container']/div[1]/div")
      );

      for (const post of posts) {
        const data = await extractPost(
          post,
          scrapedAt,
          new URL(await driver.getCurrentUrl())
        );
        writeFile(data);
      }
      console.warn("INFO: Sleeping for 5 seconds");
      await driver.sleep(5000);

      // Click next page
      await driver
        .findElement(By.xpath("//*[@id='m_group_stories_container']/div[2]/a"))
        .click();
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = {
  scrape,
};
