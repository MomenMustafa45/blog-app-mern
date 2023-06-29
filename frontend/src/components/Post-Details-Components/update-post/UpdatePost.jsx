import React, { useState } from "react";
import { toast } from "react-toastify";
import FormModal from "../../form-modal/FormModal";

import "./update-post.css";

const UpdatePost = ({ modalToggle }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (description.trim() === "")
      return toast.error("Post description is required");

    console.log({ title, category, description });
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

        showInputFile={{
          value: file,
          onChangeFile: (e) => setFile(e.target.value),
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
