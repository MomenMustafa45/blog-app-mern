import "./create-post.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isLoading, isPostCreated } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post title is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (description.trim() === "")
      return toast.error("Post description is required");
    if (!file) return toast.error("Post file is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  return (
    <section className="create-post-parent">
      {/* <ToastContainer position="top-right" theme="colored" /> */}
      <div className="create-post-title">
        <h1>Create Your Blog</h1>
        <h3>Fill the form and share your opinions, photos and timelines`</h3>
      </div>

      <form action="" className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          <option value="Dreams">Dreams</option>
          <option value="Travells">Travells</option>
        </select>

        <textarea
          rows="5"
          className="create-post-textarea"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          className="create-post-upload"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="create-post-btn">
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
