const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
//---------set upload file name and dynamic destination --
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.originalUrl == "/brand/new") {
      const dir = `./upload/images/brands/`;
      try {
        fs.ensureDirSync(dir);
      } catch (err) {
        console.error(err);
      }
      cb(null, dir);
    } else if (req.originalUrl == "/brand/update") {
      const dir = `./upload/images/brands/`;
      try {
        fs.ensureDirSync(dir);
      } catch (err) {
        console.error(err);
      }
      cb(null, dir);
    } else if (
      req.originalUrl === "/category/new" ||
      req.originalUrl === "/category/update"
    ) {
      const dir = `./upload/images/category/`;
      try {
        fs.ensureDirSync(dir);
      } catch (err) {
        console.error(err);
      }
      cb(null, dir);
    } else if (req.originalUrl == "/admin/slider") {
      let category = file.originalname.split("__")[0];
      if (!file.originalname.includes("__")) category = "main";
      const dir = `./upload/img/responsive_slider/${category}`;
      try {
        fs.ensureDirSync(dir);
      } catch (err) {
        console.error(err);
      }
      cb(null, dir);
    }
  },
  filename: function (req, file, cb) {
    if (
      req.originalUrl === "/brand/new" ||
      req.originalUrl === "/brand/update"
    ) {
      const { en_name } = req.body;
      cb(
        null,
        en_name.replace(/[+~!`:./ \=@#$%^&*(){}<>,?"']/g, "-") +
          "_" +
          "logo" +
          "." +
          file.originalname
            .split(".")
            .pop()
            .replace(/[+~!`:./ \=@#$%^&*(){}<>,?"']/g, "-")
      );
    } else if (req.originalUrl == "/admin/c") {
      cb(
        null,
        { en_name } + "_" + "logo" + "." + file.originalname.split(".").pop()
      );
    } else if (req.originalUrl == "/admin/slider") {
      cb(
        null,
        new Date()
          .toISOString()
          .replace(/[+~!`:./ \=@#$%^&*(){}<>,?"']/g, "-") + file.originalname
      );
    } else if (
      req.originalUrl === "/category/new" ||
      req.originalUrl === "/category/update"
    ) {
      const { en_name } = req.body;
      cb(
        null,
        en_name.replace(/[+~!`:./ \=@#$%^&*(){}<>,?"']/g, "-") +
          "_" +
          "icon" +
          "." +
          file.originalname
            .split(".")
            .pop()
            .replace(/[+~!`:./ \=@#$%^&*(){}<>,?"']/g, "-")
      );
    } else {
      cb(null, "DASHAGH");
    }
  },
});

// -------set custom filter for storing file -------------
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = { fileSize: 1024 * 1024 * 5 };

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports.upload = upload;
