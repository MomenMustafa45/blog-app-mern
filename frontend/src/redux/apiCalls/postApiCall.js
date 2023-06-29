import { postActions } from "../slices/postSlice";
import request from "../../utils/request";

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
