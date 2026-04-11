import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHeart, GoTrash } from "react-icons/go";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  useAddCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useUpdateCartQuantityMutation,
} from "@/Redux/api/cartApi";

// Cart item type
type CartItem = {
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    discount: number;
    quantity: number;
  };
  quantity: number;
};

const ShoppingCart: React.FC = () => {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, refetch } = useGetCartQuery();
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
  const [addCart] = useAddCartMutation();
  const [removeCart] = useRemoveCartMutation();
  const [clearCart] = useClearCartMutation();

  if (isLoading) return <p>Loading...</p>;

  const cartItems: CartItem[] = data?.data?.items ?? [];
  // ❌ remove item
  const handleRemove = (productId: string) => {
    setDeleteId(productId);
    setShowModal(true);
  };

  // 🧹 clear cart
  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      refetch();
      toast.success("Cart cleared successfully");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };
  // ➕➖ update quantity
  const handleIncrement = async (id: string, currentQty: number) => {
    await updateCartQuantity({
      productId: id,
      quantity: currentQty + 1,
    }).unwrap();
  };

  const handleDecrement = async (id: string, currentQty: number) => {
    if (currentQty <= 1) return;

    await updateCartQuantity({
      productId: id,
      quantity: currentQty - 1,
    }).unwrap();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await removeCart(deleteId).unwrap();
      toast.success("Item removed successfully ✅");
    } catch (error) {
      toast.error("Failed to remove item ❌");
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addCart({
        productId,
        quantity: 1,
      }).unwrap();

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // total discount %
  const discount = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.product.price * (item.product.discount || 0)) / 100) *
        item.quantity,
    0,
  );

  const tax = (subtotal - discount) * 0.18;
  const total = subtotal - discount + tax;

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
            {cartItems?.map((item) => (
              <div
                key={item?.product?._id}
                className="bg-[#FDF1F7] rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center sm:items-start"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full sm:w-20 h-20 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
                />

                <div className="flex-grow text-center sm:text-left">
                  <h2 className="text-[14px] font-medium text-[#475156]">
                    {item.product.name}
                  </h2>

                  {/* original price */}
                  <p className="text-[14px] text-gray-400 line-through">
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* discount price */}
                  <p className="text-[14px] text-[#1F1F1F] font-semibold">
                    $
                    {(
                      item.product.price -
                      (item.product.price * (item.product.discount || 0)) / 100
                    ).toFixed(2)}
                  </p>

                  {/* discount badge */}
                  {item.product.discount > 0 && (
                    <p className="text-[12px] text-green-600">
                      {item.product.discount}% OFF
                    </p>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:space-y-8 w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex space-x-5">
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-sm text-[#505050] hover:text-red-500 cursor-pointer hover:underline"
                    >
                      <GoTrash className="w-[20px] h-[20px]" />
                    </button>

                    <button
                      className="text-[#505050] cursor-pointer"
                      onClick={() => handleAddToCart(item.product._id)}
                    >
                      <GoHeart className="w-[24px] h-[24px]" />
                    </button>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-md mt-4 sm:mt-0">
                    <button
                      className="px-2 py-1 text-[#919191] cursor-pointer"
                      onClick={() =>
                        handleDecrement(item.product._id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span className="px-2 text-[#475156]">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-[#919191] cursor-pointer"
                      onClick={() =>
                        handleIncrement(item.product._id, item.quantity)
                      }
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
                disabled={isLoading}
                className="bg-[#C8A8E9] text-[#1F1F1F] cursor-pointer text-[16px] rounded-md font-semibold py-3 px-6 hover:bg-purple-300 transition-colors"
              >
                {isLoading ? "Clearing..." : "Clear Cart"}
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
