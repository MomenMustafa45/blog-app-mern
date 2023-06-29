import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./header.css";
import { logout } from "../../redux/apiCalls/authApiCall";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [toggleQueryList, setToggleQueryList] = useState(false);

  const profilePhotoPath = user?.profilePhoto?.url?.slice(
    user?.profilePhoto?.url?.indexOf("images")
  );

  const toggleHandler = () => setToggleQueryList(false);

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="header-parent">
      <div className="header-wrapper">
        <div className="logo">
          <p>BLOG</p>
        </div>

        <div className="links-container">
          <div className="auth-container">
            {user ? (
              <>
                <b className="logout-btn" onClick={logOutHandler}>
                  LogOut
                </b>
                <Link
                  className="logged-link-container"
                  to={`/profile/${user?._id}`}
                >
                  <img
                    src={`http://localhost:8000/${profilePhotoPath}`}
                    alt="this is img"
                    className="logged-user-photo"
                  />
                  <b className="logged-username">{user?.username}</b>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleHandler}>
                  <i className="bi bi-person"></i>
                  Login
                </Link>

                <Link to="/register" onClick={toggleHandler}>
                  <i className="bi bi-person-add"></i>
                  Register
                </Link>
              </>
            )}
          </div>

          <div
            className="burger-icon"
            onClick={() => setToggleQueryList((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
            {/* <i
              className={`${toggleQueryList ? "bi bi-x-lg" : "bi bi-list"}`}
              onClick={() => setToggleQueryList((prev) => !prev)}
            ></i> */}
          </div>
        </div>

        {/* MENU-Links-LIST */}
        {/* MENU-Links-LIST */}
        <nav
          className="menu-links-container"
          style={{ height: `${toggleQueryList ? "100vh" : "0vh"}` }}
        >
          <Link to="/" onClick={toggleHandler}>
            <p>Home</p>
            <p>Home</p>
          </Link>
          <Link to="/posts" onClick={toggleHandler}>
            <p>Posts</p>
            <p>Posts</p>
          </Link>
          {user && (
            <Link to="/create-post" onClick={toggleHandler}>
              <p>Create Post</p>
              <p>Create Post</p>
            </Link>
          )}
          {user?.isAdmin && (
            <Link to="/admin-dashboard" onClick={toggleHandler}>
              <p>Admin Dashboard</p>
              <p>Admin Dashboard</p>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

// <div className="header-left">
//     <p>BLOG</p>
//     <p>icon</p>
//   </div>

//   <div
//     className="burger-icon"
//     onClick={() => setToggleQueryList((prev) => !prev)}
//   >
//     <span></span>
//     <span></span>
//     <span></span>
//   </div>

//   <nav className="nav-parent">
//     <ul
//       className="nav-list"
//       style={{ height: `${toggleQueryList ? "155px" : "0px"}` }}
//     >
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/posts">Posts</Link>
//       </li>
//       <li>
//         <Link to="/posts/create-post">Create</Link>
//       </li>
//       <li>
//         <Link to="/admin-dashboard">Admin Dashboard</Link>
//       </li>
//     </ul>
//   </nav>

//   <div className="header-right">
//     <Link to="/login">LOGIN</Link>
//     <Link to="/register">REGISTER</Link>
//   </div>
