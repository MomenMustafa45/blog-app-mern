import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategory(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const categoryActions = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export { categoryReducer, categoryActions };
