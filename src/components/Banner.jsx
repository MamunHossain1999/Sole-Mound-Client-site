import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import banner1 from "../assets/home/banner1.png";

const Banner = () => {
  const bannerSlides = [
    {
      id: 1,
      image: banner1,
      title: "Save Big on New Arrivals",
      subtitle: "Special Discount!",
      description: "Shop now and enjoy exclusive deals on all categories.",
      buttonText: "Explore Now"
    },
    {
      id: 2,
      image: banner1,
      title: "Buy 1 Get 1 Free",
      subtitle: "Hot Offer!",
      description: "Don't miss this opportunity! Offer ends soon.",
      buttonText: "Grab Now"
    },
    {
      id: 3,
      image: banner1,
      title: "Summer Collection 2025",
      subtitle: "New Season!",
      description: "Discover our latest styles perfect for this season.",
      buttonText: "View Collection"
    },
    {
      id: 4,
      image: banner1,
      title: "Premium Products",
      subtitle: "Top Quality!",
      description: "High-end products with ultimate comfort and style.",
      buttonText: "Shop Premium"
    }
  ];

  return (
    <section className="bg-[#FDF1F7] pb-2">
      <div className="w-full h-[550px] mx-auto overflow-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={false}
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          className="h-full"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-12 h-full">
                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                  <img
                    src={slide.image}
                    alt={`Banner ${slide.id}`}
                    className="w-[500px] object-contain"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <p className="text-indigo-600 text-[16px] md:text-[#D76A9D] font-semibold">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#000000] leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600">{slide.description}</p>
                  <button
                    className="inline-block bg-[#C8A8E9] hover:bg-[#aa7bd8] text-white font-semibold rounded-md px-6 py-3 transition duration-300 cursor-pointer"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
