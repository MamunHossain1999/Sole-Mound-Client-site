import React from "react";

import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo 3.png";

const LoginNavbar = () => {
  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className=" bg-[#E3AADD] px-4 md:px-30 h-[99px] flex justify-between items-center shadow-md z-50 transition-all duration-300 ">
        {/* logo area */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-[106px] h-[90px]" />
        </NavLink>
      </div>
    </div>
  );
};

export default LoginNavbar;
