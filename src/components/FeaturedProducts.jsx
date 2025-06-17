import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const fetchFeaturedProducts = async () => {
  const { data } = await axios.get("/featured.json");
  return data;
};

const FeaturedProducts = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        // pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#FDF1F7] mx-auto rounded-lg border border-transparent hover:border-[#C8A8E9] transition-all duration-600">
              <div className="p-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[200px] object-cover rounded-lg mb-4"
                />

                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <span key={star} className="text-[#FFC61C] text-base">
                      {star <= product.rating ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-[#919191] ml-1 text-base">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="font-normal text-[#191C1F] text-base mb-2 line-clamp-2 h-14">
                  {product.name}
                </h3>

                <div className="flex items-center mb-2">
                  <span className="font-bold text-[#000000] text-base">
                    ${product.currentPrice}
                  </span>
                  <span className="text-[#919191] line-through text-base ml-2">
                    ${product.originalPrice}
                  </span>
                  <span className="text-[#FF1C1C] text-base px-2 py-1 ml-2 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                </div>

                <div className="text-[#22C55E] text-base mb-3">
                  In stock - {product.stock}
                </div>

                <div className="flex space-x-2">
                  {/* View Details */}
                  <Link to={`category-search-page/${product.id}`} className="flex-1">
                    <button className="bg-white border h-[46px] text-[#1F1F1F] border-[#E3AADD] rounded-md px-4 py-2 text-[16px] hover:bg-[#C8A8E9] w-full">
                      View Details
                    </button>
                  </Link>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-white border text-[#1F1F1F] h-[46px] border-[#E3AADD] rounded-md px-4 py-2 text-[16px] hover:bg-[#C8A8E9] w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
