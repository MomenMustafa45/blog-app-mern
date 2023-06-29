import React from "react";
import { Link } from "react-router-dom";
import "./admin-sidebar.css";

const AdminSidebar = () => {
  return (
    <div className="dashboard-sidebar-parent">
      <Link to="/admin-dashboard" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        Dashboard
      </Link>

      <ul className="admin-dashboard-list">
        <Link to="/admin-dashboard/users-table">
          <i className="bi bi-person"></i>
          Users
        </Link>

        <Link to="/admin-dashboard/posts-table">
          <i className="bi bi-file-post"></i>
          Posts
        </Link>

        <Link to="/admin-dashboard/categories-table">
          <i className="bi bi-tag-fill"></i>
          Categories
        </Link>

        <Link to="/admin-dashboard/comments-table">
          <i className="bi bi-chat-left-text"></i>
          Comments
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
