import React, { useState } from "react";
import { toast } from "react-toastify";
import FormModal from "../../form-modal/FormModal";
import { useDispatch } from "react-redux";

import "./update-post.css";
import { updateSinglePost } from "../../../redux/apiCalls/postApiCall";

const UpdatePost = ({ modalToggle, singlePost }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(singlePost?.title);
  const [category, setCategory] = useState(singlePost?.category);
  const [description, setDescription] = useState(singlePost?.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (description.trim() === "")
      return toast.error("Post description is required");

    dispatch(
      updateSinglePost({ title, category, description }, singlePost?._id)
    );
    modalToggle();
  };

  return (
    <div className="form-modal-parent">
      <FormModal
        title="Update Your Post"
        onSubmitHandler={handleSubmit}
        textInputs={[
          {
            type: "text",
            placeHolder: "Post Title",
            value: title,
            onChangeHandler: (e) => {
              setTitle(e.target.value);
            },
          },
        ]}
        //

        showOptions={{
          optionValue: category,
          onChangeOptions: (e) => setCategory(e.target.value),
          options: ["Music", "Dreams"],
        }}
        //

        showTextArea={{
          textAreaPlaceHolder: "Post Description",
          textAreaValue: description,
          textAreaOnChange: (e) => setDescription(e.target.value),
        }}
        //

        modalToggleHandler={modalToggle}
        //

        btnSubmitTxt="Update Post"
      />
    </div>
  );
};

export default UpdatePost;
