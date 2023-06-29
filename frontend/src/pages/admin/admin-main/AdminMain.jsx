import React from "react";
import "./admin-main.css";
import { useState } from "react";
import { toast } from "react-toastify";
import DashboardHeaderCard from "../../../components/dashboard-header-card/DashboardHeaderCard";

const AdminMain = () => {
  const [category, setCategory] = useState("");

  const addCategoryHandler = (e) => {
    e.preventDefault();
    if (category.length === 0) toast.error("Category shouldn't be empty");

    console.log(category);
  };

  return (
    <section className="dashboard-main-parent">
      <div className="dashboard-main-header">
        <DashboardHeaderCard />
        <DashboardHeaderCard />
        <DashboardHeaderCard />
        <DashboardHeaderCard />
      </div>

      <div className="dashboard-main-form">
        <form className="dashboard-card-form" onSubmit={addCategoryHandler}>
          <h3>Add New Category</h3>
          <label htmlFor="category">Category Title</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            placeholder="Enter Category Title"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="btn-add-category">Add</button>
        </form>
      </div>
    </section>
  );
};

export default AdminMain;
