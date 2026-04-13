import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/navbarIcon/Logo 3.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import AllCategory from "../dropdown/allCategory/AllCategory";
import userIcon from "../assets/navbarIcon/Vector (2).png";
import favoriteIcon from "../assets/navbarIcon/Vector (3).png";
import cardIcon from "../assets/navbarIcon/Vector (4).png";
import LanguageAndDoller from "./languageAndDoller/LanguageAndDoller";
import { useGetProfileQuery } from "@/Redux/api/userApi";
import { useEffect, useMemo, useState } from "react";
import { useGetCartQuery } from "@/Redux/api/cartApi";
import { useGetProductsQuery } from "@/Redux/api/productApi";
import { useDebounce } from "./searchHook/useDebounce";

const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "group text-white" : "group text-[#505050]";
const textLinkStyle = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-[#0F0F0F] font-semibold" : "text-[#505050]";

const Navbar = () => {
  // ✅ profile data
  const { data: user, isLoading } = useGetProfileQuery();
  const { data: productsData } = useGetProductsQuery();
  // get cart and wishlist count
  const { data: cartData } = useGetCartQuery();
  const cartCount = cartData?.data?.items?.length || 0;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // debounced search
  const debouncedSearch = useDebounce(searchTerm, 300);
  const products = useMemo(
    () =>
      Array.isArray(productsData)
        ? productsData
        : (productsData as any)?.data || [],
    [productsData],
  );

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return [];

    const term = debouncedSearch.toLowerCase();
    return products.filter((p: any) => p.name?.toLowerCase().includes(term));
  }, [products, debouncedSearch]);

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
      <div className="text-center relative">
        <NavLink to="/shopping-card" className={navLinkStyle}>
          <img src={cardIcon} className="h-[21px] w-[21px] mx-auto" />
          <span>Cart</span>
        </NavLink>

        {/* 🔥 badge */}
        {cartCount > 0 && (
          <span className="absolute -top-1 bg-red-500 text-white text-xs px-2 rounded-full">
            {cartCount}
          </span>
        )}
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
            placeholder="Search in Daraz..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500"
          />
          {/* Search Results Dropdown */}
          {debouncedSearch && (
            <div className="absolute top-full left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-50 max-h-96 overflow-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 8).map((product: any) => (
                  <div
                    key={product._id}
                    onClick={() => {
                      navigate(`/product-details/${product._id}`);
                      setSearchTerm("");
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <p className="text-sm text-gray-800 line-clamp-1">
                      {product.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="p-3 text-sm text-gray-500 text-center">
                  No product found
                </p>
              )}
            </div>
          )}
          <FaSearch className="absolute right-4 top-3 text-gray-400" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">{items}</div>

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
          <NavLink to="/today-deals" className={textLinkStyle}>
            Todays Deals
          </NavLink>
          <NavLink to="/weekly-deals" className={textLinkStyle}>
            Weekly Deals
          </NavLink>
          <NavLink to="/shopping-card" className={textLinkStyle}>
            Shop
          </NavLink>
          <NavLink to="/trending" className={textLinkStyle}>
            Trending
          </NavLink>
          <NavLink to="/shop" className={textLinkStyle}>
            Black Friday
          </NavLink>
          <NavLink to="/buy-again" className={textLinkStyle}>
            Buy Again
          </NavLink>
          <NavLink to="/brows-history" className={textLinkStyle}>
            Browsing History
          </NavLink>
        </div>

        <div className="flex gap-4">
          <NavLink to="">Get the app</NavLink>
          <NavLink to="/seller/sign-up">Become a supplier</NavLink>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Navbar;
