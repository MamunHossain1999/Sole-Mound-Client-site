import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
import UseAuth from "../hooks/UseAuth";


const DashBoard = () => {
  const { user, loader, logOut } = UseAuth();
  const navigate = useNavigate();


 const handleLogout = async () => {
  logOut();
    // Redirect
    navigate("/auth/login-page");
};

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div ><span className="loading loading-spinner text-success"></span></div>
      </div>
    );
  }

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
    
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex flex-1 container mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 top-40 h-fit px-2 py-8">
          <div className="text-base text-[#919191] px-2 pb-6">
            Welcome, <strong>{user?.name || "User"}</strong>.{" "}
            <button  onClick={handleLogout} className="text-[#A8537B] hover:underline text-base font-semibold ml-2">
              Sign out
            </button>
          </div>

          <ul className="space-y-2 border border-[#B6B7BC] p-2 rounded-lg">
            {menuItems?.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg text-base transition-all ${
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
             <p onClick={handleLogout} className="flex items-center gap-3 ml-2 cursor-pointer"> <LogOut size={18} />logout</p>
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
