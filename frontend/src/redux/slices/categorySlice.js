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
  },
});

const categoryActions = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export { categoryReducer, categoryActions };
