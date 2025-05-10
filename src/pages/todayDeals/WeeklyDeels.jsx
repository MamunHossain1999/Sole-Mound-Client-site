import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaHeart as FaHeartRegular } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchWeekly = async () => {
  const { data } = await axios.get('/weekly.json');
  return data;
};

const calculateRemainingTime = (endDate) => {
  const totalMs = new Date(endDate) - new Date();
  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return { totalMs, days, hours, minutes, seconds };
};

const WeeklyDeals = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['big-brand'],
    queryFn: fetchWeekly,
  });

  const [filteredDeals, setFilteredDeals] = useState([]);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (data.length) {
      const validDeals = data.filter(deal => {
        const start = new Date(deal.startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 16);
        return new Date() < end;
      });

      setFilteredDeals(validDeals);

      const soonestEnd = validDeals.reduce((earliest, deal) => {
        const start = new Date(deal.startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 16);
        return !earliest || end < earliest ? end : earliest;
      }, null);

      if (soonestEnd) {
        const interval = setInterval(() => {
          const { totalMs, days, hours, minutes, seconds } = calculateRemainingTime(soonestEnd);
          if (totalMs <= 0) {
            clearInterval(interval);
            setCountdown(null);
          } else {
            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Weekly Best Deals</h2>
          {countdown ? (
            <div className="bg-indigo-100 text-indigo-600 rounded-md px-3 py-1 text-sm font-medium">
              Deals end in <span className="font-bold">{countdown}</span>
            </div>
          ) : (
            <div className="text-red-600 font-medium text-sm">Deals expired</div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDeals.map(deal => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              {deal.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">{deal.discount}</span>
              )}
              {deal.label && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1">{deal.label}</span>
              )}
              <img src={deal.imageUrl} alt={deal.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 truncate">{deal.title}</h3>
                {deal.originalPrice && deal.discountedPrice ? (
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="line-through">${deal.originalPrice.toFixed(2)}</span>
                    <span className="font-semibold text-red-600 ml-2">${deal.discountedPrice.toFixed(2)}</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-gray-800">${deal.price ? deal.price.toFixed(2) : ''}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <button className="bg-indigo-500 text-white rounded-md px-3 py-2 text-sm hover:bg-indigo-600 focus:outline-none flex items-center">
                    <FaCartPlus className="mr-2" /> Add to Cart
                  </button>
                  <button className="text-gray-500 hover:text-red-500 focus:outline-none">
                    <FaHeartRegular />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyDeals;
