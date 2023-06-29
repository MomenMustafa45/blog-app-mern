import React from "react";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";

const CategoriesTable = () => {
  return (
    <section className="table-parent">
      <TableDashboard
        title="Users"
        headers={["Count", "Category Title", "Actions"]}
        items={[1, 2, 3]}
      />
    </section>
  );
};

export default CategoriesTable;
