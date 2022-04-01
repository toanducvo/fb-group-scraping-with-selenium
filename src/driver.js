const { Builder } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const proxy = require("selenium-webdriver/proxy");

const service = new edge.ServiceBuilder("./drivers/msedgedriver.exe");
const options = new edge.Options();

// options.setProxy(
//   proxy.manual({
//     https: "64.235.204.107:3128",
//   })
// );

const driver = new Builder()
  .forBrowser("MicrosoftEdge")
  .setEdgeService(service)
  .setEdgeOptions(options)
  .build();

module.exports = { driver };
