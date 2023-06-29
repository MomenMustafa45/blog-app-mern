import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import Login from "./pages/form/Login";
import Register from "./pages/form/Register";
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import Profile from "./pages/profile/Profile";
import AdminMain from "./pages/admin/admin-main/AdminMain";
import UsersTable from "./pages/admin/admin-users-table/UsersTable";
import PostsTable from "./pages/admin/admin-posts-table/PostsTable";
import CategoriesTable from "./pages/admin/admin-categories-table/CategoriesTable";
import CommentsTable from "./pages/admin/admin-comments-table/CommentsTable";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer style={{ marginTop: "70px" }} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Navigate to="/" />}
        />

        {/* Nested Route for Dashboard */}
        {/* Nested Route for Dashboard */}
        <Route
          path="/admin-dashboard"
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        >
          <Route path="/admin-dashboard" element={<AdminMain />} />
          <Route path="/admin-dashboard/users-table" element={<UsersTable />} />
          <Route path="/admin-dashboard/posts-table" element={<PostsTable />} />
          <Route
            path="/admin-dashboard/comments-table"
            element={<CommentsTable />}
          />
          <Route
            path="/admin-dashboard/categories-table"
            element={<CategoriesTable />}
          />
        </Route>
        {/* Nested Route for Dashboard */}
        {/* Nested Route for Dashboard */}

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
