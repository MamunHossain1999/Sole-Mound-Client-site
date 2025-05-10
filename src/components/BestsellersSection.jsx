import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
const fetchProducts = async () => {
  const { data } = await axios.get('/products.json');
  return data;
};

const BestsellersSection = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;

  const bestsellers = products?.filter((item) => item.section === "bestsellers");
  const bestsellersSidebar = products?.filter((item) => item.section === "bestsellersSideber");
  const bestsellersSidebar1 = products?.filter((item) => item.section === "bestsellersSidebar1");
  const topBrands = products?.filter((item) => item.section === "topbrands");
  const weeklyDeals = products?.filter((item) => item.section === "weeklydeals");

  return (
    <div className="container mx-auto ">
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left Side - Bestsellers */}
    <div className="w-full lg:w-1/2 bg-[#F5F5F5] rounded-xl p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-red-600">Bestsellers</h2>
        <p className="text-sm text-gray-600">Get discounts on popular items</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg p-3 md:p-4">
        <div className="w-full md:w-3/5">
          <div className="grid grid-cols-2 gap-3 bg-[#FDF1F7] rounded-lg p-3">
            {bestsellers?.slice(0, 4).map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                  />
                  <div className="text-right text-gray-600 mt-1 text-sm">{item.title}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-2">
            <span className="text-red-600 font-semibold text-lg">${bestsellers[0]?.price}</span>
            <span className="text-gray-400 line-through text-sm ml-2">${bestsellers[0]?.originalPrice}</span>
            <div className="inline-block w-10 py-1 px-1 bg-red-600 text-white text-xs mt-1">-{bestsellers[0]?.discount}%</div>
          </div>
        </div>

        <div className="w-full md:w-2/5 space-y-3">
          {[bestsellersSidebar, bestsellersSidebar1].map((group, idx) => (
            <div className="w-full" key={idx}>
              {group?.slice(0, 1).map((item) => (
                <Link to={`/product/${item.id}`} key={item.id}>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 md:h-40 object-cover rounded-lg"
                    />
                    <div className="flex flex-col sm:flex-row justify-between text-gray-600 mt-1 text-sm">
                      <div>
                        <span className="text-red-600 font-semibold text-sm">${bestsellers[0]?.price}</span>
                        <span className="text-gray-400 line-through text-xs ml-1">${bestsellers[0]?.originalPrice}</span>
                        <div className="w-10 py-1 px-1 bg-red-600 text-white text-xs mt-1">-{bestsellers[0]?.discount}%</div>
                      </div>
                      <div className="mt-1 sm:mt-0">{item.title}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Side - Top Brands and Weekly Deals */}
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      {/* Top Brands */}
      <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4">Top Brands</h2>
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
                  <span className="text-red-600 font-semibold">${item.price}</span>
                  <span className="text-gray-400 line-through text-xs ml-2">${item.originalPrice}</span>
                </div>
                <span className="inline-block bg-red-600 text-white px-2 py-0.5 text-xs mt-1">-{item.discount}%</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Weekly Deals */}
      <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Weekly Deals</h2>
            <p className="text-sm text-gray-600 mb-4">Low prices in the past 30 days</p>
          </div>

          {weeklyDeals?.slice(0, 2).map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 md:h-40 object-cover rounded-lg"
                />
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-red-600 font-semibold">${item.price}</span>
                  <span className="text-gray-400 line-through text-xs ml-1">${item.originalPrice}</span>
                </div>
                <span className="inline-block bg-red-600 text-white px-2 py-0.5 text-xs mt-1">-{item.discount}%</span>
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
