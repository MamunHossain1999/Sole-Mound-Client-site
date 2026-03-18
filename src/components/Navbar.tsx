
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/navbarIcon/Logo 3.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import AllCategory from "../dropdown/allCategory/AllCategory";
import userIcon from "../assets/navbarIcon/Vector (2).png";
import favoriteIcon from "../assets/navbarIcon/Vector (3).png";
import cardIcon from "../assets/navbarIcon/Vector (4).png";
import LanguageAndDoller from "./languageAndDoller/LanguageAndDoller";
import { useGetProfileQuery } from "@/Redux/api/userApi";
import { useEffect, useState } from "react";




const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "group text-white" : "group text-[#505050]";
const textLinkStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-[#0F0F0F] font-semibold" : "text-[#505050]";

const Navbar = () => {
  // ✅ profile data
  const { data: user, isLoading } = useGetProfileQuery();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  // scroll hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  const items = (
    <>
      {/* Language */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 text-[#505050]"
        >
          <p>
          <div>EN / </div>
          <span>USD</span>
          </p>
          <MdKeyboardArrowDown />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 z-50">
            <LanguageAndDoller />
          </div>
        )}
      </div>

      {/* User */}
      <div className="text-center">
        <NavLink to="/dashboard/account-page" className={navLinkStyle}>
          <img src={userIcon} className="h-[21px] w-[21px] mx-auto" />
          <span className="flex items-center gap-1">
            {user ? <p>{user?.name}</p> : <p>Hello User</p>}
            <MdKeyboardArrowDown />
          </span>
        </NavLink>
      </div>

      {/* Wishlist */}
      <div className="text-center">
        <NavLink to="/wishlist" className={navLinkStyle}>
          <img src={favoriteIcon} className="h-[21px] w-[21px] mx-auto" />
          <span>Favorite</span>
        </NavLink>
      </div>

      {/* Cart */}
      <div className="text-center">
        <NavLink to="/cart" className={navLinkStyle}>
          <img src={cardIcon} className="h-[21px] w-[21px] mx-auto" />
          <span>Cart</span>
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="w-full">
      {/* TOP NAVBAR */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#E3AADD] px-4 lg:px-20 h-[80px] md:h-[99px] flex justify-between items-center shadow-md z-50 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} className="w-[90px] h-[70px]" />
        </NavLink>

        {/* Search */}
        <div className="hidden md:flex flex-1 mx-10 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch className="absolute right-4 top-3 text-gray-400" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {items}
        </div>

        {/* Mobile Menu Btn */}
        <button className="md:hidden text-xl" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Spacer */}
      <div className="h-[80px] md:h-[99px]"></div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white p-4 space-y-4 shadow-md">
          {items}

          <div className="border-t pt-3 space-y-2">
            <AllCategory />
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/trending">Trending</NavLink>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="hidden md:flex justify-between container mx-auto bg-white items-center px-6 py-4">
        <div className="flex items-center gap-6">
          <AllCategory />
          <NavLink to="/shop" className={textLinkStyle}>Todays Deals</NavLink>
          <NavLink to="/shop" className={textLinkStyle}>Shop</NavLink>
          <NavLink to="/trending" className={textLinkStyle}>Trending</NavLink>
          <NavLink to="/shop" className={textLinkStyle}>Black Friday</NavLink>
          <NavLink to="/buy-again" className={textLinkStyle}>Buy Again</NavLink>
          <NavLink to="/shop" className={textLinkStyle}>Browsing History</NavLink>
        </div>

        <div className="flex gap-4">
          <NavLink to="">Get the app</NavLink>
          <NavLink to="/seller-sign/seller-sign-up">Become a supplier</NavLink>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Navbar;