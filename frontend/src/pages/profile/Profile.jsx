import React from "react";
import { useState } from "react";
import PostCard from "../../components/post-card/PostCard";
import swal from "sweetalert";
import FormModal from "../../components/form-modal/FormModal";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  updateProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [userName, setUserName] = useState(profile?.userName);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Upload Profile photo
  const uploadProfilePhotoHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.error("File is required");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  // Getting right route for img
  const profilePhotoPath =
    "http://localhost:8000/" +
    profile?.profilePhoto?.url?.slice(
      profile?.profilePhoto?.url?.indexOf("images")
    );

  // Delete profile
  const deleteProfileHandler = () => {
    swal({
      title: "Are You Sure?",
      text: "once deleting your account, it can't be recovered again",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof, Your Account has been deleted", {
          icon: "success",
        });
      } else {
        swal("Your account is safe");
      }
    });
  };

  // On submit UpateProfileHandler
  // On submit UpateProfileHandler
  const submitUpdateHandler = (e) => {
    e.preventDefault();
    if (userName?.length === 0 || !userName)
      return toast.error("userName is required");
    const updatedProfile = {
      userName,
    };
    if (password) {
      updatedProfile.password = password;
    }

    dispatch(updateProfile(profile?.id, updatedProfile));
    toast.success("Profile Updated Successfully");
    setUpdateProfileModal(false);
  };
  // On submit UpateProfileHandler
  // On submit UpateProfileHandler

  return (
    <div className="profile-parent">
      <div className="person-profile-container">
        <div className="img-container">
          <img src={`${profilePhotoPath}`} alt="this is img" />
          {user?._id === id && (
            <form className="icon-img" onSubmit={uploadProfilePhotoHandler}>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />{" "}
              <button className="btn-upload-photo">Upload</button>
            </form>
          )}
        </div>

        <h3 className="person-name">{profile?.userName}</h3>

        <p className="person-date">
          Date Joined:{" "}
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </p>

        {user?._id === id && (
          <button
            className="update-btn"
            onClick={() => setUpdateProfileModal((prev) => !prev)}
          >
            Update Profile
          </button>
        )}
      </div>

      <div className="person-posts-conatainer">
        <h1>{profile?.userName} Posts</h1>
        {profile?.posts?.map((post, indx) => (
          <PostCard
            fromPage={true}
            key={indx}
            postTitle={post.title}
            postCategory={post.category}
            postDescription={post.description}
            postDate={post.createdAt}
            postId={post._id}
            postImg={post.image.url}
          />
        ))}
      </div>

      {user?._id === id && (
        <div className="delete-acc-parent">
          <button className="delete-acc-btn" onClick={deleteProfileHandler}>
            Delete Account
          </button>
        </div>
      )}

      {/* Update Form Modal */}
      {/* Update Form Modal */}
      {updateProfileModal && (
        <div className="form-modal-parent">
          <FormModal
            textInputs={[
              {
                type: "text",
                placeHolder: "UserName",
                value: userName,
                onChangeHandler: (e) => {
                  setUserName(e.target.value);
                },
              },
              {
                type: "password",
                placeHolder: "New Password",
                value: password,
                onChangeHandler: (e) => setPassword(e.target.value),
              },
            ]}
            btnSubmitTxt="Update Profile"
            modalToggleHandler={() => setUpdateProfileModal((prev) => !prev)}
            title="Update Profile"
            onSubmitHandler={submitUpdateHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
