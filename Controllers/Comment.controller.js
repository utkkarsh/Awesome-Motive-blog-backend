// import user model
const Comment = require("../models/Comment.model");

const bcrypt = require("bcrypt");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createHttpError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

function nestComments(commentList) {
  const commentMap = {};

  // move all the comments into a map of id => comment
  commentList.forEach((comment) => (commentMap[comment._id] = comment));

  // iterate over the comments again and correctly nest the children
  commentList.forEach((comment) => {
    if (comment._parentId !== null) {
      const parent = commentMap[comment._parentId];
      (parent.children = parent.children || []).push(comment);
    }
  });

  // filter the list to return a list of correctly nested comments
  return commentList.filter((comment) => {
    return comment._parentId === null;
  });
}

exports.getFlatComments = async (req, res, next) => {
  try {
    let { postId } = req.params;

    const schema = Joi.object({
      postId: Joi.objectId().required(),
    });

    // if postId is incorrect or not given an error will be thrown
    const result = await schema.validateAsync({ postId });

    // Get all comments for a given post
    const comment = await Comment.find({ _postId: result.postId });
    if (!comment) throw createHttpError.NotFound("Comments Not Found!");
    res.send(comment);
  } catch (error) {
    if (error.isJoi === true)
      return next(createHttpError.BadRequest("Invalid PostId"));
    next(error);
  }
};

// logic to get the comments in nested-tree mode.
exports.getNestedComments = async (req, res, next) => {
  try {
    let { postId } = req.params;

    const schema = Joi.object({
      postId: Joi.objectId().required(),
    });

    // if postId is incorrect or not given an error will be thrown
    const result = await schema.validateAsync({ postId });

    // Get all comments for a given post
    const comment = await Comment.find({ _postId: result.postId })
      .sort({ postedDate: 1 })
      .lean()
      .exec();

    let nestedData = nestComments(comment);
    res.send(nestedData);
  } catch (error) {
    if (error.isJoi === true)
      return next(createHttpError.BadRequest("Invalid PostId"));
    next(error);
  }
};

// CREATE A NEW Comment
exports.create = async (req, res, next) => {
  let { user, comment, postId, parentId } = req.body;

  // Schema Validation of Parameters provided in problem statement
  const schema = Joi.object({
    user: Joi.string().trim().required(),
    comment: Joi.string().trim().required(),
    postId: Joi.objectId().required(),
    parentId: Joi.objectId(),
  });

  try {
    // Verify the Payload before processing it
    const result = await schema.validateAsync({ user, comment, postId });
    // Create a new comment
    const commentObj = new Comment({
      user: result.user,
      comment: result.comment,
      _postId: postId,
      _parentId: parentId ?? null,
    });
    // console.log(commentObj);

    // Save comment in the database
    const savedComment = await commentObj.save();
    // console.log(savedComment);

    res.send(savedComment);
  } catch (error) {
    next(error);
  }
};
