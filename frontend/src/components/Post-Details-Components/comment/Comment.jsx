import "./comment.css";
import image from "../../../images/testImage.jpg";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { deleteCommentPost } from "../../../redux/apiCalls/postApiCall";

const CommentList = ({
  modalToggle,
  commentUserName,
  commentText,
  commentUserId,
  commentDate,
  user,
  commentId,
}) => {
  const dispatch = useDispatch();

  const deleteCommentHandler = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this comment!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCommentPost(commentId));
      } else {
        swal(`Your comment is safe!`);
      }
    });
  };
  return (
    <div className="comment-parent">
      <div className="comment-container1">
        <div className="comment-userdetails">
          <div className="comment-userphoto">
            <img src={image} alt="Hello this is a profile pic" />
          </div>
          <p className="comment-username">{commentUserName}</p>
        </div>

        <p className="comment-date">{new Date(commentDate).toUTCString()}</p>
      </div>

      <div className="comment-container2">
        <div className="comment-text">
          <p>{commentText}</p>
        </div>
        <div className="comment-icons">
          {commentUserId === user && (
            <>
              <i
                className="bi bi-trash3-fill"
                onClick={(e) => deleteCommentHandler(e)}
              ></i>
              <i className="bi bi-pencil-square" onClick={modalToggle}></i>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
