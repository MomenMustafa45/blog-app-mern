import React from "react";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";
import { posts } from "../../../dummyData";

const PostsTable = () => {
  return (
    <section className="table-parent">
      <TableDashboard
        title="Posts"
        headers={["Count", "User", "Post title", "Actions"]}
        items={posts}
      />
    </section>
  );
};

export default PostsTable;
