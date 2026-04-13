import React, { useRef, useState } from 'react';
import { MoreVertical } from "lucide-react";
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const orderHistory = async () => {
  const { data } = await axios.get("/orderHistory.json");
  return data;
};

const OrderhistoryPage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRefs = useRef([]);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["history"],
    queryFn: orderHistory,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#D3F3DF] text-[#22C55E]";
      case "Pending":
        return "bg-[#F6E3AED1] text-[#505050]";
      case "Returned":
        return "bg-[#F1DAFC] text-[#CC5F5F]";
      case "In Progress":
        return "bg-[#19466A3D] text-[#5570F1]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto bg-white pt-2 pb-12 px-4">
      <h2 className="text-[24px] font-medium text-[#1F1F1F] py-4">Order History</h2>

      {/* Header */}
      <div className="hidden md:grid grid-cols-5 py-4 px-4 bg-[#FDF1F7] rounded-md text-[16px] font-medium text-[#505050] ">
        <div>Order ID</div>
        <div className='pl-2'>Status</div>
        <div className='pl-2'>Date</div>
        <div className='pl-2'>Total</div>
        <div className='pl-14'>Action</div>
      </div>

      {/* Orders */}
      <div className="space-y-4 mt-4">
        {data.map((order, index) => (
          <div key={index} className="flex flex-col md:grid grid-cols-5 items-center gap-4 p-4 border border-[#F1DAFC] rounded-lg bg-white relative">
            <div className="text-[#1F1F1F] text-[16px]">{order.id}</div>
            <div>
              <span className={`px-3 py-1 inline-flex rounded-md text-[14px] font-medium ${getStatusBadgeColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="text-[#505050] text-[16px]">{order.date}</div>
            <div className="text-[#505050] text-[16px]">{order.total}</div>

            {/* Action Button */}
            <div className="relative flex z-10 -">
              <button
                onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                className="text-[#1F1F1F] cursor-pointer pl-14"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {activeMenu === index && (
                <div
                  ref={(el) => (menuRefs.current[index] = el)}
                  className="absolute right-0 top-0 w-32 bg-white border border-gray-200 rounded-md "
                >
                  {order?.id && (
                    <Link to={`/return-page/${order.id}`}>
                      <button className="w-full px-4 py-2 text-[16px] text-[#FF1C1C] font-semibold hover:bg-gray-100 text-left">
                        Refund
                      </button>
                    </Link>
                  )}
                  <Link to={`/dashboard/order-details-page/${order.id}`}>
                    <button className="w-full px-4 py-2 text-[16px] text-[#1F1F1F] font-semibold hover:bg-gray-100 text-left">
                      Details
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderhistoryPage;
