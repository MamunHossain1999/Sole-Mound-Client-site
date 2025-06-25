import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiCurrencyDollarThin } from "react-icons/pi";
import paypal from "../../assets/paypal1.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const fetchShoppingCard = async () => {
  const { data } = await axios.get("/shoppingCard.json");
  return data;
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    data: cartItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shoppingCard"],
    queryFn: fetchShoppingCard,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    country: "United States",
    city: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    toast.error("Error fetching cart items");
    return <p>Error fetching cart items</p>;
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = 0;
  const discount = 24;
  const tax = 61.99;
  const total = subtotal + shipping - discount + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitOrder = async () => {
    const orderData = {
      ...formData,
      cartItems,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      tax,
      total,
    };

    try {
      await axios.post("https://your-api-endpoint.com/orders", orderData);
      toast.success("Order placed successfully!");
      navigate("/check-out-order-success");
    } catch (error) {
      toast.error("Failed to place order. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Order Complete Header */}
      <div className="bg-[#FDF1F7] py-4 text-left h-[106px">
        <div className="container mx-auto px-4 flex items-center justify-start">
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Order Complete</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3">
            {/* Contact Information */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-[#1D3178]">
                  Contact Information
                </h2>
                <p className="text-base font-normal text-[#3CA6FC]">
                  Already have an account?{" "}
                  <a href="#" className="underline">
                    Log in
                  </a>
                </p>
              </div>

              <div className="mt-12">
                <p className="pb-3 text-[#919191] font-normal  text-base">
                  Email or mobile phone number
                </p>
                <hr className="text-[#E2E3E8]" />
                <div className="flex items-center mb-2 pt-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 text-[#22C55E]"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-2 text-base font-normal text-[#919191]"
                  >
                    Keep me up to date on news and exclusive offers
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-base font-semibold text-[#1D3178] mb-4">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name (Optional)"
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4 relative">
                <select
                  name="country"
                  className="w-full px-3 pr-10 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option>London</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>

                {/* custom right-side arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#505050]">
                  <svg
                    className="fill-current h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    placeholder="City/State"
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#505050]">
                    <svg
                      className="fill-current h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-8">
              <h2 className="text-base font-semibold text-[#1F1F1F] mb-4">
                Payment Option
              </h2>

              <div className="border py-3 rounded-[4px] border-[#E2E3E8] grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Online Payment */}
                <div
                  className={`border-r border-[#E4E7E9] ${
                    paymentMethod === "cash"
                      ? "border-[#C8A8E9] bg-[#FDF1F7]"
                      : "border-[#919191]"
                  }  py-4 hover:bg-gray-50 transition-colors`}
                >
                  <label className="flex flex-col items-center cursor-pointer">
                    <div className="text-[#C8A8E9]">
                      <PiCurrencyDollarThin className="w-8 h-8" />
                    </div>
                    <div className="text-base mt-2 font-normal text-[#1F1F1F]">
                      Online Payment
                    </div>
                    <div className="relative mt-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Paypal */}
                <div
                  className={`border-l border-r border-[#E4E7E9] ${
                    paymentMethod === "paypal"
                      ? "border-[#C8A8E9] bg-[#FDF1F7]"
                      : "border-[#919191]"
                  } py-4 hover:bg-gray-50 transition-colors`}
                >
                  <label className="flex flex-col items-center cursor-pointer">
                    <div className="text-[#C8A8E9]">
                      <img src={paypal} alt="Paypal" />
                    </div>
                    <div className="text-base mt-2 font-normal text-[#1F1F1F]">
                      Paypal
                    </div>
                    <div className="relative mt-3">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Card Payment */}
                <div
                  className={`border-l border-[#E4E7E9] ${
                    paymentMethod === "card"
                      ? "border-[#C8A8E9] bg-[#FDF1F7]"
                      : "border-[#919191]"
                  } py-4 hover:bg-gray-50 transition-colors`}
                >
                  <label className="flex flex-col items-center cursor-pointer">
                    <div className="text-[#C8A8E9]">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div className="text-base mt-2 font-normal text-[#1F1F1F]">
                      Debit/Credit Card
                    </div>
                    <div className="relative mt-3">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Card Input Fields */}
              {paymentMethod === "card" && (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="cardName"
                      className="block mb-1 text-base font-semibold text-[#000000]"
                    >
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      placeholder="Enter your name"
                      className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                      value={formData.cardName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="cardNumber"
                      className="block mb-1 text-base font-semibold text-[#000000]"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="Enter card number"
                      className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expDate"
                        className="block mb-1 text-base font-semibold text-[#000000]"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expDate"
                        name="expDate"
                        placeholder="MM/YY"
                        className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                        value={formData.expDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvc"
                        className="block mb-1 text-base font-semibold text-[#000000]"
                      >
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        placeholder="CVC"
                        className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                        value={formData.cvc}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white ">
              {/* Product Items */}
              <div className="mb-6">
                {cartItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex pb-2 mb-4 border-b border-[#E2E3E8] items-center"
                  >
                    <div className="w-16 h-16 mr-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base text-[#1F1F1F] font-semibold">
                        {item.name
                          .split(" ")
                          .slice(0, window.innerWidth < 640 ? 2 : 3)
                          .join(" ")}
                        ...
                      </h3>

                      <p className="text-base text-[#919191] font-normal">
                        Color: {item.color}
                      </p>
                      <p className="text-base text-[#919191] font-normal">
                        Size: {item.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#1F1F1F] text-base">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-[#FDF1F7] p-4 rounded-lg">
                <h3 className="text-[#1F1F1F] md:text-2xl text-[18px] font-bold mb-4">
                  Summary
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#505050] text-base font-semibold">
                      Sub-total
                    </span>
                    <span className="text-[#505050] text-base font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#505050] text-base font-semibold">
                      Shipping
                    </span>
                    <span className="text-[#505050] text-base font-semibold">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#505050] text-base font-semibold">
                      Discount
                    </span>
                    <span className="text-[#1F1F1F] text-base font-semibold">
                      ${discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#505050] text-base font-semibold">
                      Tax
                    </span>
                    <span className="text-[#1F1F1F] text-base font-semibold">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal (4 items):</span>
                    <span className="font-bold">${total.toFixed(2)} USD</span>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    className="w-full bg-[#C8A8E9] text-[#1F1F1F] font-semibold text-base py-3 rounded-lg hover:bg-purple-300 transition"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
