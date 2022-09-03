const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  username: String,
  password: String,
  id: String
});

const LoginModel = mongoose.model("login", loginSchema);

module.exports = LoginModel
