const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Category } = require("../model/Category");
const Error = require("../scripts/error");
var { upload } = require("../middleware/uploader");

router.post("/new", upload.single("catIcon"), async (req, res, next) => {
  if (!req.file) return next(Error(400, "no file", "request whitout image"));

  const { fa_name, en_name, description } = req.body;

  const newCategory = new Category({
    fa_name,
    en_name,
    description,
    icon: req.file.path.replace("upload", ""),
  });

  let mongoosErorrs = [];
  let data = {};
  try {
    data = await newCategory.save();
  } catch (ex) {
    for (field in ex.errors) {
      mongoosErorrs.push(ex.errors[field].message);
    }
    const error = new Error(mongoosErorrs);
    error.status = 400;
    return next(error);
  }

  res.status(201).send({
    message: `دسته بندی جدید اضافه شد`,
    data,
  });
});
router.get("/", async (req, res, next) => {
  const { categoryName } = req.query;
  if (categoryName) {
    const data = await Category.findOne({ categoryName });
    if (!data) return res.status(204).send();
    res.status(200).send(data);
  } else {
    const data = await Category.find();
    if (!data[0]) return res.status(204).send();
    res.status(200).send(data);
  }
});
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndRemove(id);
    return res
      .status(200)
      .send({ _id: id, message: "دسته بندیه مورد نظر حذف شد" });
  } catch (error) {
    return next(
      Error(500, "data base error", "مشکلی در حذف دسته بندی به وجود آمده است")
    );
  }
});
router.put("/update", upload.single("catIcon"), async (req, res, next) => {
  let icon = req.file ? req.file.path.replace("upload", "") : req.body.icon;

  const { _id: id, fa_name, en_name, description } = req.body;

  try {
    const data = await Category.findByIdAndUpdate(
      id,
      {
        fa_name,
        en_name,
        description,
        icon,
      },
      { new: true }
    );
    console.log({ data });
    return res.status(200).send({ data, message: "تغییرات اعمال شد" });
  } catch (error) {
    return next(
      Error(500, "data base error", "مشکلی در تغییر دسته بندی به وجود آمده است")
    );
  }
});

module.exports = router;
