module.exports.getAllposts = getAllposts = async (user) => {
  console.log("get al post");
  let posts = await user.items();
  let all = [...posts];

  while (user.isMoreAvailable()) {
    console.log("wait..");
    await sleep(5000);
    let next = await user.items();
    all.concat(next);

    console.log(all.length + "posts saved for now");
  }
  console.log(`${all.length} post links downloded`);
  return all;
};
