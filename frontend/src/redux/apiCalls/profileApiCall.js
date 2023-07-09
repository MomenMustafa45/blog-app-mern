import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice";

// user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(userPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "api/users/profile/upload-profile-photo",
        userPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
          "Content-Type": "multipart/form-data",
        }
      );

      dispatch(profileActions.uploadProfilePhoto(data.user.profilePhoto));
      toast.success(data.message);

      // Modify the user in localstorage with new photo
      const user = JSON.parse(localStorage.getItem("userItem"));
      user.profilePhoto = data?.user.profilePhoto;
      localStorage.setItem("userItem", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Profile
export function updateProfile(id, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`api/users/profile/${id}`, profile, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.userName));

      // Modify the user in localstorage with new photo
      const user = JSON.parse(localStorage.getItem("userItem"));
      user.userName = data?.userName;
      localStorage.setItem("userItem", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response);
    }
  };
}

// Delete Profile
export function deleteProfile(profileId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${profileId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setIsProfileDeleted(profileId));
      toast.success(data);
      setTimeout(() => {
        dispatch(profileActions.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get all profiles
export function getAllProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/profile", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

// Get profiles Count

export function getProfilesCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/count", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setProfileCount(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}
