import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { GoHeart, GoTrash } from "react-icons/go";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const fetchShoppingCard = async () => {
  const { data } = await axios.get("/shoppingCard.json");
  return data;
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: fetchedCartItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shoppingCard"],
    queryFn: fetchShoppingCard,
  });

  useEffect(() => {
    if (Array.isArray(fetchedCartItems)) {
      setCartItems(
        fetchedCartItems.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      );
    }
  }, [fetchedCartItems]);

  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.patch(`/api/cart/${id}`, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch {
      toast.error("Failed to update quantity.");
    }
  };

  const handleIncrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) updateQuantity(id, item.quantity + 1);
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/cart/${deleteId}`);
      setCartItems((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success("Item removed from cart successfully!");
    } catch {
      toast.error("Failed to delete item.");
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete("/api/cart");
      setCartItems([]);
      toast.success("Cart cleared successfully!");
    } catch {
      toast.error("Failed to clear cart.");
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const { data } = await axios.post("/api/cart", item);
      setCartItems((prev) => [...prev, data]);
      toast.success("Item added to cart!");
    } catch {
      toast.error("Failed to add item.");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const discount = 50;
  const taxRate = 0.18;
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal + shipping - discount + tax;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="py-8">
      <ConfirmDeleteModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />

      <div className="container mx-auto px-4">
        <h1 className="text-[16px] font-semibold mb-6 bg-[#FDF1F7] pl-4 h-[70px] flex items-center text-[#101750]">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#FDF1F7] rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center sm:items-start"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full sm:w-20 h-20 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
                />

                <div className="flex-grow text-center sm:text-left">
                  <h2 className="text-[14px] font-medium text-[#475156]">
                    {item.name}
                  </h2>
                  {item.couponsApplicable && (
                    <p className="text-[14px] text-[#3CA6FC]">
                      Coupons applicable
                    </p>
                  )}
                  <p className="text-[14px] text-[#475156]">${item.price}</p>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:space-y-8 w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex space-x-5">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-sm text-[#505050] hover:text-red-500 cursor-pointer hover:underline"
                    >
                      <GoTrash className="w-[20px] h-[20px]" />
                    </button>

                    <button
                      className="text-[#505050] cursor-pointer"
                      onClick={() => handleAddToCart(item)}
                    >
                      <GoHeart className="w-[24px] h-[24px]" />
                    </button>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-md mt-4 sm:mt-0">
                    <button
                      className="px-2 py-1 text-[#919191] cursor-pointer"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <span className="px-2 text-[#475156]">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-[#919191] cursor-pointer"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center sm:justify-end">
              <button
                onClick={handleClearCart}
                className="bg-[#C8A8E9] text-[#1F1F1F] cursor-pointer text-[16px] rounded-md font-semibold py-3 px-6 hover:bg-purple-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="bg-[#FDF1F7] rounded-lg p-6 h-auto sm:h-96">
            <h2 className="text-[24px] font-bold mb-4 text-[#1F1F1F]">
              Summary
            </h2>
            <div className="py-2 flex justify-between">
              <span className="text-[#505050] font-semibold text-[16px]">
                Sub-total
              </span>
              <span className="text-[#505050] font-semibold text-[16px]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[#505050] font-semibold text-[16px]">
                Shipping
              </span>
              <span className="text-[#505050] font-semibold text-[16px]">
                Free
              </span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[#505050] font-semibold text-[16px]">
                Discount
              </span>
              <span className="text-[#505050] font-semibold text-[16px]">
                -${discount.toFixed(2)}
              </span>
            </div>
            <div className="border-b border-[#505050] py-2 flex justify-between">
              <span className="text-[#505050] font-semibold text-[16px]">
                Tax
              </span>
              <span className="text-[#505050] font-semibold text-[16px]">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="py-4 flex justify-between font-semibold text-[#505050] text-[16px]">
              <span>Subtotal ({cartItems.length} items):</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
            <Link to={"/check-out-page"}>
              <button className="bg-[#C8A8E9] text-[#1F1F1F] cursor-pointer rounded-md py-3 w-full hover:bg-purple-300 transition-colors font-semibold">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
