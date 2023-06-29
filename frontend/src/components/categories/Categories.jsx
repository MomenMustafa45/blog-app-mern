import "./categories.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";

const Categories = ({ clickedCategory, setClickedCategory }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="categories-container">
      <button
        className={
          clickedCategory === "All" ? "category-btn active" : "category-btn"
        }
        onClick={() => setClickedCategory("All")}
      >
        All
      </button>
      {categories?.map((cate) => (
        <button
          key={cate?._id}
          className={
            clickedCategory === cate?.title
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => setClickedCategory(cate?.title)}
        >
          {cate?.title}
        </button>
      ))}
    </div>
  );
};

export default Categories;
