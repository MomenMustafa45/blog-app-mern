const mongoose = require("mongoose");
const joi = require("joi");

const commentSchema = new mongoose.Schema(
  {
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating Model in DB
const Comment = mongoose.model("comment", commentSchema);

// Validate Create Comment
function validateCreateComment(obj) {
  const schema = joi.object({
    postID: joi.string().required(),
    text: joi.string().required(),
  });

  return schema.validate(obj);
}

// Validate Update Comment
function validateUpdateComment(obj) {
  const schema = joi.object({
    text: joi.string().required(),
  });

  return schema.validate(obj);
}

module.exports = {
  validateCreateComment,
  validateUpdateComment,
  Comment,
};
