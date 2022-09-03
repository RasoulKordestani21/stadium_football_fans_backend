const express = require("express");
// const Post = require("./models/Post"); // new
const loginRouter = require("./models/login/login");
const personRouter = require("./models/main/person");
const router = express.Router();

router.use("/", personRouter);
router.use("/", loginRouter);

// router.post("/posts", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   console.log(req.query);
//   const post = new Post({
//     username: req.query.username,
//     password: req.query.password
//   });
//   await post.save();
//   res.send(post);
// });

module.exports = router;
