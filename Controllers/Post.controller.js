// import user model
const Post = require("../Models/Post.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const createHttpError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
Joi.objectId = require("joi-objectid")(Joi);

// retrieve a specific user using the user id (in our case, the user from the jwt)
exports.get = async (req, res, next) => {
  try {
    const post = await Post.find();
    if (!post) throw createHttpError.NotFound("Posts Not Found!");
    res.send(post);
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    let { postId } = req.params;

    const schema = Joi.object({
      postId: Joi.objectId().required(),
    });

    // if postId is incorrect or not given an error will be thrown
    const result = await schema.validateAsync({ postId });
    // Get all comments for a given post
    const post = await Post.find({ _id: result.postId });
    if (!post || post.length == 0)
      throw createHttpError.NotFound("Posts Not Found!");
    res.send(post);
  } catch (error) {
    if (error.isJoi === true)
      return next(createHttpError.BadRequest("Invalid PostId"));
    next(error);
  }
};

// CREATE A NEW POST
exports.create = async (req, res, next) => {
  let { title, content } = req.body;

  // Schema Validation of Parameters provided in problem statement
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  });

  try {
    // Verify the Payload before processing it
    const result = await schema.validateAsync({ title, content });

    // Check if post already in database
    const postExists = await Post.findOne({ title: result.title });
    if (postExists) throw createHttpError.Conflict(`Post already exists.`);

    // Create a new post
    const post = new Post({
      title: result.title,
      body: result.content,
    });

    // Save post in the database
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (error) {
    next(error);
  }
};
