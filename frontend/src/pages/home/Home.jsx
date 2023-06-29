import "./home.css";
import PostCard from "../../components/post-card/PostCard";
import Categories from "../../components/categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts(1));
    console.log(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="home">
      <section className="hero-section">
        <h1>BLOG</h1>
      </section>

      <section className="latest-posts-parent">
        <div className="latest-posts-title">
          <h2>Latest posts</h2>
        </div>
        <Categories />
        <article className="latest-posts-container">
          {posts.map((post) => (
            <PostCard
              postId={post._id}
              fromPage={true}
              key={post._id}
              postTitle={post.title}
              postDescription={post.description}
              postImg={post.image.url}
              author={post.user.userName}
              postDate={post.createdAt}
              postCategory={post.category}
            />
          ))}
        </article>
      </section>
    </main>
  );
};

export default Home;
