const express = require("express");
// const router = require("../../routes");
const loginRouter = express.Router();
const LoginModel = require("./loginModels");

loginRouter.get("/signin", async (req, res) => {
  const findUser = await LoginModel.findOne({
    username: req.query.username,
    password: req.query.password
  });
  if (findUser) {
    res.send({ isSuccess: true, id: findUser.id });
  } else {
    res.send({
      isSuccess: false,
      error: "not found",
      message: "نام کاربری یا پسورد اشتباه است."
    });
  }
});

loginRouter.post("/signup", async (req, res) => {
  const findAllUsers = await LoginModel.find();
  const findUser = await LoginModel.findOne({
    username: req.query.username
  });
  const setUser = new LoginModel({
    username: req.query.username,
    password: req.query.password,
    id: findAllUsers.length
  });
  if (!findUser) {
    await setUser
      .save()
      .then(() => {
        res.send({ isSuccess: true, message: "ثبت نام با موفقیت انجام شد." });
      })
      .catch(() => {
        res.send({
          isSuccess: false,
          message: "عملیات ثبت نام با خطا مواجه شد."
        });
      });
  } else {
    res.send({ isSuccess: false, message: "کاربر قبلا ثبت نام کرداست. " });
  }
});

module.exports = loginRouter;
