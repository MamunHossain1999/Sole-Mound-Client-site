import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGetBannersQuery } from "@/Redux/api/bannerApi";

const Banner: React.FC = () => {
  const { data: banners = [], isLoading, isError } = useGetBannersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <section>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Navigation, Autoplay, Pagination]}
      >
        {banners.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative w-full h-[300px] md:h-[550px]">
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-center px-4">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {item.title}
                  </h2>

                  <p className="text-lg md:text-xl mb-6">{item.description}</p>

                  <button className="bg-[#A8537B] px-6 py-3 rounded-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
