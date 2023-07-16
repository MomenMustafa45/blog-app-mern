import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";
import {
  deleteCommentPost,
  getAllComments,
} from "../../../redux/apiCalls/postApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments());
    console.log(comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteCommentPost(commentId));
  };

  return (
    <section className="table-parent">
      <TableDashboard
        items={comments}
        headers={["Count", "User", "Comment", "Action"]}
        title="Comments"
        deleteItem={deleteCommentHandler}
      />
    </section>
  );
};

export default CommentsTable;
