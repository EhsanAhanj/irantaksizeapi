const express = require("express");
const router = express.Router();

const error = require("../scripts/error");

router.get("/", async (req, res, next) => {
  const { search } = req.query;

  if (!search)
    return next(error("400", "bad request", "یوز نیم وارد نشده است", ""));

  try {
    const ig = await initialIgAndLogin();
    const result = await ig.search.users(search);
    res.status(200).send(result);
  } catch (err) {
    next(error("500", "server error", err.message, ""));
  }
});
module.exports = router;
