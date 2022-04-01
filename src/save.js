const fs = require("fs");
const { isDuplicatedPost } = require("./validate");

/**
 * @param {object} result - data object to save
 */
const writeFile = (result) => {
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }

  if (!fs.existsSync("./data/posts.json")) {
    fs.writeFileSync("./data/posts.json", "[]", "utf8");
  }

  if (isDuplicatedPost(result.permalink)) {
    console.warn("Post is duplicated");
    console.warn("Post wasn't saved");
    return;
  }

  const data = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
  data.push(result);
  fs.writeFileSync("./data/posts.json", JSON.stringify(data), "utf8");
  console.log("INFO: Saved post " + result.permalink);
};

module.exports = {
  writeFile,
};
