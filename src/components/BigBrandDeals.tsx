import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Big Brand interface
interface BigBrand {
  id: string | number;
  name: string;
  title: string;
  description: string;
  image: string;
}

// Fetch function with typed response
const fetchBigBrandDeals = async (): Promise<BigBrand[]> => {
  const { data } = await axios.get<BigBrand[]>('/bigBrandDeals.json'); 
  return data;
};

const BigBrandDeals: React.FC = () => {
  const { data: brandImages = [], isLoading, isError } = useQuery<BigBrand[]>({
    queryKey: ['big-brand'],
    queryFn: fetchBigBrandDeals,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="my-8 ">
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
          1440: { slidesPerView: 4 }
        }}
      >
        {brandImages?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-[#FDF1F7] cursor-pointer h-auto rounded-lg overflow-hidden border border-transparent hover:border-[#C8A8E9] transition-all duration-600 p-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-52 object-cover rounded-xl mb-4 "
              />
              <h3 className="font-semibold text-[#1F1F1F] text-base line-clamp-2 h-10">{item.title}</h3>
              <h5 className="font-normal text-[#1F1F1F] text-sm line-clamp-3 h-16">{item.description}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BigBrandDeals;