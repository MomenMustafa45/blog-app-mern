import "./add-comment.css";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCommentPost } from "../../../redux/apiCalls/postApiCall";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    if (commentText.length === 0) return toast.error("Comment can't be empty");

    dispatch(addCommentPost({ postID: postId, text: commentText }));
    setCommentText("");
  };

  return (
    <form
      className="add-comment-parent"
      onSubmit={(e) => commentSubmitHandler(e)}
    >
      <input
        type="text"
        placeholder="Add Comment"
        className="create-post-input"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit" className="create-post-btn">
        ADD
      </button>
    </form>
  );
};

export default AddComment;
