const express = require("express");
const router = express.Router();
const Post = require("../Controllers/Post.controller");

router.post("/", Post.create);
router.get("/", Post.get);
router.get("/:postId", Post.getPost);

module.exports = router;
