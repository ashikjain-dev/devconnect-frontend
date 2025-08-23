import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, bio, photoUrl } = user;
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure className="px-5 pt-5">
          <img src={photoUrl} alt="User Photo" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{bio}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-primary">Interest</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
