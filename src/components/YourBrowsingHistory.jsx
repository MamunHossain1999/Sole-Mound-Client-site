import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import favoriteIcon from '../assets/navbarIcon/Vector (3).png';
import cardIcon from '../assets/navbarIcon/Vector (4).png';
import { FaRegEye } from 'react-icons/fa';

const fetchYourBrowsingHistory = async () => {
  const { data } = await axios.get('/yourBrowsingHistory.json');
  return data;
};

const YourBrowsingHistory = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['history-products'],
    queryFn: fetchYourBrowsingHistory,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative group bg-[#F8F8F8] hover:bg-[#FDF1F7] rounded-lg overflow-hidden cursor-pointer duration-400 hover:border hover:border-[#C8A8E9]">
              {/* 👇 Hover Icons */}
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <button className="bg-white p-4 rounded-full hover:bg-[#C8A8E9]">
                    <img src={favoriteIcon} alt="favoriteIcon" />
                  </button>
                  <button className="bg-white p-4 rounded-full hover:bg-[#C8A8E9]">
                    <img src={cardIcon} alt="cardIcon" />
                  </button>
                  <button className="bg-white p-4 rounded-full hover:bg-[#C8A8E9]">
                    <FaRegEye className="text-gray-700 text-lg" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover bg-white rounded-lg mb-4 p-3"
                />

                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-[16px]">
                      {star <= product.rating ? '★' : '☆'}
                    </span>
                  ))}
                  <span className="text-[#919191] ml-1">({product.rating})</span>
                </div>

                <h3 className="font-medium text-[#1F1F1F] text-[16px] mb-2 line-clamp-2 h-12">
                  {product.name}
                </h3>

                <div className="flex items-center mb-2">
                  <span className="text-[#3CA6FC] text-lg font-bold">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Custom Pagination Container - dots will appear here */}
      <div className="custom-swiper-pagination mt-4 flex justify-center gap-2"></div>
    </div>
  );
};

export default YourBrowsingHistory;
