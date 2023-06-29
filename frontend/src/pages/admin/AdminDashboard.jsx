import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./admin-dashboard.css";
import AdminSidebar from "./admin-sidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <section className="dashboard-parent">
      <ToastContainer style={{ marginTop: "55px" }} />
      <AdminSidebar />
      <Outlet />
    </section>
  );
};

export default AdminDashboard;
