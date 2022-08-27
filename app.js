const port = process.env.port;
const express = require("express");
const mongoose = require("mongoose"); // new
const routes = require("./routes");
require("dotenv").config();
// Connect to MongoDB database

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use("/api", routes); // new

    app.listen(port || 5000, () => {
      console.log("Server has started!");
    });
  });
