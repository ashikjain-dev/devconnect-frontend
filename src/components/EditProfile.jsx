import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);
  const [photoUrl, setPhoto] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const user1 = { firstName, lastName, bio, photoUrl, gender };
  const [error, setError] = useState(null);
  const [toast, isToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      setError(null);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, bio, gender, photoUrl },
        { withCredentials: true }
      );
      //data.data contains user values and res.data.message contains message
      setToastMessage(res.data.message);
      dispatch(addUser(res.data.data));
      isToast(true);
      setTimeout(() => {
        isToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
      console.error(error.response.data);
    }
  };

  return (
    <>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center mx-4 ">
        <div className=" card bg-accent-content text-primary-content w-96 shadow-md p-2 ">
          <div className="card-body">
            <h2 className="card-title justify-center">Update your Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">firstName : </span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Type your firstName here"
                  className="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">lastName : </span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Type your last name here"
                  className="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Bio : </span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                ></textarea>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">PhotoUrl : </span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  onChange={(e) => {
                    setPhoto(e.target.value);
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Gender : </span>
                </div>
                <select
                  className="select select-primary w-full max-w-xs focus:outline-none focus:ring-0 focus:border-transparent"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option>{gender ?? "select your gender"}</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </label>
            </div>
            {error && (
              <div role="alert" className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            <div className="card-actions justify-center">
              <button className="btn input-primary my-2" onClick={saveProfile}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={user1} />
    </>
  );
};

export default EditProfile;
