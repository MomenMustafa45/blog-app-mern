import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
