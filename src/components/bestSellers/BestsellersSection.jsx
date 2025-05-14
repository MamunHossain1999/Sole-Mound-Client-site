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

  if (isLoading) return <div>Loading...</div>;

  const bestsellers = products?.filter(
    (item) => item.section === "bestsellers"
  );

  const topBrands = products?.filter((item) => item.section === "topbrands");
  const weeklyDeals = products?.filter(
    (item) => item.section === "weeklydeals"
  );

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Bestsellers */}
        <div className="w-full lg:w-1/2 bg-[#F5F5F5] rounded-xl p-3 md:px-10">
          <div className=" mt-7">
            <h2 className="text-2xl md:text-2xl font-bold text-[#1F1F1F]">
              Bestsellers
            </h2>
            <p className="text-base text-[#1F1F1F]">
              Get discounts on popular items
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4  rounded-lg p-3 md:pt-16 md:p-0">
            <div className="w-full">
              <div className="grid grid-cols-3 gap-3 rounded-lg">
                {bestsellers?.slice(0, 6).map((item) => (
                  <Link to={`/product/${item.id}`} key={item.id}>
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 md:h-40 object-cover rounded-lg"
                      />
                      <div className="text-right text-[#1F1F1F] mt-1 text-sm">
                        {item.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Top Brands and Weekly Deals */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Top Brands */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1F1F1F] mb-4">
              Deals on top categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {topBrands?.slice(0, 3).map((item) => (
                <Link to={`/product/${item.id}`} key={item.id}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 md:h-40 object-cover rounded-lg"
                    />
                    <div className="mt-2 flex items-center text-sm">
                      <span className="text-[#000000] font-normal text-base">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Weekly Deals */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6">
            <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1F1F1F] mb-4">
                Weekly Deals
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {weeklyDeals?.slice(0, 3).map((item) => (
                <Link to={`/product/${item.id}`} key={item.id}>
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 md:h-40 object-cover rounded-lg"
                    />
                    <div className="mt-2 flex items-center text-sm">
                    <span className="text-[#000000] font-normal text-base">
                        {item.title}
                      </span>
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
