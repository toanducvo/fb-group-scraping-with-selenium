const { driver } = require("./driver");
const { scrape } = require("./scrape");
const { loginSimulator } = require("./login-simulator");

const target = [
  "https://mbasic.facebook.com/groups/iuh2022",
  "https://mbasic.facebook.com/groups/tuyensinhIUH",
  "https://mbasic.facebook.com/groups/iuh2021",
  "https://mbasic.facebook.com/groups/iuh2020",
];

(async () => {
  await loginSimulator(driver);

  for (const url of target) {
    try {
      console.warn("INFO: Start scraping " + url);
      await scrape(driver, new URL(url));
    } catch (err) {
      // exit code
      console.error(err);
      process.exit(1);
    }
  }

  console.warn("INFO: Done scraping");
})();
