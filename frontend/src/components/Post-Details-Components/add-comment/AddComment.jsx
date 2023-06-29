import "./add-comment.css";
import React from "react";
import { useState } from "react";

const AddComment = () => {
  const [commentText, setCommentText] = useState("");

  return (
    <form className="add-comment-parent">
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
