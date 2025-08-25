import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connectionSlice);
  const dispatch = useDispatch();

  const fetchExistingConnections = async () => {
    try {
      if (connections) return;
      const res = await axios.get(BASE_URL + "/user/connection/accepted", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchExistingConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <div>No Connections Exist</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-3xl font-bold text-white">Connections List :</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, bio, age, gender } =
          connection;
        return (
          <div
            key={_id}
            className="flex flex-row card w-96 bg-base-300 shadow-sm my-8 p-5"
          >
            <div>
              <img
                className="w-50 h-20  rounded-full"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="align-left mx-5">
              <h1 className="text-xl font-bold">
                {firstName + " " + lastName}
              </h1>
              <p>{bio}</p>
              {age && gender && <p>age , gender</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
