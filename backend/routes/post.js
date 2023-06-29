const express = require("express");
const router = express.Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getPostByIdCtrl,
  getPostsCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updateImagePostCtrl,
  toggleLikesCtrl,
} = require("../controllers/postController");
const { uploadPhoto } = require("../middlewares/uploadProfilePhoto");
const { verifyObjectId } = require("../middlewares/verifyObjectID");
const { verifyToken } = require("../middlewares/verifyToken");

// api/posts/create-post
router.post(
  "/create-post",
  verifyToken,
  uploadPhoto.single("image"),
  createPostCtrl
);

// api/posts
router.get("/", getAllPostsCtrl);

// api/posts/count
router.get("/count", getPostsCountCtrl);

// api/posts/:id
router
  .route("/:id")
  .get(getPostByIdCtrl)
  .delete(verifyObjectId, verifyToken, deletePostCtrl)
  .put(verifyObjectId, verifyToken, updatePostCtrl);

// api/posts/update-image/:id
router.put(
  "/update-image/:id",
  verifyObjectId,
  verifyToken,
  uploadPhoto.single("image"),
  updateImagePostCtrl
);

// api/posts/like/:id
router.put("/likes/:id", verifyObjectId, verifyToken, toggleLikesCtrl);

module.exports = router;
