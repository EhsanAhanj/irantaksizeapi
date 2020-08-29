const mongoose = require("mongoose");

const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema({
    fa_name: { type: String, required: true },
    en_name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, required: true },
  })
);

exports.Brand = Brand;
