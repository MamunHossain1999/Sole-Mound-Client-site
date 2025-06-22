import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBanners = async () => {
  const { data } = await axios.get("/banner.json");
  return data;
};

const Banner = () => {
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
  });

  const banner1 = banners[0];
  const banner2 = banners[1];
  const banner3 = banners[2];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <section className="">
      <div className="w-full mx-auto ">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 200000, disableOnInteraction: false }}
          loop={true}
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full md:w-7xl lg:w-full h-[300px] md:h-[550px] ">
              <img
                src={banner1.image}
                alt="Banner"
                className="w-full h-full object-cover  "
              />
              <div className="absolute inset-0 flex items-center justify-center md:pl-80 px-4 md:px-20">
                <div className="text-center md:text-left space-y-4 text-[#000000] max-w-[600px]">
                  <p className="text-sm md:text-xl text-[#D76A9D] font-semibold drop-shadow">
                    {banner1.subtitle}
                  </p>
                  <h2 className="text-[18px] md:text-4xl font-extrabold drop-shadow">
                    {banner1.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#8A8FB9] font-medium drop-shadow">
                    {banner1.description}
                  </p>
                  <button className="bg-[#C8A8E9] hover:bg-[#aa7bd8] text-[#1F1F1F] font-bold rounded-[10px] px-6 py-2 text-sm md:text-lg transition duration-300">
                    {banner1.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-[300px] md:h-[550px]">
              {/* Background Image */}
              <img
                src={banner2.image}
                alt="Banner"
                className="w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center px-4 md:px-20">
                <div className="text-white space-y-4">
                  <h2 className="text-2xl md:text-6xl font-extrabold drop-shadow">
                    {banner2.title}
                  </h2>
                  <p className="text-base md:text-xl font-semibold drop-shadow">
                    {banner2.subtitle}
                  </p>
                  <button className="bg-[#C8A8E9] hover:bg-[#aa7bd8] text-[#1F1F1F] font-bold rounded-[10px] px-6 py-2 text-sm md:text-lg transition duration-300">
                    {banner2.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-[300px] md:h-[550px]">
              {/* Background Image */}
              <img
                src={banner3.image}
                alt="Banner 3"
                className="w-full h-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-start md:justify-start px-4 md:px-20">
                <div className="text-center md:text-left space-y-3 max-w-[500px]">
                  <p className="text-[18px] md:text-4xl text-[#151875] font-bold">
                    {banner3.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-[#FDF1F7] font-normal">
                    {banner3.title}
                  </p>
                  <p className="text-sm md:text-base text-[#FDF1F7] font-normal">
                    {banner3.description}
                  </p>
                  <button className="bg-[#82405F] hover:bg-[#aa7bd8] text-white text-base md:text-[20px] font-bold px-6 py-2 mt-3 rounded transition duration-300">
                    {banner3.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
