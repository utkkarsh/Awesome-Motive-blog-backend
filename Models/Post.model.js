const Mongoose = require("mongoose");

// Defining PostSchema for post creation and maintenance.
var postSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
    },

    body: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Post", postSchema);
