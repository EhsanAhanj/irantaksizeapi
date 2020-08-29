const schedule = require("node-schedule");
const Merchant = require("../model/Merchant");
const { initialIgAndLogin } = require("../helpers");
const test = async () => {
  console.log("NOW");
  const ig = await initialIgAndLogin();

  // const userId = await ig.user.getIdByUsername(merchant.pageUsername);

  // const user = ig.feed.user(userId);
};
// test();
// const doSchedule = async () => {
//   console.log("NOW");
//   const ig = await initialIgAndLogin();

//   // const userId = await ig.user.getIdByUsername(merchant.pageUsername);

//   // const user = ig.feed.user(userId);

//   const search = ig.search("ahamd");
//   console.log(search);

// for (merchant of merchants) {
//   /*
//   [] get all posts and chek not repetive
//   [] chek only be picture
//   [] downlaod image caption time
//   [] new obj in data base and save it
//   */
//   // let allposts = await getAllposts(user);
// }

// await analysePosts(allposts);
// };
// schedule.scheduleJob("* * * * *", doSchedule);
// module.exports.doSchedule = doSchedule;
