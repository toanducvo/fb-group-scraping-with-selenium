const data = require("../data/raw_posts.json");

const newData = data.flatMap((post) => {
  return [post.postCreatedAt];
});

// newData.forEach((data) => {
//   console.log(data);
// });

const fs = require("fs");

fs.writeFileSync("./data/flatten.json", JSON.stringify(newData), "utf-8");
