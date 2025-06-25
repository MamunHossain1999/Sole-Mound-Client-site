import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";

const fetchAllFeaturedProducts = async () => {
  const { data } = await axios.get("/featured.json");
  return data;
};

const RelatedProducts = () => {
  const { id } = useParams();

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

  const handleAddToCart = async (product) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/add`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  if (isLoading)
    return <p className="text-center">Loading related products...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
        modules={[Pagination]}
        className="mySwiper pb-16"
      >
        {relatedProducts?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="mx-auto border hover:border-[#919191] transition-all duration-600">
              <div className="p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[250px] object-cover mb-4"
                />

                <div className="flex items-center mb-2">
                  <div className="flex items-center text-[#FFC61C] text-base">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.round(product.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <span className="text-[#919191] ml-1 text-[12px]">
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
                  <span className="text-[#FF1C1C] text-sm px-2 py-1 ml-2 rounded">
                    {product.discount}% OFF
                  </span>
                </div>

                <div className="text-[#22C55E] text-base mb-3">
                  In stock - {product.stock}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 border text-[#1F1F1F] h-[46px] border-[#E3AADD] rounded-md px-4 py-2 text-sm md:text-base bg-[#E3AADD] w-full cursor-pointer"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/related-product-details/${product.id}`}
                    className="flex-1"
                  >
                    <button className="bg-white border h-[46px] text-[#1F1F1F] border-[#E3AADD] rounded-md px-2 py-2 text-sm md:text-base hover:bg-[#E3AADD] w-full cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Default Swiper pagination already handled inside Swiper component */}
      <div className="custom-swiper-pagination mt-4 flex justify-center gap-2"></div>
    </div>
  );
};

export default RelatedProducts;
