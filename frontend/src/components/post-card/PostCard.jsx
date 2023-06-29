import "./post-card.css";
import { Link } from "react-router-dom";

const PostCard = ({
  fromPage,
  postTitle,
  postDescription,
  postImg,
  author,
  postDate,
  postCategory,
  postId,
}) => {
  const profilePhotoPath =
    "http://localhost:8000/" + postImg?.slice(postImg?.indexOf("images"));

  return (
    <article className={fromPage ? "posts-page" : "post-card"}>
      <Link to={`/post/${postId}`} className="post-link-wrapper">
        <div className="image-post-wrapper">
          <img src={profilePhotoPath} alt="post-img" />
        </div>

        <div className="details">
          <div className="author-date-container">
            <p>
              <span>Author:</span> {author}
            </p>
            <p className="date">{new Date(postDate).toDateString()}</p>
          </div>
          <p className="category-name">{postCategory}</p>
          <p className="title">{postTitle}</p>
          <p className="description">{postDescription}</p>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
