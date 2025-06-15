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
    const { data: banners = [], isLoading, isError } = useQuery({
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
      <div className="w-full h-[550px] mx-auto overflow-hidden " >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 90000, disableOnInteraction: false }}
          loop={true}
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className=" w-full md:h-[550px] md:my-6" >
              <div className="mx-auto flex flex-col md:flex-row-reverse items-center justify-between ">
                <div className="w-full flex relative ">
                  <img src={banner1.image} alt="Banner 1" className="w-full object-contain" />
                </div>
                <div className="w-full md:w-4/7 text-right pr-3 md:text-left space-y-4 absolute">
                  <p className="text-base text-[#D76A9D] font-semibold" >
                    {banner1.subtitle}
                  </p>
                  <h2 className="md:w-[430px] text-base md:text-4xl font-bold text-[#000000]" >
                    {banner1.title}
                  </h2>
                  <p className="text-[#8A8FB9] text-base font-semibold" >{banner1.description}</p>
                  <button className="inline-block bg-[#C8A8E9] hover:bg-[#aa7bd8] text-white font-semibold  px-6 py-2 transition duration-300 cursor-pointer">
                    {banner1.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="h-full w-full py-5" >
              <div className=" mx-auto flex flex-col md:flex-row-reverse items-center justify-between ">
                <div className="w-full  flex relative ">
                  <img src={banner2.image} alt="Banner 2" className="w-full object-contain" />
                </div>
                <div className="w-full mx-auto px-52 text-center md:text-left absolute">
                  <p className="text-[16px] md:text-[96px] text-[#FFFFFF] font-medium" >
                    {banner2.subtitle}
                  </p>
                  <p className="text-3xl md:text-[52px] text-[#ffffff] font-bold" >
                    {banner2.title}
                  </p>
                  <p >{banner2.description}</p>
                  <button className="inline-block bg-[#C8A8E9] hover:bg-[#aa7bd8] text-[#1F1F1F] text-2xl mt-5 font-bold rounded-[20px] px-6 py-2 transition duration-300 cursor-pointer">
                    {banner2.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="h-full w-full py-5" >
              <div className=" mx-auto flex flex-col md:flex-row-reverse items-center justify-between ">
                <div className="w-full  flex relative ">
                  <img src={banner3.image} alt="Banner 2" className="w-full object-contain" />
                </div>
                <div className="w-full mx-auto px-52 text-center md:text-left absolute">
                  <p className="text-[16px] md:text-4xl md:w-[485px] text-[#151875] font-bold" >
                    {banner3.subtitle}
                  </p>
                  <p className="text-base md:text-base text-[#FDF1F7] md:w-[460px] my-3 font-normal" >
                    {banner3.title}
                  </p>
                  <p className="text-base md:text-base text-[#FDF1F7] md:w-[460px] font-normal" >{banner3.description}</p>
                  <button className="inline-block bg-[#82405F] hover:bg-[#aa7bd8] text-[#FFFFFF] text-[20px] mt-5 font-bold  px-6 py-2 transition duration-300 cursor-pointer">
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
