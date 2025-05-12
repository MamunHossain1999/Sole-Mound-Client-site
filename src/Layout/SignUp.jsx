import React from "react";
import { Outlet } from "react-router-dom";
import LoginNavbar from "../components/loginNavbar/LoginNavbar";
import ScrollToTop from "../components/scrollTop/ScrollTop";

const SignUp = () => {
  return (
    <div>
      <ScrollToTop />
      <LoginNavbar />
      <div className="min-h-[calc(100vh-100px)] bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default SignUp;
