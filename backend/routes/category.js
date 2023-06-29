const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryController");
const { verifyObjectId } = require("../middlewares/verifyObjectID");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/categories
router
  .route("/")
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoriesCtrl);

// api/categories/:id
router
  .route("/:id")
  .delete(verifyObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

module.exports = router;
