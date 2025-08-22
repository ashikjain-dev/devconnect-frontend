import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("kl.rahul@gmail.com");
  const [password, setPassword] = useState("RHHHash23^");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error.response.data);
      console.error(error.response);
    }
  };
  return (
    <div className="flex justify-center my-5">
      <div className=" card bg-accent-content text-primary-content w-96 shadow-md p-2 ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">Email : </span>
              </div>
              <input
                type="email"
                value={emailId}
                placeholder="Type your email here"
                className="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:ring-0 focus:border-transparent"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">Password : </span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Type your password here"
                className="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:ring-0 focus:border-transparent"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          {error && (
            <div role="alert" className="alert alert-error">
              <span>{error}</span>
            </div>
          )}
          <div className="card-actions justify-center">
            <button className="btn input-primary my-2" onClick={handleSignIn}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
