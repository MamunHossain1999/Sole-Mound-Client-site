import { useState, useEffect } from "react";
import { FaBoxOpen, FaTruck, FaClipboardCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetOrderByIdQuery } from "@/Redux/api/orderApi";
import { useReturnOrderMutation } from "@/Redux/api/orderApi"; // ✅ uncomment করুন

// ✅ Fix: interface → type এবং syntax error ঠিক করা
type FormDataType = {
  selectedReasons: string[];
  shippingMethod: string;
  refundMethod: string;
};

// ✅ Fix: refundMethods কে proper object array হিসেবে define করা
const refundMethods = [
  {
    id: "bank-transfer",
    title: "Bank Transfer",
    description: "Direct to your bank account",
  },
  {
    id: "bkash",
    title: "bKash",
    description: "Transfer to your bKash account",
  },
  {
    id: "nagad",
    title: "Nagad",
    description: "Transfer to your Nagad account",
  },
  {
    id: "store-credit",
    title: "Store Credit",
    description: "Get 5% bonus on store credit",
  },
];

// product delivery date calculation for drop-off method
const deliveryDate = new Date(
  Date.now() + 15 * 24 * 60 * 60 * 1000,
).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const shippingMethods = [
  {
    id: "standard",
    title: "Standard Shipping",
    cost: "$40",
    description: "Send it by tomorrow",
  },
  {
    id: "drop-off",
    title: "In-store pickup",
    cost: "Free",
    description: `Send it by ${deliveryDate}`,
  },
];

const reasons = [
  "The product quality is unsatisfactory.",
  "I need to return a non-functional, unsealed product.",
  "I changed my mind or the product was not as expected.",
  "The product information was misleading.",
  "The product was not delivered.",
];

const steps = [
  { label: "Your details", icon: <FaBoxOpen size={20} /> },
  { label: "Pickup Method", icon: <FaTruck size={20} /> },
  { label: "Review & Submit", icon: <FaClipboardCheck size={20} /> },
];

const ReturnPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: orderData,
    isLoading,
    error,
  } = useGetOrderByIdQuery(id as string, {
    skip: !id || id === "undefined",
  });

  // ✅ Fix: returnOrder mutation uncomment করা হয়েছে
  const [returnOrder] = useReturnOrderMutation();

  const [currentStep] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("drop-off");
  const [selectedRefundMethod, setSelectedRefundMethod] =
    useState("bank-transfer");

  const [formData, setFormData] = useState<FormDataType>({
    selectedReasons: [],
    shippingMethod: "",
    refundMethod: "",
  });

  useEffect(() => {
    setFormData({
      selectedReasons,
      shippingMethod: selectedShipping,
      refundMethod: selectedRefundMethod,
    });
  }, [selectedReasons, selectedShipping, selectedRefundMethod]);

  const handleCheckboxChange = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  };

  // ✅ Fix: orderData থেকে সঠিকভাবে product data নেওয়া
  const product = orderData?.data?.products?.[0] ?? orderData?.products?.[0];
  const productName = product?.name ?? "Unknown Product";
  const productPrice =
    product?.price ?? orderData?.data?.price ?? orderData?.price ?? 0;
  const productImage =
    product?.image ??
    orderData?.data?.image ??
    orderData?.image ??
    "/api/placeholder/60/60";

  const handleSubmit = async () => {
    if (selectedReasons.length === 0) {
      toast.error("Please select at least one reason for return");
      return;
    }

    if (!id) {
      toast.error("Invalid order ID");
      return;
    }

    try {
      const returnData = {
        returnId: id,
        product: productName,
        price: productPrice,
        ...formData,
        returnDate: new Date().toISOString(),
      };

      await returnOrder(returnData).unwrap();

      toast.success("Return request submitted successfully!");
      navigate("/dashboard/returns/confirmation", { state: { returnData } });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit return request");
    }
  };

  // ✅ Total refund calculation
  const totalRefund =
    selectedRefundMethod === "store-credit"
      ? (productPrice * 1.05).toFixed(2)
      : Number(productPrice).toFixed(2);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500 text-lg">
          Something went wrong loading your order details. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container mx-auto bg-white pt-6 pb-12 px-4">
      <h1 className="text-[24px] text-[#1F1F1F] font-bold">
        {/* ✅ Fix: সঠিক product name দেখানো */}
        Return my order ({productName})
      </h1>

      {/* ✅ Progress Steps — শুধু একবার, currentStep দিয়ে controlled */}
      <div className="flex justify-between my-4 px-4 md:px-28">
        {steps.map((step, index) => (
          <div className="flex flex-col items-center text-center" key={index}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${
                  index <= currentStep
                    ? "bg-[#C8A8E9] text-white"
                    : "bg-gray-100 text-[#505050] border border-[#1018280D]"
                }`}
            >
              {step.icon}
            </div>
            <span className="text-[#505050] text-base font-semibold mt-1">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Product Info Header */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 items-center bg-[#FDF1F7] p-3 mt-5 rounded-[2px] text-[#505050] font-semibold text-base gap-2">
        <div>Product</div>
        <div className="flex md:justify-between gap-4 sm:col-span-1 lg:col-span-2">
          <div className="text-right w-1/2">Order Number</div>
          <div className="text-right w-1/2">Return Term</div>
        </div>
      </div>

      {/* Product Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center rounded-md p-4 gap-4">
        <div className="flex items-center space-x-3">
          <img
            src={productImage}
            alt={productName}
            className="w-[68px] h-[67px] rounded-md object-cover"
          />
          <div>
            {/* ✅ Fix: সঠিক product name ও price */}
            <p className="text-base text-[#1F1F1F] font-normal">
              {productName}
            </p>
            <p className="text-base text-[#FF1C1C] font-medium">
              ${Number(productPrice).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex md:justify-between gap-4 sm:col-span-1 lg:col-span-2">
          <div className="text-right w-1/2 text-[#505050] text-base font-normal">
            #{id}
          </div>
          <div className="text-right w-1/2 text-[#505050] text-base font-normal">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* ── STEP 1: Return Reason ── */}
      <div className="mt-6 mb-4 px-4 md:px-18">
        <h2 className="text-base font-semibold text-[#1F1F1F] mb-1">
          Reason for Return
        </h2>
        <p className="text-base text-[#1F1F1F] font-semibold pb-1 mb-3">
          What is the primary reason for returning the product?
        </p>

        <div className="space-y-3 rounded-md">
          {reasons?.map((reason, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer text-base text-[#1F1F1F] hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  name="returnReason"
                  value={reason}
                  checked={selectedReasons.includes(reason)}
                  onChange={() => handleCheckboxChange(reason)}
                  className="peer w-5 h-5 accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                />
                <span className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold peer-checked:block hidden">
                  ✓
                </span>
              </div>
              <span className="text-[#1F1F1F] text-base">{reason}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── STEP 2: Shipping Method ── */}
      <div className="mb-6 px-4 md:px-12 mt-8">
        <h3 className="text-base font-semibold mb-4 text-[#1F1F1F]">
          Choose the method for returning the product
        </h3>
        <div className="space-y-4 max-w-[669px]">
          {shippingMethods?.map((method) => (
            <div
              key={method.id}
              className="border border-[#919191] rounded-md py-4 hover:bg-gray-50 transition-colors"
            >
              <label className="flex items-center ml-2 md:ml-6 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={() => setSelectedShipping(method.id)}
                    className="peer hidden"
                  />
                  {/* ✅ Fix: radio visual indicator সঠিকভাবে কাজ করবে */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedShipping === method.id
                        ? "bg-[#C8A8E9] border-[#C8A8E9]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-normal text-[#1F1F1F]">
                    {method.title} - {method.cost}
                  </div>
                  <div className="text-base font-normal text-[#1F1F1F]">
                    {method.description}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* ── STEP 2: Refund Method ── */}
      <div className="mb-6 px-4 md:px-12">
        <h3 className="text-base font-semibold mb-4 text-[#1F1F1F]">
          Choose the method for receiving payment
        </h3>
        <div className="space-y-4 max-w-[669px]">
          {/* ✅ Fix: refundMethods এখন object array, তাই .id .title .description কাজ করবে */}
          {refundMethods?.map((method) => (
            <div
              key={method.id}
              className="border border-[#919191] rounded-md py-4 hover:bg-gray-50 transition-colors"
            >
              <label className="flex items-center ml-2 md:ml-6 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="refundMethod"
                    className="peer hidden"
                    value={method.id}
                    checked={selectedRefundMethod === method.id}
                    onChange={() => setSelectedRefundMethod(method.id)}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedRefundMethod === method.id
                        ? "bg-[#C8A8E9] border-[#C8A8E9]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-normal text-[#1F1F1F]">
                    {method.title}
                  </div>
                  <div className="text-base font-normal text-[#505050]">
                    {method.description}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* ── STEP 3: Summary & Submit ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-10 gap-6 py-10">
        <div className="mb-6 w-full max-w-[566px]">
          <h3 className="text-base font-semibold mb-2 text-[#1F1F1F]">
            Confirm Exchange Details
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-base font-normal text-[#1F1F1F]">
            <li>
              Be sure to print your mailing label (you can also do this from the
              next page)
            </li>
            <li>
              Place the Return Mailing Form inside the package with your return
              item
            </li>
            <li>
              Affix the pre-paid return mailing label securely to your package
            </li>
            <li>
              Write your return address in the space provided on the return
              mailing label
            </li>
            <li>
              Take your package to the nearest mail center or leave for your
              mail carrier
            </li>
          </ol>
        </div>

        <div className="bg-[#FDF1F7] p-4 rounded-lg w-full">
          <h3 className="font-semibold text-base text-[#919191] mb-2">
            Return Summary
          </h3>
          <div className="text-[#1F1F1F] font-medium space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Return Shipping</span>
              {/* ✅ Fix: shipping cost সঠিক id দিয়ে check */}
              <span>{selectedShipping === "standard" ? "$40.00" : "Free"}</span>
            </div>
            <div className="flex justify-between">
              <span>Return Item</span>
              <span>-$ {Number(productPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Refund Method</span>
              <span>
                {
                  refundMethods.find((m) => m.id === selectedRefundMethod)
                    ?.title
                }
              </span>
            </div>
            {selectedRefundMethod === "store-credit" && (
              <div className="flex justify-between text-green-600">
                <span>Bonus Credit (5%)</span>
                <span>+$ {(productPrice * 0.05).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-300 pt-2 font-medium">
              <span>Total Refund:</span>
              <span>$ {totalRefund}</span>
            </div>
          </div>

          {/* ✅ Fix: duplicate button সরানো হয়েছে, শুধু একটি Confirm Return বাকি */}
          <div className="w-full flex gap-1 justify-center py-4">
            <button
              onClick={handleSubmit}
              className="w-40 cursor-pointer bg-[#C8A8E9] text-[#1F1F1F] text-base py-2 rounded hover:bg-purple-300"
            >
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;
