import "./posts.css";
import Categories from "../../components/categories/Categories";
import PostCard from "../../components/post-card/PostCard";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postsCount } = useSelector((state) => state.post);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [clickedCategory, setClickedCategory] = useState("All");

  const filteredPosts = posts.filter(
    (post) => post?.category === clickedCategory
  );

  const pages = Math.ceil(
    clickedCategory === "All" ? postsCount / 3 : filteredPosts.length / 3
  );

  useEffect(() => {
    dispatch(getPosts(currentNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostsCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="posts-page-parent">
      <Categories
        clickedCategory={clickedCategory}
        setClickedCategory={setClickedCategory}
      />
      {clickedCategory === "All"
        ? posts?.map((post) => (
            <PostCard
              postId={post._id}
              fromPage={true}
              key={post?._id}
              postTitle={post?.title}
              postDescription={post?.description}
              postImg={post?.image.url}
              author={post?.user?.userName}
              postDate={post?.createdAt}
              postCategory={post?.category}
            />
          ))
        : filteredPosts.map((post) => (
            <PostCard
              postId={post._id}
              fromPage={true}
              key={post?._id}
              postTitle={post?.title}
              postDescription={post?.description}
              postImg={post?.image.url}
              author={post?.user?.userName}
              postDate={post?.createdAt}
              postCategory={post?.category}
            />
          ))}

      <Pagination
        postsCount={pages}
        currentNumber={currentNumber}
        setCurrentNumber={setCurrentNumber}
      />
    </main>
  );
};

export default Posts;
