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
        {/* Header of the Table */}
        {/* Header of the Table */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {/* Header of the Table */}
        {/* Header of the Table */}
        <tbody>
          {items.map((item, index) => {
            // Getting photo path from server
            // Getting photo path from server
            let itemPhotoPath = "";
            if (item?.profilePhoto?.url) {
              itemPhotoPath =
                "http://localhost:8000/" +
                item?.profilePhoto?.url?.slice(
                  item?.profilePhoto?.url?.indexOf("images")
                );
            } else if (item?.image?.url) {
              itemPhotoPath =
                "http://localhost:8000/" +
                item?.image?.url?.slice(item?.image?.url?.indexOf("images"));
            } else {
              itemPhotoPath =
                "http://localhost:8000/" +
                item?.user?.profilePhoto?.url?.slice(
                  item?.user?.profilePhoto?.url?.indexOf("images")
                );
            }

            // Getting photo path from server

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
                        src={itemPhotoPath}
                        alt="this is img"
                        className="table-user-image"
                      />
                      <span className="table-username">
                        {item?.user?.userName
                          ? item?.user?.userName
                          : item?.userName}
                      </span>
                    </td>

                    <td>
                      {route.pathname === "/admin-dashboard/users-table"
                        ? item.email
                        : route.pathname === "/admin-dashboard/posts-table"
                        ? item.title
                        : item.text}
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <b style={{ padding: "10px" }}>{item?.title}</b>
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
                          <Link to={`/profile/${item?._id}`}>View Profile</Link>
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
