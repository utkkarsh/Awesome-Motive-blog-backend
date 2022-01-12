const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
var cors = require("cors");

// Manage environment files and environment variables
require("dotenv").config();
// const { verifyAccessToken } = require("./helpers/jwt_helper");

// Initialize express app
const app = express();

// API Logging
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route Handling
const PostRoute = require("./Routes/Post.route");
const CommentRoute = require("./Routes/Comment.route");

app.use("/comments", CommentRoute);
app.use("/posts", PostRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

// Error Handler
app.use((error, req, res, next) => {
  // Set error status on request
  if (error.isJoi === true) error.status = 422;
  res.status(error.status);

  res.send({
    error: {
      status: error.status,
      message: error.message,
      // stack: process.env.NODE_ENV === "prod" ? "" : error.stack,
    },
  });
});

module.exports = app;
