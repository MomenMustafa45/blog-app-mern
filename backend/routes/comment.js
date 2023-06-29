const router = require("express").Router();

const {
  createCommentCtrl,
  getAllCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../controllers/commentController");
const { verifyObjectId } = require("../middlewares/verifyObjectID");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

// api/comment
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentCtrl);

// api/comment/:id
router
  .route("/:id")
  .delete(verifyObjectId, verifyToken, deleteCommentCtrl)
  .put(verifyObjectId, verifyToken, updateCommentCtrl);

module.exports = router;
