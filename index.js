/* tslint:disable:no-console */
const express = require("express");
const app = express();
const helemt = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
require("./scripts/doSchedule");
const { initialDb } = require("./helpers");

const merchantRoutes = require("./routes/merchant");
const instasearchRoutes = require("./routes/instasearch");
const brandRoutes = require("./routes/brand");
const categoryRoutes = require("./routes/category");

app.use(morgan("dev"));
app.use(helemt());
app.use(cors());
app.use(express.json());
app.use(express.static("upload"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/merchant", merchantRoutes);
app.use("/instasearch", instasearchRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

initialDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App lisening on port ${PORT}`);
});
