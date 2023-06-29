import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userItem")
      ? JSON.parse(localStorage.getItem("userItem"))
      : null,
    messageRegister: null,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
    register(state, action) {
      state.messageRegister = action.payload;
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto.url = action.payload;
    },
    setUsername(state, action) {
      state.user.userName = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
