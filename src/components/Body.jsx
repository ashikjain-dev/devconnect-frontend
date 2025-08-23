import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice);
  const validateUser = async () => {
    try {
      if (user) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(() => {
    validateUser();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
