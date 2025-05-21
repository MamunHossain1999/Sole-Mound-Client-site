import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Add Autoplay
import "swiper/css";
import "swiper/css/navigation";


const fetchBigBrandDeals = async() => {
  const { data } = await axios.get('/bigBrandDeals.json'); 
  return data;
};

const BigBrandDeals = () => {
  const { data:brandImages=[], isLoading, isError } = useQuery({
    queryKey: ['big-brand'],
    queryFn: fetchBigBrandDeals ,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="my-8 ">
      <h2 className="text-[36px] font-bold mb-6 text-[#000000]">
        Big brands deals
      </h2>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }} // Auto sliding
        loop={true} 
        modules={[Navigation, Autoplay]} 
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {brandImages.map((item, index) => (
          <SwiperSlide key={index}>
            <div key={index}  className="bg-[#FDF1F7] h-auto rounded-lg overflow-hidden hover:border border-[#C8A8E9]   cursor-pointer duration-300 p-4">
              <div className="">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-xl mb-4 "
                />

                <h3 className="font-semibold text-[#1F1F1F] text-lg  line-clamp-2 h-10">{item.title}</h3>
                <h5 className="font-lg text-[#1F1F1F] text-[16px]  line-clamp-2 h-12">{item.description}</h5>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BigBrandDeals;
