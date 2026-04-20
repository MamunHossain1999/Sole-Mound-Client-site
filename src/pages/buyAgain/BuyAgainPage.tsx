import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";

import Pagination from "./Pagination";
import {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
} from "@/Redux/api/orderApi";
import { useAddCartMutation } from "@/Redux/api/cartApi";
import { useCreateCheckoutSessionMutation } from "@/Redux/api/paymentApi";
import { useGetProfileQuery } from "@/Redux/api/userApi";
import { toast } from "react-toastify";

interface OrderItem {
  _id?: string;
  productId?: string;
  product?: any;
  name: string;
  price: number | string;
  quantity: number;
  image?: string;
  imageUrl?: string;
}

interface Order {
  _id: string;
  orderNumber?: string;
  date?: string;
  orderDate?: string;
  deliveryDate?: string;
  total: number | string;
  shipTo?: string;
  items?: OrderItem[];
  products?: OrderItem[];
}

export default function BuyAgainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPeriod, setFilterPeriod] = useState("Past 3 Months");

  // RTK Queries
  const { data: allOrders = [], isLoading, isError } = useGetAllOrdersQuery();
  const { data: user } = useGetProfileQuery();

  const [addCart] = useAddCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  // Safe Filter Function
  const filterOrdersByPeriod = (orders: any[], period: string) => {
    const now = new Date();
    return orders.filter((order) => {
      const dateStr = order?.date || order?.orderDate;
      if (!dateStr) return false;

      const orderDate = new Date(dateStr);
      if (isNaN(orderDate.getTime())) return false;

      const diffInDays =
        (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);

      switch (period) {
        case "Past 3 Months":
          return diffInDays <= 93;
        case "Past 6 Months":
          return diffInDays <= 186;
        case "2024":
          return orderDate.getFullYear() === 2024;
        case "2023":
          return orderDate.getFullYear() === 2023;
        default:
          return true;
      }
    });
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    if (!allOrders || allOrders.length === 0) return [];
    return filterOrdersByPeriod(allOrders, filterPeriod);
  }, [allOrders, filterPeriod]);

  const pageSize = 4;
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Group by Date
  const groupedOrders = useMemo(() => {
    return paginatedOrders.reduce((acc: Record<string, Order[]>, order) => {
      const dateStr =
        order.deliveryDate || order.date || order.orderDate || "Unknown Date";
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(order);
      return acc;
    }, {});
  }, [paginatedOrders]);

  // Latest Order
  const latestOrder = useMemo(() => {
    if (filteredOrders.length === 0) return null;
    return [...filteredOrders].sort(
      (a, b) =>
        new Date(b.date || b.orderDate || 0).getTime() -
        new Date(a.date || a.orderDate || 0).getTime(),
    )[0];
  }, [filteredOrders]);

  // Safe Total Formatter
  const formatTotal = (total: any): string => {
    if (typeof total === "number") return total.toFixed(2);
    if (typeof total === "string") {
      const num = parseFloat(total);
      return isNaN(num) ? "0.00" : num.toFixed(2);
    }
    return "0.00";
  };

  // Buy It Again Handler
  const handleBuyItAgain = async (item: any) => {
    const productId = item._id || item.productId || item.product?._id;
    if (!productId) {
      toast.error("Product ID not found");
      return;
    }

    try {
      const finalPrice = Number(item.price) || 0;

      const orderRes = await createOrder({
        products: [
          {
            productId,
            name: item.name || item.product?.name || "Product",
            price: finalPrice,
            quantity: 1,
            image: item.image || item.imageUrl || "",
          },
        ],
        totalAmount: finalPrice,
        shippingAddress: {
          fullName: user?.name || "Guest",
          email: user?.email || "",
          phone: user?.phone || "",
          address: user?.address || "N/A",
          city: user?.city || "",
          postalCode: user?.postalCode || "",
          country: user?.country || "Bangladesh",
        },
      }).unwrap();

      const orderId: string | undefined = orderRes?.data?._id;
      if (!orderId) {
        toast.error("Failed to create order");
        return;
      }

      const paymentRes = await createCheckoutSession({
        orderId,
        totalAmount: finalPrice,
      }).unwrap();

      if (paymentRes?.url) {
        window.location.href = paymentRes.url;
      } else {
        toast.error("Payment session failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  // Add to Cart Handler
  const handleAddToCart = async (productId: string) => {
    if (!productId) return;
    try {
      await addCart({ productId, quantity: 1 }).unwrap();
      toast.success("Added to cart successfully!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading)
    return <p className="text-center py-20 text-lg">Loading your orders...</p>;
  if (isError)
    return (
      <p className="text-center py-20 text-red-500">Failed to load orders</p>
    );

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-24">
        {/* Header & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="bg-[#FDF1F7] rounded-lg px-6 py-3">
            <p className="text-[#475156] font-semibold text-lg">
              Buy It Again ({filteredOrders.length})
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <select
              value={filterPeriod}
              onChange={(e) => {
                setFilterPeriod(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#FDF1F7] w-full rounded-lg px-5 py-3 text-[#475156] font-semibold border border-[#E2E3E8] appearance-none focus:outline-none"
            >
              <option value="Past 3 Months">Past 3 Months</option>
              <option value="Past 6 Months">Past 6 Months</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {/* Latest Order Summary */}
        {latestOrder && (
          <div className="bg-[#FDF1F7] p-6 rounded-xl shadow-sm mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-[#475156] font-semibold">Order Placed</p>
                <p className="text-sm text-gray-600">
                  {new Date(
                    latestOrder.date || latestOrder.orderDate,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-[#475156] font-semibold">Total</p>
                <p className="text-sm text-gray-600">
                  ${formatTotal(latestOrder.total)}
                </p>
              </div>
              <div>
                <p className="text-[#475156] font-semibold">Ship To</p>
                <p className="text-sm text-gray-600">
                  {latestOrder.shipTo || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[#475156] font-semibold">Order #</p>
                <p className="text-sm text-gray-600">
                  {latestOrder.orderNumber || latestOrder._id}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        {Object.keys(groupedOrders).length === 0 ? (
          <p className="text-center text-gray-500 py-20 text-lg">
            No orders found in this period.
          </p>
        ) : (
          Object.entries(groupedOrders).map(([date, dateOrders]) => (
            <div key={date} className="mb-12">
              <h3 className="text-2xl font-semibold text-[#1F1F1F] mb-6">
                Delivered on {date}
              </h3>

              {dateOrders.map((order, orderIdx) => {
                const items = order.items || order.products || [];

                return items.map((item: any, itemIdx: number) => (
                  <div
                    key={`${orderIdx}-${itemIdx}`}
                    className="bg-[#FDF1F7] rounded-xl p-5 mb-5 flex flex-col md:flex-row gap-6 items-start md:items-center"
                  >
                    {/* Image */}
                    <div className="w-28 h-28 flex-shrink-0 bg-white rounded-lg p-2">
                      <img
                        src={
                          item.image ||
                          item.imageUrl ||
                          item.product?.image ||
                          "/placeholder.jpg"
                        }
                        alt={item.name}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-medium text-[#1F1F1F]">
                        {item.name || item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {item.quantity || 1} • $
                        {Number(item.price || 0).toFixed(2)}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => handleBuyItAgain(item)}
                        className="bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        Buy It Again
                        <RefreshCw className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleAddToCart(
                            item._id || item.productId || item.product?._id,
                          )
                        }
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-[#475156] font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                        Add to Cart
                        <MdOutlineShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ));
              })}
            </div>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
