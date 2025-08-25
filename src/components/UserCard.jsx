import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, bio, photoUrl } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connectionrequest/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res.data.connection.toUserId);
      dispatch(removeFeed(res.data.connection.toUserId));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure className="px-5 pt-5">
          <img src={photoUrl} alt="User Photo" className="rounded-xl" />
        </figure>
        <div key={_id} className="card-body items-center text-center">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{bio}</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interest
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
