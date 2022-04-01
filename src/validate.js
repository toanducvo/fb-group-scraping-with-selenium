const fs = require("fs");

/**
 * @param {URL} permalink
 * @return {boolean} return true if the post already have been scraped
 */
const isDuplicatedPost = (permalink) => {
  try {
    if (!fs.existsSync("./data") || !fs.existsSync("./data/posts.json")) {
      throw new Error("File not found");
    }

    const data = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));

    if (data.length != 0) {
      data.map((post) => {
        return post.permalink == permalink.href;
      });
    }
    return false;
  } catch (err) {
    return false;
  }
};

module.exports = { isDuplicatedPost };
