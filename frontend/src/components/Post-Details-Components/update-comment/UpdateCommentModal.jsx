import React, { useState } from "react";
import { toast } from "react-toastify";
import FormModal from "../../form-modal/FormModal";
import "./update-comment-modal.css";

const UpdateCommentModal = ({ modalToggle }) => {
  const [text, setText] = useState("");

  const updateCommentHandler = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      return toast.error("text is rqeuired");
    }
    console.log("comment updated");
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
              console.log(text);
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
