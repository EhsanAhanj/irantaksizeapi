const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Brand } = require("../model/Brand");
const Error = require("../scripts/error");
var { upload } = require("../middleware/uploader");

router.post("/new", upload.single("brandImage"), async (req, res, next) => {
  if (!req.file) return next(Error(400, "no file", "request whitout image"));

  const { fa_name, en_name, description } = req.body;

  const newBrand = new Brand({
    fa_name,
    en_name,
    description,
    icon: req.file.path.replace("upload", ""),
  });

  let mongoosErorrs = [];
  let data = {};
  try {
    data = await newBrand.save();
  } catch (ex) {
    for (field in ex.errors) {
      mongoosErorrs.push(ex.errors[field].message);
    }
    const error = new Error(mongoosErorrs);
    error.status = 400;
    return next(error);
  }

  res.status(201).send({
    message: `برند جدید اضافه شد`,
    data,
  });
});
router.get("/", async (req, res, next) => {
  const { brandName } = req.query;
  if (brandName) {
    const data = await Brand.findOne({ brandName });
    console.log(data);
    if (!data) return res.status(204).send();
    res.status(200).send(data);
  } else {
    const data = await Brand.find();
    if (!data[0]) return res.status(204).send();
    res.status(200).send(data);
  }
});
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const elham = await Brand.findByIdAndRemove(id);
    console.log({ elham });
    return res.status(200).send({ _id: id, message: "برند مورد نظر حذف شد" });
  } catch (error) {
    return next(
      Error(500, "data base error", "مشکلی در حذف برند به وجود آمده است")
    );
  }
});
router.put("/update", upload.single("brandImage"), async (req, res, next) => {
  let icon = req.file ? req.file.path.replace("upload", "") : req.body.icon;

  const { _id: id, fa_name, en_name, description } = req.body;

  try {
    const data = await Brand.findByIdAndUpdate(
      id,
      {
        fa_name,
        en_name,
        description,
        icon,
      },
      { new: true }
    );
    return res.status(200).send({ data, message: "تغییرات اعمال شد" });
  } catch (error) {
    return next(
      Error(500, "data base error", "مشکلی در تغییر برند به وجود آمده است")
    );
  }
});

module.exports = router;
