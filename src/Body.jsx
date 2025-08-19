import { Outlet } from "react-router";
import Footer from "./Footer";
import NavBar from "./NavBar";
const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
