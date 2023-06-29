import "./comment.css";
import image from "../../../images/testImage.jpg";

const CommentList = ({
  deleteHandler,
  modalToggle,
  commentUserName,
  commentText,
  commentUserId,
}) => {
  return (
    <div className="comment-parent">
      <div className="comment-container1">
        <div className="comment-userdetails">
          <div className="comment-userphoto">
            <img src={image} alt="Hello this is a profile pic" />
          </div>
          <p className="comment-username">{commentUserName}</p>
        </div>

        <p className="comment-date">20/35/2021</p>
      </div>

      <div className="comment-container2">
        <div className="comment-text">
          <p>{commentText}</p>
        </div>
        <div className="comment-icons">
          <i
            className="bi bi-trash3-fill"
            onClick={() => deleteHandler("Comment")}
          ></i>
          <i className="bi bi-pencil-square" onClick={modalToggle}></i>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
