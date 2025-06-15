import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UseAuth from "../hooks/UseAuth";

import myAccountIcon from "../assets/dashboard/myAccountIcon.svg";
import orderIcon from "../assets/dashboard/orderIcon.svg";
import loginIcon from "../assets/dashboard/loginIcon.svg";
import shoppingCardIcon from "../assets/dashboard/shoppingCardIcon.svg";
import heartIcon from "../assets/dashboard/favoriteIcon.svg";
import card from "../assets/dashboard/Notebook.svg";
import browsingIcon from "../assets/dashboard/browsingIcon.svg";
import SignOut from "../assets/dashboard/SignOut.svg";

const DashBoard = () => {
  const { user, loader, logOut } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logOut();
    navigate("/auth/login-page");
  };

  // Active ar inactive state er jonno alag alag class
  const getNavLinkClass = (isActive) => {
    const baseClass = "group flex gap-3 items-center transition-all duration-200 hover:text-[#A8537B]";
    return isActive 
      ? `${baseClass} text-[#A8537B] active-nav` 
      : `${baseClass} text-[#505050]`;
  };

  // Icon er jonno common class - hover ar active duitai handle korbe
  const iconClass = "w-6 h-6 transition-all duration-200 group-hover:brightness-0 group-hover:contrast-0 group-hover:sepia group-hover:hue-rotate-[320deg] group-hover:saturate-200 group-hover:brightness-75";
  const activeIconClass = "group-[.active-nav]:brightness-0 group-[.active-nav]:contrast-0 group-[.active-nav]:sepia group-[.active-nav]:hue-rotate-[320deg] group-[.active-nav]:saturate-200 group-[.active-nav]:brightness-75";

  const fullIconClass = `${iconClass} ${activeIconClass}`;

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex flex-1 container mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 top-40 h-fit px-2 py-9">
          <div className="text-base text-[#919191] px-2 pb-6">
            Welcome, <strong>{user?.name || "User"}</strong>
          </div>

          <div className="space-y-7 border border-[#B6B7BC] p-3 rounded-[6px]">
            <div>
              <NavLink 
                to="/dashboard/account-page"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={myAccountIcon}
                  alt="My Account"
                  className={fullIconClass}
                />
                <span>My Account</span>
              </NavLink>
            </div>

            <div>
              <NavLink 
                to="/dashboard/order-history"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={orderIcon}
                  alt="Order History"
                  className={fullIconClass}
                />
                <span>Order History</span>
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/dashboard/login-and-security"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={loginIcon}
                  alt="Login & Security"
                  className={fullIconClass}
                />
                <span>Login & Security</span>
              </NavLink>
            </div>

            <div>
              <NavLink 
                to="/shopping-card"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={shoppingCardIcon}
                  alt="Shopping Cart"
                  className={fullIconClass}
                />
                <span>Shopping Cart</span>
              </NavLink>
            </div>

            <div>
              <NavLink 
                to="/dashboard/wishlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={heartIcon}
                  alt="Wishlist"
                  className={fullIconClass}
                />
                <span>Wishlist</span>
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/dashboard/card-and-address"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={card}
                  alt="Cards & Address"
                  className={fullIconClass}
                />
                <span>Cards & Address</span>
              </NavLink>
            </div>

            <div>
              <NavLink 
                to="/dashboard/brows-history"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <img
                  src={browsingIcon}
                  alt="Browsing History"
                  className={fullIconClass}
                />
                <span>Browsing History</span>
              </NavLink>
            </div>

            <div>
              <div
                onClick={handleLogout}
                className="group flex items-center gap-3 cursor-pointer text-[#505050] hover:text-[#A8537B] rounded-lg transition-all duration-200"
              >
                <img
                  src={SignOut}
                  alt="Logout"
                  className={iconClass}
                />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-xl min-h-[600px]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashBoard;