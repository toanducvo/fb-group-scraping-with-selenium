const { By, WebElement } = require("selenium-webdriver");

/**
 * @param {String} val
 * @returns {(null|String)} if val is not null, return val with mbasic subdomain removed
 */
const getFacebookProfile = (val) => {
  if (val === undefined || val == null) {
    return null;
  }
  const link = new URL(val.replace(/mbasic+./gm, ""));
  return new URL(
    link.pathname.includes("/profile.php")
      ? `${link.protocol}//www.${link.hostname}${
          link.pathname
        }?id=${link.searchParams.get("id")}`
      : `${link.protocol}//www.${link.hostname}${link.pathname}`
  ).href;
};

/**
 * @param {String} link
 * @returns {String} return post link with mbasic subdomain removed
 */
const getPostPermalink = (link) => {
  return new URL(link.split("?")[0].replace(/mbasic+./gm, "www.")).href;
};

/**
 * @param {String} val
 * @param {Date} scrapedAt
 * @returns {object} approximate the time when post created depending on scraped date
 */
const getPostCreated = (val, scrapedAt) => {
  // let actualTime = null;

  // // case: <number> hr(s)
  // if (new RegExp(/^[0-9]?[0-9]\shr(s){0,1}/gm).test(val)) {
  //   actualTime = new Date(scrapedAt.get - parseInt(val.split(" ")[0]) * 3600000);
  // }

  // // case: <number> min(s)
  // if (new RegExp(/^[0-5]?[0-9]\smin(s){0,1}/gm).test(val)) {
  //   actualTime = new Date(scrapedAt.getMinutes() - (parseInt(val.split(" ")[0]) * 60));
  // }

  return {
    type: "raw_time",
    time: val,
    scrapedAt,
  };
};

/**
 * @param {WebElement} post
 * @param {Date} scrapedAt
 * @param {URL} parent
 * @return {object} return post data
 */
const extractPost = async (post, scrapedAt, parent) => {
  // Author is a owner of the post
  // If "a" element hasn't "href" attribute, it means we wasn't login to facebook
  const postAuthor = await post.findElement(
    By.xpath(".//div/div[1]//strong[1]//a")
  );

  const postContent = await post.findElement(By.xpath(".//div/div[2]"));

  const postedTime = await post.findElement(By.xpath(".//abbr"));

  // Post metadata might be likes, reactions, comments, shares, etc.
  const postsMetaData = await post.findElements(By.xpath(".//div[2]//a"));

  // Find the post link
  if (postsMetaData.length > 0) {
    for (const postMetaData of postsMetaData) {
      // Loop through all links in post metadata find element contains "Full Story" to view full post
      if ((await postMetaData.getText()) === "Full Story") {
        var link = await postMetaData.getAttribute("href");
        // If Full Story is found, break the loop
        break;
      }
    }
  }

  return {
    author: {
      name: await postAuthor.getText(),
      profile: getFacebookProfile(await postAuthor.getAttribute("href")),
    },
    content: await postContent.getText(),
    permalink: getPostPermalink(link),
    createdAt: getPostCreated(await postedTime.getText(), scrapedAt),
    scrapedFromPage: parent.href,
  };
};

module.exports = {
  getFacebookProfile,
  getPostPermalink,
  getPostCreated,
  extractPost,
};
