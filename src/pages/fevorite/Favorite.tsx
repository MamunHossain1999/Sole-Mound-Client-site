import React, { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import Pagination from "./Pagination";
import {
  useGetWishlistQuery,
  useRemoveWishlistMutation,
} from "@/Redux/api/wishlistApi";
import { toast } from "react-toastify";
import { useAddCartMutation } from "@/Redux/api/cartApi";

type WishlistItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    quantity?: number;
  };
};

const Favorite: React.FC = () => {
  const { data: response, isLoading, isError } = useGetWishlistQuery();
  const [addCart] = useAddCartMutation();

  const data = (response?.data ?? []) as WishlistItem[];

  const [removeWishlist] = useRemoveWishlistMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = data.slice(startIndex, startIndex + itemsPerPage);

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

  const handleRemove = async (id: string) => {
    try {
      await removeWishlist(id).unwrap();
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <main className="flex-1">
        <h2 className="text-[20px] sm:text-[24px] text-[#505050] bg-[#FDF1F7] font-medium rounded-lg p-4 mb-4 text-center sm:text-left">
          All items ({data.length})
        </h2>

        <div className="space-y-4">
          {visibleProducts.map((item) => {
            const product = item.product;
            const qty = product.quantity ?? 0;

            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center p-4 py-4 bg-[#FDF1F7] rounded-lg"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full md:w-[100px] h-[140px] md:h-[120px] lg:w-[128px] lg:h-[140px] object-cover rounded-md"
                />

                <div className="mt-4 sm:mt-0 sm:ml-4 flex-1 text-left">
                  <p className="text-[16px] font-normal text-[#475156] mb-1">
                    {product.name}
                  </p>

                  <div className="flex items-center space-x-2">
                    <span className="text-[#919191] line-through text-[14px]">
                      {product.price}
                    </span>
                    <span className="text-[#1F1F1F] font-medium text-[16px]">
                      {product.price}
                    </span>
                  </div>

                  <p
                    className={`text-[16px] mt-1 font-normal ${
                      qty > 0 ? "text-[#22C55E]" : "text-[#FF1C1C]"
                    }`}
                  >
                    {qty > 0 ? `IN STOCK (${qty})` : "OUT OF STOCK"}
                  </p>
                </div>

                <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-col">
                  {/* Mobile */}
                  <div className="flex w-full justify-between items-center sm:hidden">
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      disabled={qty === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                        qty > 0
                          ? "bg-[#A8537B] text-white hover:bg-[#914468]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <MdOutlineShoppingCart size={16} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <GoHeartFill size={20} />
                    </button>
                  </div>

                  {/* Desktop */}
                  <div className="hidden sm:flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      disabled={qty === 0}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                        qty > 0
                          ? "bg-[#A8537B] text-white hover:bg-[#914468]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <MdOutlineShoppingCart size={16} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition self-center"
                    >
                      <GoHeartFill size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty */}
        {data.length === 0 && (
          <div className="text-center py-12">
            <GoHeartFill size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No favorites yet
            </h3>
          </div>
        )}

        {/* Pagination */}
        {data.length > 0 && totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorite;
