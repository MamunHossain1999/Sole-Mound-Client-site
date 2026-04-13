import React from "react";
import banner from "../../assets/home/Banner.png";
import Banner from "../../components/Banner";
import CategoryScroller from "./CategoryScroller";
import BestsellersSection from "@/components/bestSellers/BestsellersSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BigBrandDeals from "@/components/BigBrandDeals";
import YourBrowsingHistory from "@/components/YourBrowsingHistory";
// import FeaturedProducts from "../../components/FeaturedProducts";
// import YourBrowsingHistory from "../../components/YourBrowsingHistory";
// import BigBrandDeals from "../../components/BigBrandDeals";
// import BestsellersSection from "../../components/bestSellers/BestsellersSection";
// import Shape from "../../components/Shape";
// import CategoryScroller from "./CategoryScroller";

const Home: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto bg-white  overflow-x-auto">
       <CategoryScroller/>
      </div>

      {/* home banner */}
      <div className="w-full">
        <Banner />
      </div>

      {/* best sellers */}
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-base md:text-[25px] lg:text-[36px] font-bold md:mb-4 text-[#000000]">
          Bestsellers
        </h2>

        <BestsellersSection />
      </div>

      {/* featured Products */}
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-base md:text-[25px] lg:text-[36px] font-bold mb-2 md:mb-4 text-[#000000]">
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
        <h2 className="text-base md:text-[25px] lg:text-[36px] font-bold mb-2 md:mb-6 text-[#1F1F1F] text-[12px] font-bold ">
          Your browsing history
        </h2>
        <YourBrowsingHistory />
      </div>
    </div>
  );
};

export default Home;
