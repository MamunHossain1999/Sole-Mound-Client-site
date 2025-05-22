import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/navbarIcon/Logo 3.png";

const LoginNavbar = () => {
  const location = useLocation();
  const showLoginText = location.pathname === "/authintication/login-page";
  const showSignUpText = location.pathname === "/seller-sign-up/seller-sign-up";

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="bg-[#E3AADD] px-4 md:px-52 h-[99px] flex items-center z-50 transition-all duration-300">
        {/* logo area */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-[106px] h-[90px]" />
        </NavLink>

        {/* Conditional Titles */}
        {showLoginText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Log In
          </div>
        )}

        {showSignUpText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Sign Up
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginNavbar;
