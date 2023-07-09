const fs = require("fs");
const { Comment } = require("../models/Comment");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");

// @desc    Create A new Post
// @path    /api/posts/create-post
// @method  POST
// @access  public

async function createPostCtrl(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No Image Uploaded" });
  }

  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.user.id,
      image: {
        url: req.file.path,
        publicId: "123456",
      },
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get All Posts
// @path    /api/posts
// @method  GET
// @access  public

async function getAllPostsCtrl(req, res) {
  try {
    const POSTS_PER_PAGE = 3;
    const { pageNumber, category } = req.query;
    let posts;

    if (pageNumber) {
      posts = await Post.find()
        .skip((pageNumber - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    } else if (category) {
      posts = await Post.find({ category })
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    } else {
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get Post By ID
// @path    /api/posts/:id
// @method  GET
// @access  public
async function getPostByIdCtrl(req, res) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", ["-password"])
      .populate("comment");

    if (!post) {
      return res.status(400).json({ message: "Post Not Found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get Posts Count
// @path    /api/posts/count
// @method  GET
// @access  public
async function getPostsCountCtrl(req, res) {
  const countPosts = await Post.count();

  res.status(200).json(countPosts);
}

// @desc    Delete Post
// @path    /api/posts/:id
// @method  DELETE
// @access  Private (Only ADMIN or owner of post)
async function deletePostCtrl(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ message: "Post Not Found" });
  }
  if (req.user.id === post.user.toString() || req.user.isAdmin) {
    await Post.findByIdAndDelete(req.params.id);

    fs.unlinkSync(`${post.image.url}`, (err) => {
      console.log(err);
    });

    // Delete All Comments that belongs to this Post
    await Comment.deleteMany({ postID: post._id });

    res
      .status(200)
      .json({ message: "Post Deleted Successfully", postId: post._id });
  } else {
    return res.status(403).json({
      message: "Access Denied, Only Admin or Owner of post can delete!",
    });
  }
}

// @desc    Update Post
// @path    /api/posts/:id
// @method  PUT
// @access  Private (Only owner of post)
async function updatePostCtrl(req, res) {
  // 1. validation
  const { error } = validateUpdatePost(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2. validation post if exist or not
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Post Not Found" });
  }

  // 3. check the post, it belongs to the user or not
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "You're not allowed to update posts not yours" });
  }

  // 4. Update the post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  );

  // send a message to the client
  res.status(200).json({ message: "Post Updated Successfully", updatedPost });
}

// @desc    Update Image Post
// @path    /api/posts/update-image/:id
// @method  PUT
// @access  Private (Only owner of post)
async function updateImagePostCtrl(req, res) {
  // 1. check the image if uploaded or not
  if (!req.file) {
    return res.status(400).json({ message: "No Image Provided" });
  }

  // 2. validation post if exist or not
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Post Not Found" });
  }

  // 3. check the post, it belongs to the user or not
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "You're not allowed to update posts not yours" });
  }

  // 4. Delete the image from the server
  fs.unlinkSync(`${post.image.url}`, (err) => {
    console.log(err);
  });

  // 5. update the image from the post(DB)
  const updatedImagePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: req.file.path,
          publicId: post.image.publicId,
        },
      },
    },
    { new: true }
  );

  // send a message to the client
  res
    .status(200)
    .json({ message: "Image Updated Successfully", updatedImagePost });
}

// @desc    Toggle Likes
// @path    /api/posts/likes/:id
// @method  PUT
// @access  Private (ONLY logged in user)
async function toggleLikesCtrl(req, res) {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Post Not Found" });
  }

  try {
    let isPostLikedByUser = post.likes.find(
      (user) => user.toString() === req.user.id
    );

    if (isPostLikedByUser) {
      post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.user.id },
        },
        { new: true }
      );
    } else {
      post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.user.id },
        },
        { new: true }
      );
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createPostCtrl,
  getAllPostsCtrl,
  getPostByIdCtrl,
  getPostsCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updateImagePostCtrl,
  toggleLikesCtrl,
};
