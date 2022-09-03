const port = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose"); // new
const routes = require("./routes");
require("dotenv").config();
var cors = require("cors");

// Connect to MongoDB database
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"]
};

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors(corsOpts));
    app.use("/api", routes); // new

    app.listen(port || 5000, () => {
      console.log("Server has started!");
    });
  });
