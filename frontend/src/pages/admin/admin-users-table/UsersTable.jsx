import React from "react";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";

const UsersTable = () => {
  return (
    <section className="table-parent">
      <TableDashboard
        title="Users"
        headers={["Count", "Users", "Emails", "Actions"]}
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    </section>
  );
};

export default UsersTable;
