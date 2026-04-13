import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Banner {
  id: number;
  image: string;
  title?: string;
  description?: string;
  link?: string;
}

const fetchBanners = async (): Promise<Banner[]> => {
  const { data } = await axios.get<Banner[]>("/banner.json");
  return data;
};

const Banner: React.FC = () => {
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery<Banner[]>({
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
                src={banner1?.image || ""}
                alt="Banner 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner1?.title || "Welcome to Our Store"}</h2>
                  <p className="text-lg md:text-xl mb-6">{banner1?.description || "Discover amazing products"}</p>
                  <button className="bg-[#A8537B] hover:bg-[#914468] text-white px-6 py-3 rounded-lg font-medium transition">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full md:w-7xl lg:w-full h-[300px] md:h-[550px] ">
              <img
                src={banner2?.image || ""}
                alt="Banner 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner2?.title || "Special Offers"}</h2>
                  <p className="text-lg md:text-xl mb-6">{banner2?.description || "Limited time deals"}</p>
                  <button className="bg-[#A8537B] hover:bg-[#914468] text-white px-6 py-3 rounded-lg font-medium transition">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full md:w-7xl lg:w-full h-[300px] md:h-[550px] ">
              <img
                src={banner3?.image || ""}
                alt="Banner 3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner3?.title || "New Arrivals"}</h2>
                  <p className="text-lg md:text-xl mb-6">{banner3?.description || "Latest products"}</p>
                  <button className="bg-[#A8537B] hover:bg-[#914468] text-white px-6 py-3 rounded-lg font-medium transition">
                    Explore Now
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
