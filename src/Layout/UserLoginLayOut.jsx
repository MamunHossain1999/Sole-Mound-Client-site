import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoginNavbar from "../components/loginNavbar/LoginNavbar";
import ScrollToTop from "../components/scrollTop/ScrollTop";

const UserLoginLayOut = () => {
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scroll on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <ScrollToTop />
      <LoginNavbar />
      <div className="bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLoginLayOut;
