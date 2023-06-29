const {
  validateCreateComment,
  Comment,
  validateUpdateComment,
} = require("../models/Comment");
const { User } = require("../models/User");

// @desc    Create Comment
// @path    /api/comment/
// @method  POST
// @privacy private (logged in user)
async function createCommentCtrl(req, res) {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const profile = await User.findById(req.user.id);

    const comment = new Comment({
      postID: req.body.postID,
      user: req.user.id,
      userName: profile.userName,
      text: req.body.text,
    });

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get All Comments
// @path    /api/comment
// @method  GET
// @privacy private (Only Admin)
async function getAllCommentCtrl(req, res) {
  try {
    const comments = await Comment.find().populate("user");

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete Comment
// @path    /api/comment/:id
// @method  DELETE
// @privacy private (Only Admin or OWNER of the comment)
async function deleteCommentCtrl(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(400).json({ message: "NO Comment with this ID" });
    }

    if (req.user.id === comment.user.toString() || req.user.isAdmin) {
      await Comment.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "Comment has been deleted Successfully" });
    } else {
      res.status(403).json({
        message: "Access Denied, only Admin or owner of comment can delete it",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update Comment
// @path    /api/comment/:id
// @method  PUT
// @privacy private (Only OWNER of the comment)
async function updateCommentCtrl(req, res) {
  const { error } = validateUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({ message: "Comment Not Found" });
    }

    if (req.user.id !== comment.user.toString()) {
      return res
        .status(403)
        .json({ message: "You Can't Update Comment not yours" });
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
          },
        },
        { new: true }
      );

      res.status(200).json(updatedComment);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createCommentCtrl,
  getAllCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
