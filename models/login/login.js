const express = require("express");
// const router = require("../../routes");
const loginRouter = express.Router();
const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  username: String,
  password: String
});

// const SigninModel = mongoose.model("signin", signinSchema);

const LoginModel = mongoose.model("login", loginSchema);
loginRouter.get("/signin", async (req, res) => {
  //   console.log(req.path);
  const findUser = await LoginModel.findOne({
    username: req.query.username,
    password: req.query.password
  });
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // console.log(posts);
  if (findUser) {
    res.send({ isSuccess: true });
  } else {
    res.send({
      error: "not found",
      message: "نام کاربری یا پسورد اشتباه است."
    });
  }
});

loginRouter.post("/signup", async (req, res) => {
  //   console.log(req.path);
  const setUser = new LoginModel({
    username: req.query.username,
    password: req.query.password
  });
  await setUser
    .save()
    .then(() => {
      res.send({ isSucces: true, message: "ثبت نام با موفقیت انجام شد." });
    })
    .catch(() => {
      res.send({ isSucces: false, message: "عملیات ثبت نام با خطا مواجه شد." });
    });
});

// const SignupModel = mongoose.model("signup", signupSchema);

// loginRouter.post("/signup", async (req, res) => {
//   //   console.log(req.path);
//   const signup = new SignupModel({
//     username: req.query.username,
//     password: req.query.password
//   });
//   signup
//     .save()
//     .then(() => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//       res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//       res.setHeader("Access-Control-Allow-Credentials", true);
//       res.send({ message: "service added one " });
//     })
//     .catch(() => res.send({ message: "operation with error" }));
//   //   const posts = await SignupModel.save({
//   //     username: req.query.username,
//   //     password: req.query.password
//   //   });
//   //   res.setHeader("Access-Control-Allow-Origin", "*");
//   //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   //   res.setHeader("Access-Control-Allow-Credentials", true);
//   //   if (posts) {
//   //     res.send(posts);
//   //   } else {
//   //     res.send({
//   //       error: "not found",
//   //       message: "نام کاربری یا پسورد اشتباه است."
//   //     });
//   //   }
// });

module.exports = loginRouter;

