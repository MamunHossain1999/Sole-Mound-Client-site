import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useGetTrendingProductsQuery } from "@/Redux/api/trendingApi";
import { Link } from "react-router-dom";

/* ================= TYPE ================= */
interface TrendingProduct {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
  title?: string;
  description?: string;
}

/* ================= COMPONENT ================= */

const BigBrandDeals: React.FC = () => {
  const {
    data: brandImages = [],
    isLoading,
    isError,
  } = useGetTrendingProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="my-8">
      <h2 className="text-base md:text-[25px] lg:text-4xl font-bold mb-2 md:mb-6 text-[#000000]">
        Big brands deals
      </h2>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
      >
        {brandImages?.map((item: TrendingProduct) => (
          <SwiperSlide key={item._id}>
            <Link to={`/product-details/${item._id}`}>
              <div className="bg-[#FDF1F7] cursor-pointer h-auto rounded-lg overflow-hidden border border-transparent hover:border-[#C8A8E9] transition-all duration-500 p-4">
                {/* IMAGE */}
                <img
                  src={item.image || item.images?.[0] || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                {/* TITLE */}
                <h3 className="font-semibold text-[#1F1F1F] text-base line-clamp-2 h-10">
                  {item.title || item.name}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BigBrandDeals;
