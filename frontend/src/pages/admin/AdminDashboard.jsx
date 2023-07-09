import React from "react";
import { Outlet } from "react-router-dom";
import "./admin-dashboard.css";
import AdminSidebar from "./admin-sidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <section className="dashboard-parent">
      <AdminSidebar />
      <Outlet />
    </section>
  );
};

export default AdminDashboard;
