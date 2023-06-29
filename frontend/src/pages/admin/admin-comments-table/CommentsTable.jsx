import React from "react";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";

const CommentsTable = () => {
  return (
    <section className="table-parent">
      <TableDashboard
        items={[1, 2, 3]}
        headers={["Count", "User", "Comment", "Action"]}
        title="Comments"
      />
    </section>
  );
};

export default CommentsTable;
