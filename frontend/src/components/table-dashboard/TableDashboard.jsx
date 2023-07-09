import React from "react";
import "./table-dashboard.css";
import { Link, useLocation } from "react-router-dom";
import swal from "@sweetalert/with-react";

const TableDashboard = ({ title, headers, items, deleteItem }) => {
  const route = useLocation();

  const deleteItemHandler = (itemId) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover it!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOK) => {
      if (isOK) {
        deleteItem(itemId);
      } else {
        swal(`It's safe!`);
      }
    });
  };
  return (
    <div className="table-container">
      <h1 className="table-title">{title}</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const profilePhotoPath =
              "http://localhost:8000/" +
              item?.profilePhoto?.url?.slice(
                item?.profilePhoto?.url?.indexOf("images")
              );
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                {/* Rows for users and posts only */}
                {/* Rows for users and posts only */}
                {route.pathname === "/admin-dashboard/users-table" ||
                route.pathname === "/admin-dashboard/posts-table" ||
                route.pathname === "/admin-dashboard/comments-table" ? (
                  <>
                    <td>
                      <img
                        src={profilePhotoPath}
                        alt="this is img"
                        className="table-user-image"
                      />
                      <span className="table-username">{item.userName}</span>
                    </td>

                    <td>
                      {route.pathname === "/admin-dashboard/users-table"
                        ? item.email
                        : item.title}
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <b style={{ padding: "10px" }}>{item.title}</b>
                    </td>
                  </>
                )}

                <td>
                  <div className="table-btn-group">
                    {/* Btn View for users and posts only */}
                    {/* Btn View for users and posts only */}
                    {route.pathname === "/admin-dashboard/users-table" ||
                    route.pathname === "/admin-dashboard/posts-table" ? (
                      <>
                        <button>
                          <Link to="/profile/1">View Profile</Link>
                        </button>
                      </>
                    ) : (
                      <></>
                    )}

                    <button onClick={() => deleteItemHandler(item?._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableDashboard;
