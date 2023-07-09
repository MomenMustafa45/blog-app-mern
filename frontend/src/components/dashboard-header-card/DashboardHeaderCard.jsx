import React from "react";
import "./dashboard-header-card.css";

const DashboardHeaderCard = ({ cardName, count }) => {
  return (
    <div className="dashboard-header-card">
      <h4 className="card-title">{cardName}</h4>
      <p className="card-count">{count}</p>
      <div className="card-btn">
        <p>See All Users</p>
        <i className="bi bi-person"></i>
      </div>
    </div>
  );
};

export default DashboardHeaderCard;
