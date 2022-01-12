const Mongoose = require("mongoose");

// Defining PostSchema for comment creation and maintenance.
var commentSchema = new Mongoose.Schema(
  {
    _postId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "postId",
    },

    _parentId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "parentId",
    },

    user: { type: String },

    comment: {
      type: String,
      required: true,
    },

    depth: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Comment", commentSchema);
