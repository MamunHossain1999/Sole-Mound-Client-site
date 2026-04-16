import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "@/Redux/api/orderApi";

const OrderhistoryPage = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10">Something went wrong!</p>;

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-[#D3F3DF] text-[#22C55E]";
      case "pending":
        return "bg-[#F6E3AED1] text-[#505050]";
      case "returned":
        return "bg-[#F1DAFC] text-[#CC5F5F]";
      case "in progress":
        return "bg-[#19466A3D] text-[#5570F1]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto bg-white px-3 sm:px-6 py-4">

      <h2 className="text-lg sm:text-2xl font-medium text-[#1F1F1F] py-3">
        Order History
      </h2>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <div className="grid grid-cols-5 py-4 px-4 bg-[#FDF1F7] rounded-md text-[16px] font-medium text-[#505050]">
          <div>Order ID</div>
          <div>Status</div>
          <div>Date</div>
          <div>Total</div>
          <div className="text-right pr-6">Action</div>
        </div>

        <div className="space-y-4 mt-4">
          {currentOrders.map((order: any, index: number) => (
            <div
              key={order._id}
              className="grid grid-cols-5 items-center gap-4 p-4 border rounded-lg"
            >
              <div className="truncate">{order.id}</div>

              <div>
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusBadgeColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </div>

              <div className="text-sm text-gray-600">
                ${order.price}
              </div>

              <div className="relative flex justify-end">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === index ? null : index)
                  }
                >
                  <MoreVertical />
                </button>

                {activeMenu === index && (
                  <div className="absolute z-50 right-0 top-8 w-32 bg-white border rounded shadow">
                    <Link to={`/return-page/${order._id}`}>
                      <button className="w-full px-3 py-2 text-left text-red-500 hover:bg-gray-100">
                        Refund
                      </button>
                    </Link>

                    <Link to={`/dashboard/order-details-page/${order._id || order.id}`}>
                      <button className="w-full px-3 py-2 text-left hover:bg-gray-100">
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

      {/* ================= MOBILE CARD ================= */}
      <div className="md:hidden space-y-4">
        {currentOrders.map((order: any, index: number) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium truncate w-[70%]">
                {order.id}
              </p>

              <button onClick={() =>
                setActiveMenu(activeMenu === index ? null : index)
              }>
                <MoreVertical />
              </button>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <span
                className={`px-2 py-1 rounded text-xs ${getStatusBadgeColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>

              <span>${order.price}</span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(order.date).toLocaleDateString()}
            </p>

            {activeMenu === index && (
              <div className="mt-3 border-t pt-2 space-y-2">
                <Link to={`/return-page/${order._id}`}>
                  <button className="text-red-500 w-full text-left">
                    Refund
                  </button>
                </Link>

                <Link to={`/dashboard/order-details-page/${order._id}`}>
                  <button className="w-full text-left">
                    Details
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex z-10 flex-wrap justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderhistoryPage;