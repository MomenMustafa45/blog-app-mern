import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// get posts
export function getPosts(pageNum) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNum}`);

      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

// Get Posts Count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/posts/count");

      dispatch(postActions.setpostsCount(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post("/api/posts/create-post", newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearIsPostCreated());
      }, 2000);
    } catch (error) {
      console.log(error.response);
      dispatch(postActions.clearIsPostCreated());
    }
  };
}

// Get Single Post details
export function getSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.setSinglePost(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

// toggle like
export function toggleLike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setLike(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// update Post

export function updateSinglePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setSinglePost(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// Delete Post

export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };
}

// Add Comment Post

export function addCommentPost(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comment", newComment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.addCommentPost(data));
    } catch (error) {
      console.log(error.response);
    }
  };
}

// Delete Comment Post
export function deleteCommentPost(commentId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/comment/${commentId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postActions.deleteCommentPost(commentId));
      toast.success(data.message);
    } catch (error) {
      console.log(error.response);
    }
  };
}

// Update Comment Post
export function updateCommentPost(commentId, newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comment/${commentId}`,
        newComment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.updateCommentPost(data));
      toast.success("Comment Updated Successfully");
    } catch (error) {
      console.log(error.response);
    }
  };
}
