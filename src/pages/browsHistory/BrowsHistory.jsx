import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify"; 


const fetchDeals = async () => {
  const { data } = await axios.get("/browsHistory.json"); 
  return data;
};

const DealsCard = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
  });

  const [historyItems, setHistoryItems] = useState([]);

  React.useEffect(() => {
    if (data.length) {
      setHistoryItems(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AiFillStar
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  

const handleClearHistory = () => {
  setHistoryItems([]);
  toast.success("Browsing history cleared successfully!"); 
};

const handleSaveToWishlist = () => {
  console.log("Saved to wishlist!", historyItems);
  toast.success("All items saved to Wishlist!"); 
};


  return (
    <div className="container mx-auto">
      <div className="pt-4">
        <h2 className="text-base text-[#000000] font-semibold">Your Browsing History</h2>
        <p className="text-[#505050] text-base mb-4">
          These items were viewed recently. We use them to personalize recommendations.
        </p>
      </div>

      {historyItems.length === 0 ? (
        <div className="text-center text-gray-500 my-10">No browsing history found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 cursor-pointer">
          {historyItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#FDF1F7] border hover:border-[#C8A8E9]  rounded-lg p-4 overflow-hidden transition-all duration-300"
            >
              <div className="">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-45 object-fit rounded "
                />
              </div>
              <div className="p-3">
                <div className="flex items-center text-[#919191] mt-1">
                  {renderStars(item.rating)} ({item.reviewCount})
                </div>
                <h3 className="text-base font-normal text-[#191C1F] mt-1">
                  {item.name}
                </h3>
                <p className="text-base text-[#2DA5F3] font-semibold mt-3">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {historyItems.length > 0 && (
        <div className="flex justify-end gap-4 py-8">
          <button
            onClick={handleClearHistory}
            className="px-6 py-2 bg-white border border-[#B6B7BC] text-[#1F1F1F] text-base rounded hover:bg-[#C8A8E9]"
          >
            Clear All History
          </button>
          <button
            onClick={handleSaveToWishlist}
            className="px-6 py-2 bg-white border border-[#B6B7BC] text-[#1F1F1F] text-base rounded hover:bg-[#C8A8E9]"
          >
            Save to Wishlist
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsCard;
