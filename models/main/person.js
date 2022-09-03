const express = require("express");
// const router = require("../../routes");
const personRouter = express.Router();
const LoginModel = require("../login/loginModels");
const PersonModel = require("./personModel");
const ImageModel = require("./scanModel");

personRouter.post("/personData", async (req, res) => {
  const findUser = await LoginModel.findOne({
    id: req.query.id
  });
  const isSetFavoriteTeams = await PersonModel.findOne({
    id: req.query.id
  });
  if (findUser) {
    const personData = new PersonModel({
      name: req.query.name,
      favoriteTeams: req.query.favoriteTeams,
      id: findUser.id
    });
    if (isSetFavoriteTeams) {
      await PersonModel.updateOne(
        {
          id: findUser.id
        },
        { favoriteTeams: req.query.favoriteTeams, name: req.query.name }
      )
        .then(() => {
          res.send({ isSuccess: true, message: "ویرایش با موفقیت انجام شد." });
        })
        .catch(() =>
          res.send({ isSuccess: false, message: "عملیات با خطا مواجه شد." })
        );
    } else {
      await personData
        .save()
        .then(() => {
          res.send({ isSuccess: true });
        })
        .catch(() => {
          res.send({
            isSuccess: false,
            message: "عملیات خطا مواجه شد."
          });
        });
    }
  } else {
    res.send({ isSuccess: false, message: "عملیات با خطا مواجه شد" });
  }
});

personRouter.get("/personData", async (req, res) => {
  const findUser = await PersonModel.findOne({
    id: req.query.id
  });
  if (findUser) {
    res.send({
      name: findUser.name,
      favoriteTeams: findUser.favoriteTeams,
      id: findUser.id
    });
  } else {
    res.send({ name: null, favoriteTeams: null, id: req.query.id });
  }
});

personRouter.get("/peronData/scanQrCode", async (req, res) => {
  const getImage = await await ImageModel.findOne({
    imageId: req.imageId
  });
  console.log(getImage);
  if (getImage) {
    res.send({
      isSuccess: true,
      image: getImage.image
    });
  } else {
    res.send({ isSuccess: false, message: "عملیات با خطا مواجه شد." });
  }
});

// loginRouter.post("/signup", async (req, res) => {
//   const findUser = await LoginModel.findOne({
//     username: req.query.username
//   });

//   const setUser = new LoginModel({
//     username: req.query.username,
//     password: req.query.password
//   });
//   if (!findUser) {
//     await setUser
//       .save()
//       .then(() => {
//         res.send({ isSuccess: true, message: "ثبت نام با موفقیت انجام شد." });
//       })
//       .catch(() => {
//         res.send({
//           isSuccess: false,
//           message: "عملیات ثبت نام با خطا مواجه شد."
//         });
//       });
//   } else {
//     res.send({ isSuccess: false, message: "کاربر قبلا ثبت نام کرداست. " });
//   }
// });

module.exports = personRouter;
