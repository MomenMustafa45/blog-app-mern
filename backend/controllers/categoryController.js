const { validateCreateCategory, Category } = require("../models/Category");

// @desc    Create New Category
// @path    /api/categories
// @method  POST
// @privacy private (Only Admin)
async function createCategoryCtrl(req, res) {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newCategory = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json(newCategory);
}

// @desc    Get all Categories
// @path    /api/categories
// @method  GET
// @privacy Public
async function getAllCategoriesCtrl(req, res) {
  const categories = await Category.find();

  res.status(200).json(categories);
}

// @desc    Delete Category
// @path    /api/categories/:id
// @method  DELETE
// @privacy Private (ONLY Admin)
async function deleteCategoryCtrl(req, res) {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(403).json({ message: "Category Not Found" });
  }

  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category has been deleted successfully" });
}

module.exports = {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  deleteCategoryCtrl,
};
