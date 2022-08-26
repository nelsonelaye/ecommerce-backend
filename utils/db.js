const mongoose = require("mongoose");
require("dotenv").config();
// const url = "mongodb://localhost/ecommerce";
const url = process.env.ATLAS;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
module.exports = mongoose;
