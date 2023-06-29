import request from "../../utils/request";
import { categoryActions } from "../slices/categorySlice";

// get categories
export function getCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategory(data));
    } catch (error) {
      console.log(error);
    }
  };
}
