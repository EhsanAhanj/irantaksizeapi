const { analysePosts } = require("./analysePost");
const { getAllposts } = require("./getAllPosts");
const { initialDb } = require("./dbInitale");
const { initialIgAndLogin } = require("./initialIgAndLogin");

module.exports = {
  analysePosts,
  getAllposts,
  initialDb,
  initialIgAndLogin,
};
