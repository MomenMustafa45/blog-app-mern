import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";
import { deletePost, getPosts } from "../../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
    console.log(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePostHandler = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <section className="table-parent">
      <TableDashboard
        title="Posts"
        headers={["Count", "User", "Post title", "Actions"]}
        items={posts}
        deleteItem={deletePostHandler}
      />
    </section>
  );
};

export default PostsTable;
