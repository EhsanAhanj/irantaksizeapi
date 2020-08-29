const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Merchant } = require("../model/Merchant");
const Error = require("../scripts/error");

router.post("/", async (req, res, next) => {
  // const { error: err } = validateNewSlider(req.body);
  // if (err) return next(error(400, "Joi Validation Error", err));

  const {
    pageId,
    pageUsername,
    name,
    phonNumber,
    address,
    city,
    profileImage,
    BankAccountDetails,
  } = req.body;

  const newMerchant = new Merchant({
    pageId,
    pageUsername,
    name,
    phonNumber,
    address,
    city,
    profileImage,
    BankAccountDetails,
  });

  let mongoosErorrs = [];
  let result = {};
  try {
    result = await newMerchant.save();
  } catch (ex) {
    for (field in ex.errors) {
      mongoosErorrs.push(ex.errors[field].message);
    }
    const error = new Error(mongoosErorrs);
    error.status = 400;
    return next(error);
  }

  res.status(201).send({
    message: `New Merchant Added`,
    result,
  });
});
router.get("/", async (req, res, next) => {
  const { username } = req.query;
  if (username) {
    const result = await Merchant.findOne({ username });
    if (!result) return res.status(204).send();
    res.status(200).send(result);
  } else {
    next(Error(400, "user input error", "یوز نیم وارد نشده است"));
  }
});

module.exports = router;
