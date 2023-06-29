import React from "react";
import "./pagination.css";

const Pagination = ({ postsCount, currentNumber, setCurrentNumber }) => {
  const postsCountArr = [];
  for (let i = 1; i <= postsCount; i++) {
    postsCountArr.push(i);
  }
  return (
    <ul className="pagination">
      <li>
        <button
          onClick={() => setCurrentNumber((current) => current - 1)}
          disabled={currentNumber === 1}
        >
          &lt;
        </button>
      </li>
      {postsCountArr.map((item) => (
        <li key={item}>
          <p
            className={item === currentNumber ? "active" : ""}
            onClick={() => setCurrentNumber(item)}
          >
            {item}
          </p>
        </li>
      ))}{" "}
      <li>
        <button
          onClick={() => setCurrentNumber((current) => current + 1)}
          disabled={currentNumber === postsCount}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
