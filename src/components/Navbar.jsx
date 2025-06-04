import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/navbarIcon/Logo 3.png";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import AllCategory from "../dropdown/allCategory/AllCategory";
import userIcon from '../assets/navbarIcon/Vector (2).png';
import favoriteIcon from '../assets/navbarIcon/Vector (3).png';
import cardIcon from '../assets/navbarIcon/Vector (4).png';
import useAuth from "../hooks/UseAuth";


const navLinkStyle = ({ isActive }) =>
  isActive ? "group text-white" : "group text-[#505050]";


const textLinkStyle = ({ isActive }) =>
  isActive ? "text-[#0F0F0F] font-semibold " : "text-[#505050] ";

const Navbar = () => {
  const {user, loader} = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = () => {
  
  console.log("Searching for:", searchText);
  // navigate(`/search?query=${searchText}`);
  };


  // navbar show hide
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
        <div ><span className="loading loading-spinner text-success"></span></div>
      </div>
    );
  }
  
  const items = (
    <>
      {/* Language */}
      <div className="text-center">
        <NavLink to="/auth/login-page" className={navLinkStyle}>
          <span className="flex text-[16px] justify-center">EN /</span>
          <span className="text-[16px]">USD</span>
        </NavLink>
      </div>
  
      {/* Account Page */}
      <div className="text-center">
        <NavLink to="/dashboard/account-page" className={navLinkStyle}>
          <img
            src={userIcon}
            alt="user"
            className="h-[21px] w-[21px] mx-auto group-[.text-white]:invert group-[.text-white]:brightness-0"
          />
           {user ? <p>{user.name}</p> : <p>Hello User</p>}
        </NavLink>
      </div>
  
      {/* Wishlist */}
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
  
      {/* Cart */}
      <div className="text-center">
        <NavLink to="/user/register" className={navLinkStyle}>
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
      {/* Top Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#E3AADD] px-4 md:px-30 h-[99px] flex justify-between items-center shadow-md z-50 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* logo area */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-[106px] h-[90px]" />
        </NavLink>

        <div className="hidden md:flex flex-1 md:m-14 relative">
          <input
            type="text"
            placeholder="Search for anything..."
            autoComplete="off"
            className="input bg-white text-[#919191] input-bordered w-full py-2 pl-10 rounded-full focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="hidden md:flex gap-8 text-black items-center">{items}</div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Push content down to prevent overlap */}
      <div className="h-[72px] md:h-[72px]"></div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden left-0 w-full pt-4 bg-white shadow-md transition-all duration-300 ">
          <div className="flex flex-col px-6 py-4 space-y-5 text-gray-800">
            <NavLink to="/dashboard/accountPage" onClick={toggleMenu} className="flex items-center gap-3 hover:text-pink-600">
              <FaUser className="text-xl" />
              Hello User
            </NavLink>
            <NavLink to="/wishlist" onClick={toggleMenu} className="flex items-center gap-3 hover:text-pink-600">
              <GrFavorite className="text-xl" />
              Favorite
            </NavLink>
            <NavLink to="/cart" onClick={toggleMenu} className="flex items-center gap-3 hover:text-pink-600">
              <MdOutlineShoppingCart className="text-xl" />
              Cart
            </NavLink>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Language:</span>
              <NavLink to="/auth/login-page"><span>EN / USD</span></NavLink>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 text-sm text-gray-700"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="pt-4 border-t">
              <p className="text-base text-gray-400">Quick Links</p>
              <div>
                {/* Main Links */}
                <div className="mt-2 space-y-2 text-base text-[#1F1F1F]">
                  <NavLink to="/weeklyDeals" onClick={toggleMenu} className="block hover:text-pink-600">
                    Today’s Deals
                  </NavLink>
                  <NavLink to="/shoppingCard" onClick={toggleMenu} className="block hover:text-pink-600">
                    Shop
                  </NavLink>
                  <NavLink to="/trending" onClick={toggleMenu} className="block hover:text-pink-600">
                    Trending
                  </NavLink>
                  <NavLink to="/blackFriday" onClick={toggleMenu} className="block hover:text-pink-600">
                    Black Friday
                  </NavLink>
                  <NavLink to="/buyAgain" onClick={toggleMenu} className="block hover:text-pink-600">
                    Buy Again
                  </NavLink>
                  <NavLink to="/browsing-history" onClick={toggleMenu} className="block hover:text-pink-600">
                    Browsing History
                  </NavLink>
                </div>

                {/* Utility Links */}
                <div className="text-[#1F1F1F] mt-4 space-y-2 text-base">
                  <NavLink to="/get-the-app" onClick={toggleMenu} className="block hover:text-pink-600">
                    Get the App
                  </NavLink>
                  <NavLink to="/seller/seller-login-page" onClick={toggleMenu} className="block hover:text-pink-600">
                    Become a Supplier
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navbar for Desktop */}
      <div className="container mx-auto md:flex bg-white items-center md:px-4 justify-between">
        <div className="hidden md:flex h-[71px]  md:pt-16 md:pb-10 items-center gap-6 text-[#1F1F1F] text-base">
          <AllCategory />
          <NavLink to="/weekly-deals" className={textLinkStyle}>Todays Deals</NavLink>
          <NavLink to="/" className={textLinkStyle}>Shop</NavLink>
          <NavLink to="/trending" className={textLinkStyle}>Trending</NavLink>
          <NavLink to="/blackFriday" className={textLinkStyle}>Black Friday</NavLink>
          <NavLink to="/buy-again" className={textLinkStyle}>Buy Again</NavLink>
          <NavLink to="/brows-history" className={textLinkStyle}>Browsing History</NavLink>
        </div>
        <div className="hidden md:flex  h-[71px]  md:pt-16 md:pb-10 items-center gap-6 text-[#1F1F1F] text-[16px]">
          <NavLink to="/brows-history" className={textLinkStyle}>Get the app</NavLink>
          <NavLink to="/seller/seller-login-page"  className={textLinkStyle}>Become a supplier</NavLink>
        </div>
      </div>

      <hr className="h-[2px] bg-[#E2E3E8] border-0" />

    </div>
  );
};

export default Navbar;
