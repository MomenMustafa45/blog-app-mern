const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 150,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate posts that belong to this user
userSchema.virtual("posts", {
  ref: "post",
  foreignField: "user",
  localField: "_id",
});

// generating Token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRETKEY
  );
};

// DB Model
const User = mongoose.model("User", userSchema);

// validation register
function validationRegister(obj) {
  const schema = joi.object({
    userName: joi.string().min(3).max(100).trim().required(),
    email: joi.string().min(5).max(150).trim().required().email(),
    password: joi.string().min(8).trim().required(),
  });

  return schema.validate(obj);
}

// validate Login User
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().min(5).max(150).trim().required().email(),
    password: joi.string().min(8).trim().required(),
  });

  return schema.validate(obj);
}

// Validation Update User
function validateUpdateUser(obj) {
  const schema = joi.object({
    userName: joi.string().min(3).max(100).trim(),
    password: joi.string().min(8).trim(),
    bio: joi.string(),
  });

  return schema.validate(obj);
}

module.exports = {
  User,
  validationRegister,
  validateLoginUser,
  validateUpdateUser,
};
