const mongoose = require("mongoose");
const joi = require("joi");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Category Model
const Category = mongoose.model("category", CategorySchema);

// Validate Create Category
function validateCreateCategory(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
  });

  return schema.validate(obj);
}

module.exports = {
  Category,
  validateCreateCategory,
};
