import React from "react";
import logo from "../assets/Logo 3.png";
import { FaArrowRightLong } from "react-icons/fa6";
import visa from "../assets/VISA.png";
import paypal from "../assets/paypal.png";
import mastercat from "../assets/mastercard.png";
import american from "../assets/american.png";
import footerImg from "../assets/subscribe-shape-1.png.png";
import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import facebook from "../assets/fb.png";
import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twiter.png";
import { Link } from "react-router-dom";

const Footer = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
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
            <p className="my-2 text-[16px]">info@solemound.com</p>
            <div className="mt-2">
              <p className="mb-2 text-[16px]">Stay connected</p>
              <div className="flex gap-5">
                <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src={facebook} alt="Facebook" />
                </Link>
                <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} alt="LinkedIn" />
                </Link>
                <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src={twitter} alt="Twitter" />
                </Link>
              </div>
            </div>
          </div>

          {/* Top Category */}
          <div className="h-full flex flex-col">
            <span className="font-semibold text-[16px] text-[#1F1F1F]">
              Top Category
            </span>
            <p className="my-2 text-[16px]"><Link to="/computer-laptop">Computer & Laptop</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/smartphone">SmartPhone</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/headphones">Headphone</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/camera-photo">Camera & Photo</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/tv-homes">TV & Homes</Link></p>
            <p className="bg-[#C8A8E9] flex text-[16px] items-center w-fit gap-2 px-2 py-1 rounded text-[#1F1F1F] cursor-pointer hover:underline mt-auto">
              <a href="/browsHistory">Browse All Product</a>
              <FaArrowRightLong />
            </p>
          </div>

          {/* Quick Links */}
          <div className="h-full flex flex-col">
            <span className="font-semibold text-[16px] text-[#1F1F1F]">
              Quick Links
            </span>
            <p className="my-2 text-[16px]"><Link to="/shop-product">Shop Product</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/shopping-card">Shopping Cart</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/wishlist">Wishlist</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/faq">FAQ</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/contact">Contact Us</Link></p>
            <p className="mb-2 text-[16px]"><Link to="/aboutUs">About Us</Link></p>
          </div>

          {/* Payment */}
          <div className="h-full flex flex-col">
            <h6 className="font-semibold text-[16px] text-[#1F1F1F]">
              Payment Method
            </h6>
            <div className="flex items-center space-x-2 mb-3 mt-3">
              <img src={visa} alt="Visa" className="h-6" />
              <img src={paypal} alt="PayPal" className="h-6" />
              <img src={mastercat} alt="MasterCard" className="h-6" />
              <img src={american} alt="American Express" className="h-6" />
            </div>
            <span className="text-[#1F1F1F] block mb-2 font-bold">
              Download App
            </span>
            <div className="flex gap-3 pt-5 mt-auto">
              <Link to="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <img src={footer1} alt="App Store" />
              </Link>
              <Link to="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <img src={footer2} alt="Google Play Store" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
