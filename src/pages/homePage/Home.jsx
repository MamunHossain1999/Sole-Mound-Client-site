import React from "react";
import sellerLeft from "../../assets/home/sellerLeft.png";
import sellerRight from "../../assets/home/topBrand.png";
import sellerRight1 from "../../assets/home/weekly.png";
import banner from "../../assets/home/Banner.png";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import FeaturedProducts from "../../components/FeaturedProducts";
import YourBrowsingHistory from "../../components/YourBrowsingHistory";
import BigBrandDeals from "../../components/BigBrandDeals";
import BestsellersSection from "../../components/bestSellers/BestsellersSection";

const Home = () => {
  return (
    <div className="mt-4">
      <div className="container mx-auto bg-white py-2 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max space-x-4 px-4 mt-4 md:mt-1">
          {/* Category Buttons */}
          <div className="flex items-center space-x-4 whitespace-nowrap">
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Environment
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Apparel & Accessories
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Home & Garden
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Packaging & Printing
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Beauty
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Mother, Kids & Toys
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Vehicle Parts & Accessories
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Furniture
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Luggage & Bags
            </button>
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
              Measurement & Analysis...
            </button>
          </div>

          {/* Right Arrow */}
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* home banner */}

      <div className="w-full">
        <Banner />
      </div>

      {/* best sellers */}
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-[36px] font-bold mb-4 text-[#000000]">
          Bestsellers
        </h2>

        <BestsellersSection />
      </div>

      {/* featured Products */}

      <div className="container mx-auto my-8 px-4">
        <h2 className="text-[36px] font-bold mb-6 text-[#000000]">
          Featured Products
        </h2>
        <FeaturedProducts />
      </div>

      {/* add section */}
      <div className="container mx-auto my-12 px-4">
        <img
          src={banner}
          alt="add banner"
          className="w-full object-cover rounded-md shadow-sm"
        />
      </div>

      {/* big brand deals */}
      <div className="container mx-auto my-8 px-4">
        <BigBrandDeals />
      </div>

      {/* Your browsing history */}

      <div className="container mx-auto my-12 px-4">
        <h2 className="text-[36px] font-bold mb-6 text-[#1F1F1F] ">
          Your browsing history
        </h2>
        <YourBrowsingHistory />
      </div>
    </div>
  );
};

export default Home;
