const express = require("express");
const Post = require("./models/Post"); // new
const router = express.Router();

// Get all posts
router.get("/posts", async (req, res) => {
  const posts = await Post.findOne({
    username: req.query.username,
    password: req.query.password
  });
  if (posts) {
    res.send(posts);
  } else {
    res.send({
      error: "not found",
      message: "نام کاربری یا پسورد اشتباه است."
    });
  }
});

router.post("/posts", async (req, res) => {
  console.log(req.query);
  const post = new Post({
    username: req.query.username,
    password: req.query.password
  });
  await post.save();
  res.send(post);
});

module.exports = router;
