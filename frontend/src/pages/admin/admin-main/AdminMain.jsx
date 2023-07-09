import React from "react";
import "./admin-main.css";
import { useState } from "react";
import { toast } from "react-toastify";
import DashboardHeaderCard from "../../../components/dashboard-header-card/DashboardHeaderCard";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
} from "../../../redux/apiCalls/categoryApiCall";
import { useEffect } from "react";
import { getProfilesCount } from "../../../redux/apiCalls/profileApiCall";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { profileCount } = useSelector((state) => state.profile);
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProfilesCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategoryHandler = (e) => {
    e.preventDefault();
    if (title.length === 0) toast.error("Category shouldn't be empty");

    dispatch(createCategory({ title }));
    setTitle("");
  };

  return (
    <section className="dashboard-main-parent">
      <div className="dashboard-main-header">
        <DashboardHeaderCard cardName="Users" count={profileCount} />
        <DashboardHeaderCard cardName="Posts" count={20} />
        <DashboardHeaderCard cardName="Categories" count={categories.length} />
        <DashboardHeaderCard cardName="Comments" count={20} />
      </div>

      <div className="dashboard-main-form">
        <form className="dashboard-card-form" onSubmit={addCategoryHandler}>
          <h3>Add New Category</h3>
          <label htmlFor="category">Category Title</label>
          <input
            type="text"
            name="category"
            id="category"
            value={title}
            placeholder="Enter Category Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn-add-category">Add</button>
        </form>
      </div>
    </section>
  );
};

export default AdminMain;
