import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  deletePost,
  getSinglePost,
  toggleLike,
} from "../../redux/apiCalls/postApiCall";
import "./post-details.css";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import Comment from "../../components/Post-Details-Components/comment/Comment";
import AddComment from "../../components/Post-Details-Components/add-comment/AddComment";
import UpdatePost from "../../components/Post-Details-Components/update-post/UpdatePost";
import UpdateCommentModal from "../../components/Post-Details-Components/update-comment/UpdateCommentModal";

const PostDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singlePost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  // const [file, setFile] = useState(null);
  const [toggleComments, setToggleComments] = useState(false);
  const [updatePostModal, setUpdatePostModal] = useState(false);
  const [updateCommentModal, setUpdateCommentModal] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSinglePost(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, singlePost]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GETTING server ROUTE FOR IMAGES
  // GETTING server ROUTE FOR IMAGES
  const postPhotoRoute =
    "http://localhost:8000/" +
    singlePost?.image?.url?.slice(singlePost?.image?.url?.indexOf("images"));

  const postOwnerPhotoRoute =
    "http://localhost:8000/" +
    singlePost?.user?.profilePhoto?.url?.slice(
      singlePost?.user?.profilePhoto?.url?.indexOf("images")
    );

  // Updating Post
  // Updating Post
  const updatePostToggleHandler = () => {
    setUpdatePostModal((prev) => !prev);
  };
  const updateCommentToggleHandler = (commentId) => {
    setUpdateCommentModal((prev) => !prev);
    setCommentId(commentId);
  };

  // const updateImageHandler = (e) => {
  //   e.preventDefault();

  //   if (!file) {
  //     console.log("There is no file!");
  //     return;
  //   }

  //   console.log("imgage Uploaded successfully");
  // };

  // toggle Comments list
  // toggle Comments list
  const commentsToggleHandler = () => {
    setToggleComments((prev) => !prev);
  };

  // swal sweetalert for deleting Post and comment
  // swal sweetalert for deleting Post and comment
  const deletePostHandler = (type) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this ${type}!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(singlePost?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        swal(`Your ${type} is safe!`);
      }
    });
  };

  return (
    <section className="post-details-parent">
      <div className="card">
        <div className="thumbnail">
          <img className="left" src={postPhotoRoute} alt="This is a phot" />
        </div>

        <div className="right">
          <h1 className="post-details-h1">{singlePost?.title}</h1>
          <div className="author">
            <img src={postOwnerPhotoRoute} alt="HEY" />
            <Link
              to={`/profile/${singlePost?.user?._id}`}
              className="post-details-h2"
            >
              {singlePost?.user?.userName}
            </Link>
          </div>
          <div className="separator"></div>
          <p className="post-details-p">{singlePost?.description}</p>

          <ul className="post-icons">
            <li onClick={commentsToggleHandler}>
              <i className="bi bi-chat-left-text"></i>
              {singlePost?.comment?.length} Comments
            </li>
            <li onClick={() => dispatch(toggleLike(singlePost?._id))}>
              <i
                className={
                  singlePost?.likes?.includes(user?._id)
                    ? "bi bi-heart-fill"
                    : "bi bi-heart"
                }
              ></i>
              {singlePost?.likes?.length} Likes
            </li>

            {user?._id === singlePost?.user?._id && (
              <>
                <li onClick={updatePostToggleHandler}>
                  <i className="bi bi-pencil-square"></i>
                  Edit Post
                </li>
                <li onClick={() => deletePostHandler("post")}>
                  <i className="bi bi-trash3-fill"></i>
                  Delete Post
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Comments Part */}
        {/* Comments Part */}

        <div
          className="comments-list"
          style={toggleComments ? { height: "auto" } : { height: "0" }}
        >
          {user ? (
            <AddComment postId={singlePost?._id} userId={user?._id} />
          ) : (
            <p>To Write A Comment Log In First</p>
          )}
          {singlePost?.comment?.map((comment) => (
            <Comment
              commentText={comment.text}
              commentUserId={comment.user}
              commentUserName={comment.userName}
              modalToggle={() => updateCommentToggleHandler(comment._id)}
              key={comment._id}
              commentDate={comment.createdAt}
              user={user?._id}
              commentId={comment._id}
            />
          ))}
        </div>
        <h5 className="post-details-h5">
          {new Date(singlePost?.createdAt).getDate()}
        </h5>
        <h6 className="post-details-h6">
          {new Date(singlePost?.createdAt).toDateString()}
        </h6>
      </div>
      {updatePostModal && (
        <UpdatePost
          modalToggle={updatePostToggleHandler}
          singlePost={singlePost}
        />
      )}
      {updateCommentModal && (
        <UpdateCommentModal
          modalToggle={updateCommentToggleHandler}
          commentId={commentId}
        />
      )}
    </section>
  );
};

export default PostDetails;
