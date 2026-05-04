import {
  useGetOrderByIdQuery,
  useUpdateOrderCommentMutation,
  useUpdateOrderStatusMutation,
} from "@/Redux/api/orderApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
interface Product {
  id: string;
  name: string;
  images: string[];
  image: string;
  category?: string;
  price: number;
  quantity: number;
}

const OrderDetailsPage = () => {
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(id as string, {
    skip: !id,
  });

  const [updateOrderComment] = useUpdateOrderCommentMutation();

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleCancel = async () => {
    if (!id) return;

    try {
      await updateOrderStatus({
        id,
        status: "cancelled",
      }).unwrap();

      toast.success("Order cancelled successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error("Cancel failed");
    }
  };
  const [, setOrderStatus] = useState(0);
  const navigate = useNavigate();

  // commnet
  const handleCommentUpdate = async () => {
    if (!id || !commentText) return;

    try {
      await updateOrderComment({
        id,
        comment: commentText,
      }).unwrap();

      toast.success("Comment updated successfully");
      setCommentText("");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to update comment");
    }
  };

  useEffect(() => {
    if (order) {
      let currentIndex = 0;

      if (order.status === "completed" || order.status === "delivered") {
        currentIndex = 3;
      } else if (order.status === "processing") {
        currentIndex = 2;
      } else if (order.status === "pending") {
        currentIndex = 1;
      }

      setOrderStatus(currentIndex);
    }
  }, [order]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;
  if (!order) return <p>No order found with ID: {id}</p>;

  const steps = [
    { key: "pending", name: "Order Placed", icon: "📦" },
    { key: "payment", name: "Payment Confirmed", icon: "💳" },
    { key: "processing", name: "Processing", icon: "⚙️" },
    { key: "on_the_way", name: "On The Way", icon: "🚚" },
    { key: "completed", name: "Delivered", icon: "📬" },
  ];
  const currentStatus = order?.status || "pending";

  const currentIndex = steps.findIndex((s) => s.key === currentStatus);
  // ✅ products fix
  const products = order.products || [];
  // ✅ total fix
  const total = products?.reduce(
    (sum: number, item: { price?: number; quantity?: number }) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    },
    0,
  );

  return (
    <div className="container mx-auto bg-white pt-7 px-4">
      <h1 className="text-[24px] text-[#1F1F1F] font-[500] mb-4">
        Order Details
      </h1>

      {/* Order Header */}
      <div className="bg-[#FDF1F7] rounded-lg p-4 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[24px] font-bold text-[#1F1F1F]">
            {products.name}
          </h2>
          <p className="text-sm font-[500] text-[#505050]">
            {products.quantity} Products • Order Placed on{" "}
            {products.date || "N/A"}
          </p>
        </div>
        <div className="text-[32px] font-bold text-[#3CA6FC]">
          $ {total.toFixed(2)}
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-6">
        <div className="w-full">
          <div className="hidden md:flex justify-between p-4 font-semibold text-[#505050]">
            <div className="w-2/5">Products</div>
            <div className="w-1/5 text-center">Price</div>
            <div className="w-1/5 text-center">Quantity</div>
            <div className="w-1/5 text-right">Sub-Total</div>
          </div>

          <div className="flex flex-col">
            {products?.map((product: Product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row justify-between items-center border border-[#E2E3E8] rounded-lg p-4 mb-3"
              >
                <div className="flex items-center w-full md:w-2/5 mb-4 md:mb-0">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-24 h-24 mr-4 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-[#C8A8E9] text-base font-semibold">
                      {product.category || "Category"}
                    </p>
                    <p className="text-base font-normal text-[#505050]">
                      {product.name}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/5 text-center text-[#475156] font-semibold text-base mb-2 md:mb-0">
                  ${product.price.toFixed(2)}
                </div>

                <div className="w-full md:w-1/5 text-center text-[#475156] font-semibold text-base mb-2 md:mb-0">
                  x{product.quantity}
                </div>

                <div className="w-full md:w-1/5 text-right text-[#475156] font-semibold text-base">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Tracking Section */}
      <div className="mb-10">
        {/* Expected date */}
        <p className="text-base text-[#191C1F] mb-4">
          Order expected arrival{" "}
          <span className="font-bold">{order?.date || "N/A"}</span>
        </p>

        {/* Progress Bar */}
        <div className="relative mb-6">
          {/* Background Line */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-3 bg-[#F1DAFC] rounded"></div>

          {/* Active Progress */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 bg-[#E3AADD] rounded transition-all duration-300"
            style={{
              width: `${(currentIndex / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {/* Circles */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index <= currentIndex;

              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                      isActive
                        ? "bg-[#E3AADD] border-[#E3AADD] text-white"
                        : "bg-white border-[#E3AADD] text-gray-400"
                    }`}
                  >
                    {isActive ? "✓" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const isActive = index <= currentIndex;

            return (
              <div
                key={step.key}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-2 text-3xl">{step.icon}</div>
                <p
                  className={`text-base ${
                    isActive ? "text-black font-semibold" : "text-gray-400"
                  }`}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Addresses Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Shipping Address */}
        <div className="w-full md:w-1/2 border border-gray-300 rounded-md">
          <h3 className="font-semibold text-base px-4 py-3 bg-[#FDF1F7] text-[#1F1F1F]">
            Billing Address
          </h3>
          <div className="p-4 space-y-2">
            <p className="font-[500] text-base text-[#1F1F1F]">
              Email: {order.shipping?.email || "N/A"}
            </p>
            <p className="font-[500] text-base text-[#1F1F1F]">
              {order.shipping?.name}
            </p>
            <p className="text-[#919191]">{order.shipping?.address}</p>
            <p className="font-semibold text-[#191C1F] text-base">
              Phone Number:{" "}
              <span className="text-[#5F6C72]">
                {order.shipping?.phone || "N/A"}
              </span>
            </p>
            <p className="font-semibold text-[#191C1F] text-base">
              PostalCode:{" "}
              <span className="text-[#5F6C72]">
                {order.shipping?.postalCode || "N/A"}
              </span>
            </p>
            <p className="font-semibold text-[#191C1F] text-base">
              Country:{" "}
              <span className="text-[#5F6C72]">
                {order.shipping?.country || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="w-full md:w-1/2 border border-gray-300 rounded-md">
          <h3 className="font-semibold text-base px-4 py-3 bg-[#FDF1F7] text-[#1F1F1F]">
            Shipping Address
          </h3>
          <div className="p-4 space-y-2">
            <p className="font-[500] text-base text-[#1F1F1F]">
              Email: {order.shipping?.email || "N/A"}
            </p>
            <p className="font-[500] text-base text-[#1F1F1F]">
              {order.shipping?.name}
            </p>
            <p className="text-[#919191]">{order.shipping?.address}</p>
            <p className="font-semibold text-[#191C1F] text-base">
              Phone Number:{" "}
              <span className="text-[#5F6C72]">
                {order.shipping?.phone || "N/A"}
              </span>
            </p>
            <p className="font-semibold text-[#191C1F] text-base">
              PostalCode:{" "}
              <span className="text-[#5F6C72]">
                {order.shipping?.postalCode || "N/A"}
              </span>
            </p>
            <p className="font-semibold text-[#191C1F] text-base">
              Country:{" "}
              <span className="text-[#5F6C72]">
                {order.shipping?.country || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border border-gray-300 rounded-md p-4 mb-6">
        <h3 className="font-semibold text-base mb-4 text-[#1F1F1F]">
          Order Summary
        </h3>
        <div className="space-y-3 text-[#505050] font-semibold">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              $
              {Number(
                order.summary?.subtotal ?? products.price * products.quantity,
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>${order.summary?.discount || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${order.summary?.shipping || 0}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total</span>
            <span>
              $
              {(
                order.summary?.total ?? products.price * products.quantity
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        {/* ================= COMMENT BOX ================= */}
        <div className="w-full md:w-[400px] border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            Add Comment
          </h3>

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none p-3 rounded-lg resize-none h-28"
            placeholder="Write your comment..."
          />

          <button
            onClick={handleCommentUpdate}
            className="mt-3 w-full bg-[#E3AADD] hover:bg-[#cf8fca] cursor-pointer text-white font-medium py-2 rounded-lg transition"
          >
            Save Comment
          </button>
        </div>

        {/* ================= CANCEL BUTTON ================= */}
        <div className="flex items-end">
          <button
            onClick={handleCancel}
            disabled={order.status !== "payment"}
            className={`px-6 py-3 font-semibold text-base rounded-lg transition shadow-sm
        ${
          order.status !== "payment"
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
        }`}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
