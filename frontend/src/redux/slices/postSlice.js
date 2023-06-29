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
  },
});

const postActions = postSlice.actions;
const postReducer = postSlice.reducer;

export { postActions, postReducer };
