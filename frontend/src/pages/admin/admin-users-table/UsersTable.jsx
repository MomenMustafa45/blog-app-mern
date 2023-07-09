import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDashboard from "../../../components/table-dashboard/TableDashboard";
import {
  deleteProfile,
  getAllProfiles,
} from "../../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProfileHandler = (profileId) => {
    dispatch(deleteProfile(profileId));
  };

  return (
    <section className="table-parent">
      <TableDashboard
        title="Users"
        headers={["Count", "Users", "Emails", "Actions"]}
        items={profiles}
        deleteItem={deleteProfileHandler}
      />
    </section>
  );
};

export default UsersTable;
