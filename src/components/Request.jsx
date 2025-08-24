import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Request = () => {
  const userRequest = useSelector((state) => state.requestSlice);
  const dispatch = useDispatch();
  const handleReview = async (state, _id) => {
    try {
      await axios.post(
        BASE_URL + "/connectionrequest/review/" + state + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRequests = async () => {
    try {
      if (userRequest) return;
      const res = await axios.get(BASE_URL + "/user/connection/interested", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!userRequest) return;
  if (userRequest.length === 0) {
    return (
      <div className=" flex justify-center text-3xl font-bold text-white mt-5">
        No Requests Exist
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-3xl font-bold text-white">Connections List :</h1>
      {userRequest.map((request) => {
        const { _id, firstName, lastName, photoUrl, bio, age, gender } =
          request.user;
        const requestId = request.id;
        return (
          <div key={requestId} className="card bg-base-300">
            <div className="flex flex-row card w-96 bg-base-300 shadow-sm my-8 p-5">
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
            <div className="flex flex-row card-actions justify-center mb-4">
              <button
                className=" btn btn-secondary"
                onClick={() => {
                  handleReview("accepted", requestId);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleReview("ignored", requestId);
                }}
              >
                Ignore
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
