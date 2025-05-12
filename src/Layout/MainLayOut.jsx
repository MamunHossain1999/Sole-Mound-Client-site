import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scrollTop/ScrollTop";

const MainLayOut = () => {
  return (
    <div className="max-w-1440px mx-auto">
      <ScrollToTop/>
      <Navbar />
      <div className="min-h-[calc(100vh-380px)] bg-white">
        <Outlet />

      </div>
      <Footer />
    </div>
  );
};

export default MainLayOut;
