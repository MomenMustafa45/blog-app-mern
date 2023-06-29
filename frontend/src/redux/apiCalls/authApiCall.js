import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User

export function login(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.loginUser(data));
      localStorage.setItem("userItem", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}

// Logout

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(authActions.logoutUser());
      localStorage.removeItem("userItem");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Register User

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
