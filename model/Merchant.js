const mongoose = require("mongoose");

const Merchant = mongoose.model(
  "Merchant",
  new mongoose.Schema({
    pageId: { type: String },
    pageUsername: { type: String, required: true },
    name: { type: String },
    phonNumber: [{}],
    address: { type: String },
    city: { type: String },
    joinedTime: { type: Date, default: Date.now },
    profileImage: { type: String },
    BankAccountDetails: {},
    posts: [],
    productPosts: [],
  })
);

exports.Merchant = Merchant;
