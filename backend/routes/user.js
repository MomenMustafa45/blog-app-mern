const express = require("express");
const {
  getAllUsersCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
  getUsersCountCtrl,
  uploadProfilePhotoCtrl,
  deleteUserProfileCtrl,
} = require("../controllers/userController");
const { uploadPhoto } = require("../middlewares/uploadProfilePhoto");
const { verifyObjectId } = require("../middlewares/verifyObjectID");
const {
  verifyTokenAndAdmin,
  verifyOnlyUser,
  verifyToken,
  verifyOnlyUserOrAdmin,
} = require("../middlewares/verifyToken");

const router = express.Router();

// api/users/profile
router.get("/profile", verifyTokenAndAdmin, getAllUsersCtrl);

// api/users/profile/:id (Get User, Update User, Delete User)
router
  .route("/profile/:id")
  .get(verifyObjectId, getUserByIdCtrl)
  .put(verifyObjectId, verifyOnlyUser, updateUserCtrl)
  .delete(verifyObjectId, verifyOnlyUserOrAdmin, deleteUserProfileCtrl);

// api/users/count
router.get("/count", verifyTokenAndAdmin, getUsersCountCtrl);

// api/users/profile/upload-profile-photo
router
  .route("/profile/upload-profile-photo")
  .post(verifyToken, uploadPhoto.single("image"), uploadProfilePhotoCtrl);

module.exports = router;
