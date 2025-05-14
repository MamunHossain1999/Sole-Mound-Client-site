import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo 3.png";

const LoginNavbar = () => {
  // ata nav items show hide er jnno
  const location = useLocation();
  const showLoginText = location.pathname === "/authintication/login-page";

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="bg-[#E3AADD] px-4 md:px-52 h-[99px] flex items-center z-50 transition-all duration-300">
        {/* logo area */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-[106px] h-[90px]" />
        </NavLink>

        {/* ✅ Show "Login" text only on /login */}
        {showLoginText && (
          <div
            className="text-4xl text-[#505050] pl-12"
            style={{ fontFamily: "Oleo Script, cursive" }}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginNavbar;
