const mongoose = require('mongoose');

const RawPost = mongoose.model(
  'RawPost',
  new mongoose.Schema({
    mediaId: { type: String, required: true },
    merchant: { username: String, userId: String, full_name: String },
    caption: { type: String },
    updateDate: { type: Date, default: Date.now },
    taken_at: { type: String },
    code: { type: String },
    media_type: Number,
    images: {
      type: Array,
      items: String,
    },
  }),
);

exports.RawPost = RawPost;
