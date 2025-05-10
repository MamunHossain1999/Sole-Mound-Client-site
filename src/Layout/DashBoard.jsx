import React from "react";
import { NavLink, Outlet } from "react-router-dom";



import {
  Clock,
  CreditCard,
  Heart,
  History,
  HomeIcon,
  Lock,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashBoard = () => {
  const menuItems = [
    {
      icon: <HomeIcon size={18} />,
      text: "My Account homepage",
      href: "/dashboard/account-page",
    },
    { icon: <Clock size={18} />, text: "Order History", href: "/dashboard/order-history" },
    { icon: <Lock size={18} />, text: "Login & Security", href: "/dashboard/login-and-security"},
    { icon: <ShoppingCart size={18} />, text: "Shopping Cart", href: "/shopping-card" },
    { icon: <Heart size={18} />, text: "Wishlist", href: "/dashboard/wishlist" },
    {
      icon: <CreditCard size={18} />,
      text: "Cards & Address",
      href: "/dashboard/card-and-address",
    },
    {
      icon: <History size={18} />,
      text: "Browsing History",
      href: "/dashboard/brows-history",
    },
    { icon: <LogOut size={18} />, text: "Log-out", href: "/logout" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex flex-1 container mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 top-40 h-fit px-2 py-8">
          <div className="text-[16px] text-gray-700 px-2 pb-6">
            Welcome, <strong>Mamun</strong>.{" "}
            <button className="text-blue-600 hover:underline text-[16px] ml-2">
              Sign out
            </button>
          </div>

          <ul className="space-y-2 border border-[#B6B7BC] p-2 rounded-lg">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg text-[16px] transition-all ${
                      isActive
                        ? "text-[#A8537B] "
                        : "text-[#505050]"
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
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
