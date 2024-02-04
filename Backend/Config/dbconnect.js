const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB is ready to serve..."))
  .catch((err) => {
    console.log(err);
    console.log("There was a problem connecting with the DB");
  });
module.exports = dbConnect;