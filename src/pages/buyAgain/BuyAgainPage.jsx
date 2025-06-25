import React, { useState } from "react";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";
import Pagination from "./Pagination";

// Group orders by delivery date
const groupByDate = (orders) => {
  return orders.reduce((acc, order) => {
    const date = new Date(order.deliveryDate?.replace("Delivered ", ""));
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(order);
    return acc;
  }, {});
};

// Filter orders by selected time period
const filterOrdersByPeriod = (orders, period) => {
  const now = new Date();
  return orders.filter((order) => {
    const orderDate = new Date(order.orderDate);
    const diffInDays = (now - orderDate) / (1000 * 60 * 60 * 24);

    switch (period) {
      case "Past 3 Months":
        return diffInDays <= 90;
      case "Past 6 Months":
        return diffInDays <= 180;
      case "2024":
        return orderDate.getFullYear() === 2024;
      case "2023":
        return orderDate.getFullYear() === 2023;
      default:
        return true;
    }
  });
};

// Fetch orders
const fetchOrders = async () => {
  const res = await axios.get("/buyAgain.json");
  return res.data.orders;
};

export default function BuyAgainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPeriod, setFilterPeriod] = useState("Past 3 Months");

  const { data: allOrders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const filteredOrders = filterOrdersByPeriod(allOrders, filterPeriod);
  const latestOrder =
    filteredOrders.length > 0
      ? [...filteredOrders].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        )[0]
      : null;

  const pageSize = 3;
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedOrders = filteredOrders.slice(start, end);
  const groupedOrders = groupByDate(paginatedOrders);

  return (
    <div className="bg-white min-h-auto py-10">
      <div className="container mx-auto px-4 lg:px-24">
        {/* Filter & Header */}
        <div className="my-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="bg-[#FDF1F7] rounded-lg px-4 py-3">
            <p className="text-[#475156] font-semibold text-base">
              Your Orders ({filteredOrders.length})
            </p>
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={filterPeriod}
              onChange={(e) => {
                setFilterPeriod(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#FDF1F7] rounded-lg px-5 py-3 text-[#475156] font-semibold text-base w-full appearance-none focus:outline-none pr-10 border border-[#E2E3E8]"
            >
              <option value="Past 3 Months">Past 3 Months</option>
              <option value="Past 6 Months">Past 6 Months</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-5 h-5 text-[#ADB7BC]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Latest Order Summary */}
        {latestOrder && (
          <div className="bg-[#FDF1F7] p-5 rounded-md shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
                <div>
                  <p className="text-[#475156] font-semibold text-base mb-1">
                    Orders Placed
                  </p>
                  <p className="text-[#505050] text-sm font-normal">
                    {new Date(latestOrder.orderDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[#475156] font-semibold text-base mb-1">
                    Total
                  </p>
                  <p className="text-[#505050] text-sm font-normal">
                    ${latestOrder.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[#475156] font-semibold text-base mb-1">
                    Ship To
                  </p>
                  <p className="text-[#505050] text-sm font-normal">
                    {latestOrder.shipTo || "N/A"}
                  </p>
                </div>
                <div className="flex flex-col mt-4 md:mt-0">
                  <p className="text-[#475156] font-semibold text-base mb-1">
                    Order #{latestOrder.orderNumber || "N/A"}
                  </p>
                  <button
                    className="text-[#3CA6FC] text-sm font-normal hover:underline"
                    onClick={() =>
                      alert(`View details for order #${latestOrder.orderNumber}`)
                    }
                  >
                    View Order Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="md:p-4">
          {Object.entries(groupedOrders).map(([date, dateOrders]) => (
            <div key={date} className="mb-8">
              <h3 className="text-2xl font-medium text-[#1F1F1F] mb-4">
                Delivered on {date}
              </h3>

              {dateOrders.map((order, orderIdx) =>
                order.items.map((item, itemIdx) => (
                  <div
                    key={`${orderIdx}-${itemIdx}`}
                    className="max-w-6xl w-full mx-auto bg-[#FDF1F7] rounded-lg mb-4 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-auto flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full sm:w-32 h-auto object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow w-full md:w-[36px]">
                      <p className="text-sm text-[#475156] mb-1">{item.name}</p>
                      <p className="text-sm text-[#3CA6FC]">
                        Return or replace items: {item.returnEligible}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:items-end gap-4 sm:gap-8 w-full sm:w-auto">
                      <button className="bg-[#C8A8E9] hover:bg-purple-300 rounded-lg px-3 py-2 cursor-pointer text-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                        <span className="text-[#1F1F1F] text-base font-semibold">
                          Buy It Again
                        </span>
                        <RefreshCw className="h-4 w-4 text-[#1F1F1F]" />
                      </button>

                      <button className="bg-white border border-[#B6B7BC] text-[#475156] rounded-lg px-3 py-2 cursor-pointer text-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                        <span className="text-[#1F1F1F] text-base font-semibold">
                          Add to Cart
                        </span>
                        <MdOutlineShoppingCart  className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
