const mongoose = require("mongoose");
const joi = require("joi");

// Post Schema
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// relation with comments
PostSchema.virtual("comment", {
  ref: "comment",
  foreignField: "postID",
  localField: "_id",
});

// Post Model
const Post = mongoose.model("post", PostSchema);

// Validate Create Post
function validateCreatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(2).max(200).required(),
    description: joi.string().trim().min(10).required(),
    category: joi.string().required(),
  });

  return schema.validate(obj);
}

// Validate Update Post
function validateUpdatePost(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(2).max(200),
    description: joi.string().trim().min(10),
    category: joi.string(),
  });

  return schema.validate(obj);
}

module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
