const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");
const { User, validateUpdateUser } = require("../models/User");

// @desc    Get All users
// @path    /api/users
// @method  GET
// @privacy Private (only admin)
const getAllUsersCtrl = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// @desc    Get user by ID
// @path    /api/users/profile/:id
// @method  GET
// @privacy public
const getUserByIdCtrl = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    return res.status(400).json({ message: "there is no user with this id" });
  }
  try {
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update User
// @path    /api/users/profile/:id
// @method  PUT
// @privacy private (only user himself)
const updateUserCtrl = async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      req.body.password = hashedPassword;
    }

    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          password: req.body.password,
        },
      },
      { new: true }
    );

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

// @desc    Get count Users
// @path    /api/users/count
// @method  GET
// @privacy private (only admin)

async function getUsersCountCtrl(req, res) {
  try {
    const usersCount = await User.count();

    res.status(200).json(usersCount);
  } catch (error) {
    console.log(error);
  }
}

// @desc    Upload Profile Photo
// @path    /api/users/upload-profile-photo
// @method  POST
// @privacy private (only logged in user)

async function uploadProfilePhotoCtrl(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No File Provided" });
  }

  try {
    const user = await User.findById(req.user.id);

    user.profilePhoto = {
      url: req.file.path,
      publicId: "123456",
    };

    await user.save();

    res.status(200).json({
      message: "Profile Photo Uploaded Successfully, Refresh Page",
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete User Profile
// @path    /api/users/profile/:id
// @method  DELETE
// @privacy private (only admin OR user himself)

async function deleteUserProfileCtrl(req, res) {
  try {
    // 1- Get The User From DB
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // 2- Get all posts from DB
    const posts = await Post.find({ user: user._id });

    // 3- Delete all posts image from server that belongs to this user
    posts.map((post) => {
      if (post.image.url.includes(`${user._id}`)) {
        fs.unlinkSync(`${post.image.url}`);
      }
    });

    // 4- Delete the profile picture from server
    if (!user.profilePhoto.url.includes("../images/avatar")) {
      fs.unlinkSync(`${user.profilePhoto.url}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }

    // 5- Delete User posts&comments
    await Post.deleteMany({ user: user._id });
    await Comment.deleteMany({ user: user._id });

    // 6- Delete the user himself
    await User.findByIdAndDelete(req.params.id);

    // 7- Send a response to the client
    res.status(200).json({ message: "your profile has been deleted" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsersCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
  getUsersCountCtrl,
  uploadProfilePhotoCtrl,
  deleteUserProfileCtrl,
};
