import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";
import { deleteCategory } from "../../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const deleteCategoryHandler = (cateId) => {
    dispatch(deleteCategory(cateId));
  };

  return (
    <section className="table-parent">
      <TableDashboard
        title="Category"
        headers={["Count", "Category Title", "Actions"]}
        items={categories}
        deleteItem={deleteCategoryHandler}
      />
    </section>
  );
};

export default CategoriesTable;
