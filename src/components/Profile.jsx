import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.userSlice);
  return (
    <div className="overflow-y-auto flex justify-center my-5">
      {user && <EditProfile user={user} />}
    </div>
  );
};

export default Profile;
