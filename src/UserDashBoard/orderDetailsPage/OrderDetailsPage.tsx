import { useGetOrderByIdQuery } from "@/Redux/api/orderApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface Product {
  id: string;
  name: string;
  image: string;
  category?: string;
  price: number;
  quantity: number;
}

interface Billing {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface Summary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface Order {
  id: string;
  status: string;
  date: string;
  products: Product[];
  name?: string;
  price?: number;
  quantity?: number;
  image?: string;
  billing?: Billing;
  summary?: Summary;
}
const OrderDetailsPage = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(id as string, {
    skip: !id,
  });

  console.log("ORDER:", order);
  const [orderStatus, setOrderStatus] = useState(0);
  const navigate = useNavigate();

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
    { name: "Order Placed", icon: "📦" },
    { name: "Payment Confirm", icon: "💳" },
    { name: "On The Road", icon: "🚚" },
    { name: "Delivered", icon: "📬" },
  ];

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
        <div className="text-[32px] font-bold text-[#3CA6FC]">$ {total}</div>
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
                    src={product.image}
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
                  ${product.price}
                </div>

                <div className="w-full md:w-1/5 text-center text-[#475156] font-semibold text-base mb-2 md:mb-0">
                  x{product.quantity}
                </div>

                <div className="w-full md:w-1/5 text-right text-[#475156] font-semibold text-base">
                  ${product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Tracking Section */}
      <div className="mb-10 ">
        <p className="text-base text-[#191C1F] mb-4">
          Order expected arrival{" "}
          <span className="font-bold">{order.date || "N/A"}</span>
        </p>

        <div className="relative mb-6">
          {/* Background Line */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-3 bg-[#F1DAFC] rounded"></div>

          {/* Progress Line */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 h-3 bg-[#E3AADD] rounded transition-all duration-300"
            style={{ width: `${(orderStatus / (steps.length - 1)) * 100}%` }}
          ></div>

          {/* Step Circles */}
          <div className="relative flex justify-between">
            {steps?.map((_step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    index < orderStatus
                      ? "bg-[#E3AADD] border-[#E3AADD] text-white"
                      : index === orderStatus
                        ? "bg-[#E3AADD] border-[#E3AADD] text-white"
                        : "bg-white border-[#E3AADD] text-gray-400"
                  }`}
                >
                  {index < orderStatus ? "✓" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Icons & Labels */}
        <div className="flex justify-between">
          {steps?.map((step) => (
            <div key={step.name} className="flex flex-col items-center ">
              <div className="mb-2 text-3xl">{step.icon}</div>
              <p
                className={`text-base text-center ${
                  steps.indexOf(step) <= orderStatus
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                {step.name}
              </p>
            </div>
          ))}
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
              ${order.summary?.subtotal || products.price * products.quantity}
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
              ${order.summary?.total || products.price * products.quantity}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <button
          className="border px-4 py-2 text-[#1F1F1F] font-semibold text-base rounded-lg cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
