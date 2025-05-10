import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaTruck, FaClipboardCheck } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { Link } from "react-router-dom";

const fetchOrderDetails = async (id) => {
  const { data } = await axios.get(`/orderHistory.json`);
  return data.find(order => String(order.id) === String(id)); 
};

const ReturnPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState("drop-off");
  const [selectedRefundMethod, setSelectedRefundMethod] = useState("original");
  const [formData, setFormData] = useState({
    orderId: id,
    selectedReasons: [],
    shippingMethod: "drop-off",
    refundMethod: "original",
    returnDate: new Date().toLocaleDateString()
  });

  const { data: orderData, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderDetails(id),
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      selectedReasons,
      shippingMethod: selectedShipping,
      refundMethod: selectedRefundMethod
    }));
  }, [selectedReasons, selectedShipping, selectedRefundMethod]);

  const reasons = [
    "The product quality is unsatisfactory.",
    "I need to return a non-functional, unsealed product.",
    "I changed my mind or the product was not as expected.",
    "The product information was misleading.",
    "The product was not delivered.",
  ];

  const shippingMethods = [
    {
      id: "tomorrow",
      title: "Standard Shipping",
      cost: "$40",
      description: "Send it by tomorrow"
    },
    {
      id: "drop-off",
      title: "In-store pickup",
      cost: "Free",
      description: "Send it by " + new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }
  ];

  const refundMethods = [
    {
      id: "original",
      title: "I would like a store voucher",
      description: "Receive an instant voucher to use on new orders."
    },
    {
      id: "store-credit",
      title: "I want a refund",
      description: "We will process your refund, which may take up to 7 business days."
    },
    {
      id: "bank-transfer",
      title: "I would like a replacement product",
      description: "We will replace your product with a new one."
    }
  ];

  const steps = [
    { label: "Your details", icon: <FaBoxOpen size={20} /> },
    { label: "Pickup Method", icon: <FaTruck size={20} /> },
    { label: "Review & Submit", icon: <FaClipboardCheck size={20} /> },
  ];

  const handleCheckboxChange = (reason) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason) 
        : [...prev, reason]
    );
  };

  const handleSubmit = async () => {
    try {
      if (selectedReasons.length === 0) {
        return toast.error("Please select at least one reason for return");
      }
      if (!selectedShipping) {
        return toast.error("Please select a shipping method");
      }
      if (!selectedRefundMethod) {
        return toast.error("Please select a refund method");
      }

      const returnData = {
        orderId: id,
        product: orderData?.name || "Unknown Product",
        price: orderData?.price || 0,
        selectedReasons,
        shippingMethod: selectedShipping,
        refundMethod: selectedRefundMethod,
        returnDate: new Date().toLocaleDateString()
      };

      const res = await fetch("/api/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(returnData),
      });

      if (res.ok) {
        toast.success("Return request submitted successfully!");
        navigate("/returns/confirmation", { state: { returnData } });
      } else {
        toast.error("Something went wrong while submitting the return.");
      }
    } catch (error) {
      console.error("Error submitting return:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-4 text-center">
      <p className="text-red-500 text-lg">Something went wrong loading your order details. Please try again.</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto bg-white pt-6 pb-12">
      <h1 className="text-[24px] text-[#1F1F1F] font-bold">Return my order(s)</h1>

      {/* Progress Steps */}
      <div className="flex justify-between my-4 px-4 md:px-28">
        {steps.map((step, index) => (
          <div className="flex flex-col items-center text-center" key={index}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${index === currentStep 
                  ? "bg-[#C8A8E9] text-white" 
                  : index < currentStep 
                    ? "bg-[#C8A8E9] text-white"
                    : "bg-gray-100 text-[#505050] border border-[#1018280D]"}`}
            >
              {step.icon}
            </div>
            <span className={`text-[#505050] text-base font-semibold mt-1 ${
              index === currentStep ? "text-[#505050]" : ""
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-2 bg-[#FDF1F7] p-3 mt-5 rounded-t-lg text-[#505050] font-semibold text-base">
        <div>Product</div>
        <div className="flex w-full justify-between px-28">
          <div className="text-right">Order Number</div>
          <div className="text-right">Return Term</div>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center border-gray-200 p-3">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={orderData?.image || "/api/placeholder/60/60"}
              alt={orderData?.name || "Product"}
              className="w-[68px] h-[67px] rounded-md object-cover"
            />
            <div>
              <p className="text-base text-[#1F1F1F] font-normal">{orderData?.name || "Unknown Product"}</p>
              <p className="text-base text-[#FF1C1C] font-medium">${orderData?.price || "0.00"}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between px-28">
            <div className="text-center text-[#505050] text-base font-normal">#{id}</div>
            <div className="text-right text-[#505050] text-base font-normal">
              {new Date().toLocaleDateString()}
            </div>
        </div>
      </div>

      {/* Return Reason */}
      <div className="mt-6 mb-4 pl-4 md:pl-18">
        <h2 className="text-base font-semibold text-[#1F1F1F] mb-1">Reason for Return</h2>
        <p className="text-base text-[#1F1F1F] font-semibold pb-1 mb-3">
          What is the primary reason for returning the product?
        </p>
        <div className="space-y-3 rounded-md">
            {reasons.map((reason, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer text-base hover:bg-gray-50 p-2 rounded transition-colors relative"
              >
                <input
                  type="checkbox"
                  name="returnReason"
                  value={reason}
                  checked={selectedReasons.includes(reason)}
                  onChange={() => handleCheckboxChange(reason)}
                  className="peer w-5 h-5 accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                />
                {/* Tick mark */}
                <span className="pointer-events-none absolute left-[15px] top-3 items-center justify-center text-white text-xs font-bold peer-checked:block hidden">
                  ✓
                </span>

                <span className="text-[#1F1F1F] text-base ml-2">{reason}</span>
              </label>
            ))}
          </div>

        {/* {selectedReasons.length === 0 && (
          <p className="text-orange-500 text-sm mt-2">Please select at least one reason</p>
        )} */}
      </div>


      {/* Progress Steps */}
      <div className="flex justify-between my-10 px-4 md:px-28">
        {steps?.map((step, index) => (
          <div className="flex flex-col items-center text-center" key={index}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${index === currentStep 
                  ? "bg-[#C8A8E9] text-white" 
                  : index < currentStep 
                    ? "bg-[#C8A8E9] text-white"
                    : "bg-gray-100 text-[#505050] border border-[#1018280D]"}`}
            >
              {step.icon}
            </div>
            <span className={`text-[#505050] text-base font-semibold mt-1 ${
              index === currentStep ? "text-[#505050]" : ""
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping Method */}
      <div className="mb-6 px-4 md:px-12">
        <h3 className="text-base font-semibold mb-4 text-[#1F1F1F]">Choose the method for returning the product</h3>
        <div className="space-y-4 max-w-[669px]">
          {shippingMethods.map((method) => (
            <div key={method.id} className="border border-[#919191] rounded-md py-4 hover:bg-gray-50 transition-colors">
              <label className="flex items-center ml-6 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={() => setSelectedShipping(method.id)}
                    className="peer hidden"
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
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

      {/* Refund Method */}
      <div className="mb-6 px-4 md:px-12">
        <h3 className="text-base font-semibold mb-4 text-[#1F1F1F]">Choose the method for receiving payment</h3>
        <div className="space-y-4 max-w-[669px]">
          {refundMethods.map((method) => (
            <div key={method.id} className="border border-[#919191] rounded-md py-4 hover:bg-gray-50 transition-colors">
              <label className="flex items-center ml-6 cursor-pointer">
              <div className="relative">
                <input
                    type="radio"
                    name="refundMethod"
                    className="peer hidden"
                    value={method.id}
                    checked={selectedRefundMethod === method.id}
                    onChange={() => setSelectedRefundMethod(method.id)}
                  />
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                  </div>
              </div>
                <div className="ml-3">
                  <div className="text-base font-normal text-[#1F1F1F]">{method.title}</div>
                  <div className="text-base font-normal text-[#505050]">{method.description}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>


      {/* Progress Steps */}
      <div className="flex justify-between  mt-12 px-4 md:px-28">
        {steps.map((step, index) => (
          <div className="flex flex-col items-center text-center" key={index}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${index === currentStep 
                  ? "bg-[#C8A8E9] text-white" 
                  : index < currentStep 
                    ? "bg-[#C8A8E9] text-white"
                    : "bg-gray-100 text-[#505050] border border-[#1018280D]"}`}
            >
              {step.icon}
            </div>
            <span className={`text-[#505050] text-base font-semibold mt-1 ${
              index === currentStep ? "text-[#505050]" : ""
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>   

      {/* Summary & Submit */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-10 gap-6 py-10">
        <div className="mb-6 w-full max-w-[566px]">
          <h3 className="text-base font-semibold mb-2 text-[#1F1F1F]">Confirm Exchange Details</h3>
          <ol className="list-decimal pl-5 space-y-2 text-base font-normal text-[#1F1F1F]">
            <li>Be sure to print your mailing label (you can also do this from the next page)</li>
            <li>Place the Return Mailing Form inside the package with your return item</li>
            <li>Affix the pre-paid return mailing label securely to your package</li>
            <li>Write your return address in the space provided on the return mailing label</li>
            <li>Take your package to the nearest mail center or leave for your mail carrier</li>
          </ol>
        </div>

        <div className="bg-[#FDF1F7] p-4 rounded-lg w-full">
          <h3 className="font-semibold text-base text-[#919191] mb-2">Tally appers here. depending on what was selected above</h3>
          <div className="text-[#1F1F1F] font-medium space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Return Shipping</span>
              <span>{selectedShipping === "tomorrow" ? "$0.00" : "Free"}</span>
            </div>
            <div className="flex justify-between">
              <span>Return Item</span>
              <span>-${orderData?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Refund Method</span>
              <span>{refundMethods.find(m => m.id === selectedRefundMethod)?.title}</span>
            </div>
            {selectedRefundMethod === "store-credit" && (
              <div className="flex justify-between text-green-600">
                <span>Bonus Credit (5%)</span>
                <span>+${((orderData?.price || 0) * 0.05).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-300 pt-2 font-medium">
              <span>Total Refund:</span>
              <span>
                ${selectedRefundMethod === "store-credit" 
                  ? ((orderData?.price || 0) * 1.05).toFixed(2) 
                  : (orderData?.price || 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center py-8 ">
            <button
              onClick={handleSubmit}
              className="w-40 bg-[#C8A8E9] text-[#1F1F1F] text-base py-2 rounded hover:bg-purple-400 "
            >
              Confirm Return
            </button>
          </div>

          <div className="w-full flex justify-center py-8">
            <Link to="/retrun-confirm">
              <button className="w-40 bg-[#C8A8E9] text-[#1F1F1F] text-base py-2 rounded hover:bg-purple-400">
                Confirm
              </button>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ReturnPage;
