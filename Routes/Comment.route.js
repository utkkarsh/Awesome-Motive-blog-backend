const express = require("express");
const router = express.Router();
const Comment = require("../Controllers/Comment.controller");

router.post("/", Comment.create);
router.get("/:postId", Comment.getFlatComments);
router.get("/nested/:postId", Comment.getNestedComments);

module.exports = router;
