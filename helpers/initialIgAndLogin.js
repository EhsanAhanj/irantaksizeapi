const { IgApiClient } = require("instagram-private-api");
require("dotenv").config();
const { IG_USERNAME, IG_PASSWORD } = process.env;

module.exports.initialIgAndLogin = initialIgAndLogin = async function () {
  const ig = new IgApiClient();
  ig.state.generateDevice(IG_USERNAME);
  await ig.account.login(IG_USERNAME, IG_PASSWORD);
  return ig;
};
