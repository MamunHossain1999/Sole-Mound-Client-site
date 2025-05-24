import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/navbarIcon/logo 3.png";

const UserLoginNavbar = () => {
  const location = useLocation();
  const userLoginText = location.pathname === "/auth/login-page";
  const userSignUpText = location.pathname === "/register/sign-up";
  const sellerLoginText = location.pathname === "/seller/seller-login-page";
  const sellerRegisterText = location.pathname === "/seller-sign/seller-sign-up";

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="bg-[#E3AADD] px-4 md:px-52 h-[99px] flex items-center z-50 transition-all duration-300 ">
        {/* logo area */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-[106px] h-[90px] cursor-pointer" />
        </NavLink>

        {/* Conditional Titles */}
        {userLoginText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Log In
          </div>
        )}

        {userSignUpText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Sign Up
          </div>
        )}

        {sellerLoginText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Log In
          </div>
        )}
        {sellerRegisterText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Sign up as a supplier
          </div>
          )}
      </div>
    </div>
  );
};

export default UserLoginNavbar;
