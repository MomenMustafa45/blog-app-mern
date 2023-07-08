import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCate: [],
    isloading: false,
    isPostCreated: false,
    singlePost: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setpostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setLoading(state) {
      state.isloading = true;
    },
    clearLoading(state) {
      state.isloading = false;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.isloading = false;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false;
    },
    setSinglePost(state, action) {
      state.singlePost = action.payload;
    },
    setLike(state, action) {
      state.singlePost.likes = action.payload.likes;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
    addCommentPost(state, action) {
      state.singlePost.comment.push(action.payload);
    },
    deleteCommentPost(state, action) {
      const comment = state.singlePost.comment.find(
        (c) => c._id === action.payload
      );
      const commentIndex = state.singlePost.comment.indexOf(comment);
      state.singlePost.comment.splice(commentIndex, 1);
    },
    updateCommentPost(state, action) {
      state.singlePost.comment.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
  },
});

const postActions = postSlice.actions;
const postReducer = postSlice.reducer;

export { postActions, postReducer };
