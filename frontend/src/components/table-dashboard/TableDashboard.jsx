import React from "react";
import "./table-dashboard.css";
import image1 from "../../images/avatar-05.png";
import { Link, useLocation } from "react-router-dom";
import swal from "@sweetalert/with-react";

const TableDashboard = ({ title, headers, items }) => {
  const route = useLocation();

  console.log(items);

  const text = title
    .split("")
    .slice(0, title.length - 1)
    .join("");

  const deleteItemHandler = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this ${text}!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`Poof! Your ${text} has been deleted!`, {
          icon: "success",
        });
      } else {
        swal(`Your ${text} is safe!`);
      }
    });

    // console.log();
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
          {items.map((item, index) => (
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
                      src={image1}
                      alt="this is img"
                      className="table-user-image"
                    />
                    <span className="table-username">Momen Mustafa</span>
                  </td>

                  <td>
                    {route.pathname === "/admin-dashboard/users-table"
                      ? "MomenMustafa@exam.com"
                      : item.title}
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <b style={{ padding: "10px" }}>Music</b>
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

                  <button onClick={deleteItemHandler}>Delete {text}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDashboard;
