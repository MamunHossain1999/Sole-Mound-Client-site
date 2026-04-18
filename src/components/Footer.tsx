import React from "react";
import logo from "../assets/navbarIcon/Logo 3.png";
import { FaArrowRightLong } from "react-icons/fa6";
import visa from "../assets/VISA.png";
import paypal from "../assets/paypal.png";
import mastercat from "../assets/mastercard.png";
import american from "../assets/american.png";
import footerImg from "../assets/subscribe-shape-1.png.png";
import facebook from "../assets/fb.png";
import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twiter.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-[#E3AADD] bg-no-repeat bg-[length:auto] bg-right-bottom py-8 text-[#505050]"
      style={{
        backgroundImage: `url(${footerImg})`,
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {/* Customer Support */}
          <div className="h-full flex flex-col">
            <img
              src={logo}
              alt="SoleMound Logo"
              className="h-[48px] w-[60px] mr-2"
            />
            <span className="font-semibold text-[16px] text-[#1F1F1F] mt-2">
              Customer Support:
            </span>
            <p className="my-2 text-[16px]">01795920956</p>
            <p className="my-2 text-[16px]">Address</p>
            <p className="my-2 text-[16px]">developermamun1999@gmail.com</p>
            <div className="mt-2">
              <p className="mb-2 text-[16px]">Stay connected</p>
              <div className="flex gap-5">
                <Link
                  to="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={facebook} alt="Facebook" />
                </Link>
                <Link
                  to="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="LinkedIn" />
                </Link>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitter} alt="Twitter" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="h-full flex flex-col">
            <h3 className="font-semibold text-[16px] text-[#1F1F1F] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 flex-1">
              <li>
                <Link to="/about" className="hover:text-[#A8537B] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#A8537B] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#A8537B] transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#A8537B] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#A8537B] transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="h-full flex flex-col">
            <h3 className="font-semibold text-[16px] text-[#1F1F1F] mb-4">
              Categories
            </h3>
            <ul className="space-y-2 flex-1">
              <li>
                <Link
                  to="/category/electronics"
                  className="hover:text-[#A8537B] transition"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/category/fashion"
                  className="hover:text-[#A8537B] transition"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/category/home"
                  className="hover:text-[#A8537B] transition"
                >
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link
                  to="/category/sports"
                  className="hover:text-[#A8537B] transition"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  to="/category/books"
                  className="hover:text-[#A8537B] transition"
                >
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="h-full flex flex-col w-full">
            {/* Title */}
            <h3 className="font-semibold text-[16px] text-[#1F1F1F] mb-3 sm:mb-4">
              Newsletter
            </h3>

            {/* Text */}
            <p className="mb-3 sm:mb-4 text-[14px] sm:text-[16px] text-gray-600">
              Subscribe to get special offers and updates
            </p>

            {/* Input + Button */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#A8537B] text-sm sm:text-base"
              />

              <button className="w-full sm:w-auto bg-[#A8537B] hover:bg-[#914468] text-white px-4 py-2 rounded transition flex items-center justify-center gap-2 text-sm sm:text-base">
                Subscribe
                <FaArrowRightLong size={14} />
              </button>
            </div>

            {/* Payment Methods */}
            <div className="mt-auto">
              <p className="mb-2 text-[14px] sm:text-[16px] font-medium">
                Payment Methods
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <img src={visa} alt="Visa" className="h-6 sm:h-8" />
                <img src={paypal} alt="PayPal" className="h-6 sm:h-8" />
                <img src={mastercat} alt="Mastercard" className="h-6 sm:h-8" />
                <img
                  src={american}
                  alt="American Express"
                  className="h-6 sm:h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center">
          <p className="text-[14px]">
            © 2024 SoleMound. All rights reserved. Made with ❤️ by Your Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
