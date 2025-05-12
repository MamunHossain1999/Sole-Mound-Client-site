import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const fetchAllFeaturedProducts = async () => {
  const { data } = await axios.get("/featured.json");
  return data;
};

const RelatedProducts = () => {
  const { id } = useParams(); // current product ID

  const {
    data: allProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-featured-products"],
    queryFn: fetchAllFeaturedProducts,
  });

  const currentProduct = allProducts.find((p) => String(p.id) === String(id));
  const relatedProducts = allProducts.filter(
    (p) =>
      p.category === currentProduct?.category && String(p.id) !== String(id)
  );


  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    
  };

  if (isLoading)
    return <p className="text-center">Loading related products...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="container mx-auto">
      <h3 className="text-[20px] font-bold text-[#1F1F1F] py-5 ">
        Related Products
      </h3>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {relatedProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg overflow-hidden border border-[#E2E3E8] duration-300">
              <div className="p-3">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      {star <= product.rating ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="font-medium text-[#1F1F1F] text-[16px] mb-2 line-clamp-2 h-12">
                  {product.name}
                </h3>

                <div className="flex items-center mb-2">
                  <span className="font-bold text-[#0F0F0F] text-lg">
                    ${product.currentPrice}
                  </span>
                  <span className="text-gray-500 line-through text-sm ml-2">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 ml-2 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                </div>

                <div className="text-green-600 text-sm mb-4">
                  In stock - {product.stock}
                </div>

                <div className="flex space-x-2">
                  {/* Add to Cart */}
                  <button
                    // onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-white border text-[#1F1F1F] h-[46px] border-[#B6B7BC] rounded-md px-4 py-2 text-[16px] hover:bg-[#C8A8E9] w-full"
                  >
                    Add to Cart
                  </button>
                  {/* View Details */}
                  <Link
                    to={`category-search-page${product.id}`}
                    className="flex-1"
                  >
                    <button className="bg-white border h-[46px] text-[#1F1F1F] border-[#B6B7BC] rounded-md px-4 py-2 text-[16px] hover:bg-[#C8A8E9] w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProducts;
