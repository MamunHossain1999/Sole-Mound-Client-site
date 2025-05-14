import React from "react";
import { Outlet } from "react-router-dom";
import LoginNavbar from "../components/loginNavbar/LoginNavbar";
import ScrollToTop from "../components/scrollTop/ScrollTop";

const SignIn = () => {
  return (
    <div className="overflow-">
      <ScrollToTop />
      <LoginNavbar />
      <div className="min- bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default SignIn;
