import { useEffect, useState } from "react";
import { PiCurrencyDollarThin } from "react-icons/pi";
import paypal from "../../assets/paypal1.png";

import { toast } from "react-toastify";
import { useGetCartQuery } from "@/Redux/api/cartApi";
import { useCreateCheckoutSessionMutation } from "@/Redux/api/paymentApi";
import { useCreateOrderMutation } from "@/Redux/api/orderApi";
import { useGetProfileQuery } from "@/Redux/api/userApi";

// ==================== Types ====================
interface CartItem {
  _id?: string;
  productId?: string;
  product?: {
    _id: string;
    price: number;
    images?: string[];
    name?: string;
  };
  name?: string;
  price?: number;
  quantity: number;
}
export interface CreateCheckoutRequest {
  orderId: string;
  totalAmount: number;
}

const CheckoutPage = () => {
  const { data, isLoading, isError } = useGetCartQuery();
  const [createCheckoutSession, { isLoading: paymentLoading }] =
    useCreateCheckoutSessionMutation();

  const [createOrder] = useCreateOrderMutation();
  const { data: user } = useGetProfileQuery();

  const cartItems: CartItem[] = Array.isArray(data?.data?.items)
    ? data.data.items
    : [];

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "cash"
  >("card");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    postalCode: "",
    country: "United States",
    city: "",
    phone: "",
    address: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "Bangladesh",
      }));
    }
  }, [user]);

  if (isLoading) return <p className="text-center py-10">Loading cart...</p>;
  if (isError) {
    toast.error("Error fetching cart items");
    return (
      <p className="text-center py-10 text-red-500">
        Error fetching cart items. Please try again.
      </p>
    );
  }

  // ==================== Calculations ====================
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.product?.price ?? item.price ?? 0);
    const qty = Number(item.quantity ?? 1);
    return total + price * qty;
  }, 0);

  const shipping = cartItems.reduce((total, item) => {
    return total + 0;
  }, 0);

  const discount = 0;
  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = Number((subtotal + shipping - discount + tax).toFixed(2));

  // ==================== Handlers ====================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (): Promise<void> => {
    if (!cartItems.length) {
      toast.error("Cart is empty");
      return;
    }

    try {
      // ================= PRODUCTS FIX =================
      const products = cartItems
        .map((item) => {
          const productId = item.productId || item.product?._id;

          if (!productId) return null;

          return {
            productId,
            quantity: item.quantity ?? 1,
            price: Number(item.product?.price ?? item.price ?? 0),
            name: item.product?.name || item.name,
            image: item.product?.images?.[0] || "",
          };
        })
        .filter(
          (
            item,
          ): item is {
            productId: string;
            quantity: number;
            price: number;
            name: string;
            image: string;
          } => item !== null,
        );

      // ================= ORDER PAYLOAD TYPE =================
      const orderPayload: {
        products: {
          productId: string;
          quantity: number;
          price: number;
          name?: string;
          image?: string;
        }[];
        totalAmount: number;
        shippingAddress: {
          fullName: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          country: string;
          postalCode: string;
        };
        paymentMethod: "stripe" | "sslcommerz" | "cash";
      } = {
        products,
        totalAmount: Number(total),

        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email || "N/A",
          phone: formData.phone || "0000000000",
          address: formData.address || "N/A",
          city: formData.city || "N/A",
          country: formData.country || "Bangladesh",
          postalCode: formData.postalCode || "N/A",
        },

        paymentMethod: "stripe",
      };

      // ================= CREATE ORDER =================
      const orderRes = await createOrder(orderPayload).unwrap();

      const orderId = orderRes?.data?._id;

      if (!orderId) {
        toast.error("Order creation failed");
        return;
      }

      // ================= PAYMENT =================
      const res = await createCheckoutSession({
        orderId,
        totalAmount: Number(total),
      }).unwrap();

      if (res?.url) {
        window.location.href = res.url;
      } else {
        toast.error("No payment URL received");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#FDF1F7] py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#1F1F1F]">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3 space-y-10">
            {/* Contact Information */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#1D3178]">
                  Contact Information
                </h2>
                <p className="text-sm text-[#3CA6FC]">
                  Already have an account?{" "}
                  <a href="#" className="underline">
                    Log in
                  </a>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[#919191] mb-1">
                    Email or mobile phone number
                  </p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 accent-[#22C55E]"
                  />
                  <label htmlFor="newsletter" className="text-[#919191]">
                    Keep me up to date on news and exclusive offers
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-semibold text-[#1D3178] mb-4">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <input
                type="text"
                name="companyName"
                placeholder="Company Name (Optional)"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full mt-4 px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
               <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full mt-4 px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full mt-4 px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>

              <input
                type="text"
                name="city"
                placeholder="City / State *"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full mt-4 px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code *"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full mt-4 px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Payment Options */}
            <div>
              <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
                Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#E2E3E8] rounded-lg p-2">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "border-[#C8A8E9] bg-[#FDF1F7]"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <label className="flex flex-col items-center text-center cursor-pointer">
                    <PiCurrencyDollarThin className="w-10 h-10 text-[#C8A8E9]" />
                    <p className="mt-2 font-medium">Cash on Delivery</p>
                  </label>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "paypal"
                      ? "border-[#C8A8E9] bg-[#FDF1F7]"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <label className="flex flex-col items-center text-center cursor-pointer">
                    <img src={paypal} alt="PayPal" className="h-10" />
                    <p className="mt-2 font-medium">PayPal</p>
                  </label>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-[#C8A8E9] bg-[#FDF1F7]"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <label className="flex flex-col items-center text-center cursor-pointer">
                    <svg
                      className="w-10 h-10 text-[#C8A8E9]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <p className="mt-2 font-medium">Debit / Credit Card</p>
                  </label>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-[#B6B7BC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-96 overflow-auto">
                {cartItems?.map((item) => (
                  <div
                    key={item.productId || item._id}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={
                          item.product?.images?.[0] ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.name || item.product?.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1F1F1F] line-clamp-2">
                        {item.name || item.product?.name || "Product"}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold">
                      ${(item.product?.price ?? item.price ?? 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t my-5 pt-5 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)} USD</span>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={paymentLoading || !cartItems.length}
                className="w-full cursor-pointer bg-[#C8A8E9] hover:bg-[#b38fd9] transition-colors text-[#1F1F1F] font-semibold py-4 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {paymentLoading
                  ? "Processing..."
                  : `Pay Now - $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
