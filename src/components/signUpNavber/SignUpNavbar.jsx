

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/navbarIcon/Logo 3.png";

const SignUpNavbar = () => {
  
      return (
        <div className="w-full">
          {/* Top Navbar */}
          <div className="bg-[#E3AADD] px-4 md:px-52 h-[99px] flex items-center z-50 transition-all duration-300">
            {/* logo area */}
            <NavLink to="/">
              <img src={logo} alt="Logo" className="w-[106px] h-[90px] bg-black" />
            </NavLink>
    
           
              <div
                className="text-4xl text-[#505050] pl-12"
                style={{ fontFamily: "Oleo Script, cursive" }}
              >
                Sign up
              </div>
           
          </div>
        </div>
      );
    };
    
export default SignUpNavbar;