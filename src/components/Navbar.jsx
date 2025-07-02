import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/navbarIcon/Logo 3.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import AllCategory from "../dropdown/allCategory/AllCategory";
import userIcon from "../assets/navbarIcon/Vector (2).png";
import favoriteIcon from "../assets/navbarIcon/Vector (3).png";
import cardIcon from "../assets/navbarIcon/Vector (4).png";
import useAuth from "../hooks/UseAuth";
import LanguageAndDoller from "./languageAndDoller/LanguageAndDoller";

const navLinkStyle = ({ isActive }) =>
  isActive ? "group text-white" : "group text-[#505050]";

const textLinkStyle = ({ isActive }) =>
  isActive ? "text-[#0F0F0F] font-semibold " : "text-[#505050] ";

const Navbar = () => {
  const { user, loader } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // language dropdown er jnno
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <span className="loading loading-spinner text-success"></span>
        </div>
      </div>
    );
  }

  const items = (
    <>
      <div className={`relative ${navLinkStyle}`}>
        <button
          onClick={toggleDropdown}
          className={`items-center text-base gap-1 ${
            showDropdown ? "group text-white" : "group text-[#505050]"
          }`}
        >
          <span>EN /</span>
          <span className="flex items-center">
            <span>USD</span>
            <MdKeyboardArrowDown />
          </span>
        </button>

        {/* Dropdown content */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 z-50">
            <LanguageAndDoller />
          </div>
        )}
      </div>

      <div className="text-center">
        <NavLink to="/dashboard/account-page" className={navLinkStyle}>
          <img
            src={userIcon}
            alt="user"
            className="h-[21px] w-[21px] mx-auto group-[.text-white]:invert group-[.text-white]:brightness-0"
          />
          <span className="flex items-center">
            {user ? <p>{user.name}</p> : <p>Hello User</p>}
            <MdKeyboardArrowDown className="mt-1" />
          </span>
        </NavLink>
      </div>
      <div className="text-center">
        <NavLink to="/wishlist" className={navLinkStyle}>
          <img
            src={favoriteIcon}
            alt="favorite"
            className="h-[20.58px] w-[22.92px] mx-auto group-[.text-white]:invert group-[.text-white]:brightness-0"
          />
          <span className="text-[16px]">Favorite</span>
        </NavLink>
      </div>
      <div className="text-center">
        <NavLink to="/cart" className={navLinkStyle}>
          <img
            src={cardIcon}
            alt="cart"
            className="h-[21px] w-[21px] mx-auto group-[.text-white]:invert group-[.text-white]:brightness-0"
          />
          <span className="text-[16px]">Cart</span>
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="w-full">
      <div
        className={`fixed top-0 left-0 right-0 bg-[#E3AADD] px-4 md:px-4 lg:px-4 xl:px-20 h-[80px] md:h-[99px] flex justify-between items-center shadow-md z-50 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavLink to="/">
          <img
            src={logo}
            alt="Logo"
            className="lg:w-[106px] w-[80px] lg:h-[90px] h-[70px] cursor-pointer"
          />
        </NavLink>
        {/* Search bar */}
        <div className="hidden md:flex flex-1 md:mx-14 relative">
          <input
            type="text"
            placeholder="Search for anything..."
            autoComplete="off"
            className="input bg-white text-[#919191] input-bordered w-3xl md:w-full py-2 pl-3 lg:pl-5 rounded-full focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch className="absolute right-2 lg:right-5 top-1/2 transform -translate-y-1/2 text-[#919191]" />
        </div>
        {/* nav items */}
        <div className="hidden md:flex gap-8 text-[#FFFFFF] items-center">
          {items}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className=" text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className="h-[80px] md:h-[99px]"></div>

      {menuOpen && (
        <div className="md:hidden w-full pt-4 px-4 bg-white shadow-md transition-all duration-300">
          <div className="flex flex-col space-y-5 text-[#FFFFFF]">
            <div className="flex gap-8 text-[#FFFFFF] items-center justify-between">
              {items}
            </div>
            <div className="pt-2 border-t">
              <p className="text-base text-gray-400">
                <AllCategory />
              </p>
              <div className="mt-1 space-y-2 text-base text-[#1F1F1F]">
                <NavLink
                  to="/weekly-Deals"
                  onClick={toggleMenu}
                  className="block hover:text-gray-600"
                >
                  Today’s Deals
                </NavLink>
                <NavLink
                  to="/shoppingCard"
                  onClick={toggleMenu}
                  className="block hover:text-gray-600"
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/trending"
                  onClick={toggleMenu}
                  className="block hover:text-gray-600"
                >
                  Trending
                </NavLink>
                <NavLink
                  to="/blackFriday"
                  onClick={toggleMenu}
                  className="block hover:text-gray-600"
                >
                  Black Friday
                </NavLink>
                <NavLink
                  to="/buy-again"
                  onClick={toggleMenu}
                  className="block hover:text-gray-600"
                >
                  Buy Again
                </NavLink>
                <NavLink
                  to="/brows-history"
                  onClick={toggleMenu}
                  className="block hover:text-gray-600"
                >
                  Browsing History
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* category desktop */}
      <div className="hidden md:block container mx-auto md:flex-row items-start md:items-center bg-white px-4 md:px- ">
        <div className="flex overflow-x-auto md:overflow-visible whitespace-nowrap gap-3 lg:gap-6 text-[#0F0F0F] text-base h-[71px] md:pt-10 md:pb-10 items-center">
          <AllCategory />
          <NavLink to="/weekly-deals" className={textLinkStyle}>
            <span className="text-[#505050] font-semibold text-base">
              Todays Deals
            </span>
          </NavLink>
          <NavLink to="/shop" className={textLinkStyle}>
            <span className="text-[#505050] font-semibold text-base">Shop</span>
          </NavLink>
          <NavLink to="/trending" className={textLinkStyle}>
            <span className="text-[#505050] font-semibold text-base">
              Trending
            </span>
          </NavLink>
          <NavLink to="/blackFriday" className={textLinkStyle}>
            <span className="text-[#505050] font-semibold text-base">
              Black Friday
            </span>
          </NavLink>
          <NavLink to="/buy-again" className={textLinkStyle}>
            <span className="text-[#505050] font-semibold text-base">
              Buy Again
            </span>
          </NavLink>
          <NavLink to="/brows-history" className={textLinkStyle}>
            <span className="text-[#505050] font-semibold text-base">
              Browsing History
            </span>
          </NavLink>
        </div>
      </div>

      <hr className="h-[2px] bg-[#E2E3E8] border-0" />
    </div>
  );
};

export default Navbar;
