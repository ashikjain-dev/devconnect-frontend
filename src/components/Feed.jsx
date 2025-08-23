import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feedSlice);
  //console.log(feed);
  const getFeed = async () => {
    try {
      if (feed) return;

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <>
      {feed && (
        <div className="flex justify-center my-5">
          <UserCard user={feed[1]} />
        </div>
      )}
    </>
  );
};

export default Feed;
