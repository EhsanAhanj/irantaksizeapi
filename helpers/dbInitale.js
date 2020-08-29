const mongoose = require("mongoose");
require("dotenv").config();
const { DB } = process.env;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};
module.exports.initialDb = () =>
  mongoose
    .connect(DB, options)
    .then(() => console.log("Mongo is Up!"))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
