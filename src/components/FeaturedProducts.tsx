/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import { useGetProductsQuery } from "@/Redux/api/productApi";
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";

interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  discount: number;
  quantity: number;
}

const FeaturedProducts: React.FC = () => {
  const { data = [], isLoading, isError } = useGetProductsQuery();
  const { data: reviewsResponse = [] } = useGetAllReviewsQuery();
  const reviewsData = Array.isArray(reviewsResponse)
    ? reviewsResponse
    : reviewsResponse?.data || [];

  // console.log(reviewsResponse);
  // console.log(reviewsData);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((product: Product) => {
          const productReviews = reviewsData.filter(
            (r: any) => r.product?._id === product._id,
          );
          const ratingsCount = productReviews.length;

          const ratingsAverage =
            ratingsCount > 0
              ? productReviews.reduce(
                  (acc: number, r: any) => acc + r.rating,
                  0,
                ) / ratingsCount
              : 0;

          // 💰 discount price
          const discountedPrice =
            product.price - (product.price * (product.discount || 0)) / 100;

          return (
            <SwiperSlide key={product._id}>
              <div className="bg-[#FDF1F7] mx-auto rounded-lg border border-transparent hover:border-[#C8A8E9] transition-all duration-600">
                <div className="p-4">
                  <img
                    src={product.images?.[0] || "/no-image.png"}
                    alt={product.name}
                    className="w-full h-[250px] object-cover mb-4"
                  />

                  {/* ⭐ Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-[#FFC61C] text-base">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {i < Math.round(ratingsAverage) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#919191] ml-1 text-[12px]">
                      ({ratingsCount})
                    </span>
                  </div>

                  <h3 className="font-normal text-[#191C1F] text-base mb-2 line-clamp-2 h-14">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <span className="font-bold text-[#000000] text-base">
                      ${discountedPrice.toFixed(2)}
                    </span>

                    {product.discount > 0 && (
                      <>
                        <span className="text-[#919191] line-through text-base ml-2">
                          ${product.price}
                        </span>
                        <span className="text-[#FF1C1C] text-sm px-2 py-1 ml-2 rounded">
                          {product.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="text-[#22C55E] text-base mb-3">
                    {product.quantity > 0
                      ? `In stock - ${product.quantity}`
                      : "Out of Stock"}
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/product-details/${product._id}`}
                      className="flex-1"
                    >
                      <button className="bg-white border h-[46px] text-[#1F1F1F] border-[#E3AADD] rounded-md px-2 py-2 text-sm md:text-base hover:bg-[#E3AADD] w-full cursor-pointer">
                        View Details
                      </button>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 border text-[#1F1F1F] h-[46px] border-[#E3AADD] rounded-md px-4 py-2 text-sm md:text-base bg-[#E3AADD] w-full cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
