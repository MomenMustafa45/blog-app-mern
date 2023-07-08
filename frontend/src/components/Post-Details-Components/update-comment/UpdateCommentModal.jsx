import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCommentPost } from "../../../redux/apiCalls/postApiCall";
import FormModal from "../../form-modal/FormModal";
import "./update-comment-modal.css";

const UpdateCommentModal = ({ modalToggle, commentId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const updateCommentHandler = (e) => {
    e.preventDefault();
    if (text.length === 0) return toast.error("text is rqeuired");
    dispatch(updateCommentPost(commentId, { text }));
    modalToggle();
  };

  return (
    <div className="form-modal-parent">
      <FormModal
        title="Update Your Comment"
        textInputs={[
          {
            type: "text",
            placeHolder: "New Comment",
            value: text,
            onChangeHandler: (e) => {
              setText(e.target.value);
            },
          },
        ]}
        btnSubmitTxt="Update Comment"
        modalToggleHandler={modalToggle}
        onSubmitHandler={updateCommentHandler}
      />
    </div>
  );
};

export default UpdateCommentModal;
