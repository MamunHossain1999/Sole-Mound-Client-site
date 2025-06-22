import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data } = await axios.get("/products.json");
  return data;
};

const BestsellersSection = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const bestsellers = products?.filter((item) => item.section === "bestsellers");
  const topBrands = products?.filter((item) => item.section === "topbrands");
  const weeklyDeals = products?.filter((item) => item.section === "weeklydeals");

  return (
    <div className="container mx-auto lg:px-0 ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Bestsellers */}
        <div className="w-full lg:w-1/2 bg-[#F5F5F5] rounded-xl p-4 md:p-4 lg:p-6">
        {/* title */}
            <div className="mb-4">
              <h2 className="text-base md:text-2xl font-bold text-[#1F1F1F]">Bestsellers</h2>
              <p className="text-sm md:text-base text-[#1F1F1F]">
                Get discounts on popular items
              </p>
            </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 space-y-8 mt-4">
            {bestsellers?.slice(0, 6).map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 md:h-40 object-cover "
                  />
                  <div className="text-[#1F1F1F] mt-1 text-sm text-right">
                    {item.title}
                  </div>
                </div>
              </Link>
            ))} 
          </div>
            <div className="flex justify-end">
              <Link to='/'><p className="text-[#3CA6FC] font-normal text-sm">Discover more</p></Link>
            </div>
        </div>

        {/* Right Side - Top Brands and Weekly Deals */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 space-y-4">
          {/* Top Brands */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-4 lg:p-6">
            {/* title */}
            <div className="flex justify-between items-center mb-4 ">
              <div className="text-base md:text-2xl font-bold text-[#1F1F1F]">
                Deals on Top Categories
              </div>
              <div className="flex justify-end ">
                <Link to='/'><p className="text-[#3CA6FC] font-normal text-sm">Discover more</p></Link>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {topBrands?.slice(0, 3).map((item) => (
                <Link to={`/product/${item.id}`} key={item.id}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 md:h-40 object-cover "
                    />
                    <div className="mt-2 text-sm text-right text-[#000000] font-normal">
                      {item.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Weekly Deals */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-4 lg:p-6">
            {/* title */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-base md:text-2xl font-bold text-[#1F1F1F] ">
                Weekly Deals
              </div>
              <div className="flex justify-end">
                <Link to='/'><p className="text-[#3CA6FC] font-normal text-sm">Discover more</p></Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {weeklyDeals?.slice(0, 3).map((item) => (
                <Link to={`/product/${item.id}`} key={item.id}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 md:h-40 object-cover "
                    />
                    <div className="mt-2 text-sm text-right text-[#000000] font-normal">
                      {item.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestsellersSection;
