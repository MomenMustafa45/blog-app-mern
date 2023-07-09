import { toast } from "react-toastify";
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

// Create Category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("Category Created Successfully");
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

// Delete Category

export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(categoryActions.deleteCategory(categoryId));
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  };
}
