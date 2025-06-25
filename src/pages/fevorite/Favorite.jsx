import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import Pagination from "./Pagination";

const favorite = async () => {
  const { data } = await axios.get("/favorite.json");
  return data;
};

const Favorite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Favorite"],
    queryFn: favorite,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = data.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (product) => {
    if (product.inStock) {
      console.log(`Added to cart: ${product.title}`);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <main className="flex-1">
        <h2 className="text-[20px] sm:text-[24px] text-[#505050] bg-[#FDF1F7] font-medium rounded-lg p-4 mb-4 text-center sm:text-left">
          All items ({data.length})
        </h2>

        <div className="space-y-4">
          {visibleProducts?.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center p-4 py-4 bg-[#FDF1F7] rounded-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full md:w-[100px] h-[140px] md:h-[120px] lg:w-[128px] lg:h-[140px] object-cover rounded-md"
              />
              <div className="mt-4 sm:mt-0 sm:ml-4 flex-1 text-left sm:text-left">
                <p className="text-[16px] font-normal text-[#475156] mb-1">
                  {product.title}
                </p>
                <div className="flex justify-start sm:justify-start items-center space-x-2">
                  <span className="text-[#919191] line-through text-[14px]">
                    {product.oldPrice}
                  </span>
                  <span className="text-[#1F1F1F] font-medium text-[16px]">
                    {product.newPrice}
                  </span>
                </div>
                <p
                  className={`text-[16px] mt-1 font-normal ${
                    product.inStock ? "text-[#22C55E]" : "text-[#FF1C1C]"
                  }`}
                >
                  {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-col sm:flex-col">
                {/* Mobile view */}
                <div className="flex w-full justify-between items-center sm:hidden">
                  <GoHeartFill
                    className="cursor-pointer text-[#FF1C1C]"
                    size={26}
                  />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center px-4 py-2 text-[16px] border border-[#B6B7BC] rounded-md bg-[#FDF1F7] text-[#1F1F1F] hover:bg-[#C8A8E9]"
                    disabled={!product.inStock}
                  >
                    Add to Cart
                    <MdOutlineShoppingCart className="ml-2 w-6 h-6" />
                  </button>
                </div>

                {/* Desktop view */}
                <div className="hidden sm:flex flex-col items-end space-y-12">
                  <GoHeartFill
                    className="cursor-pointer text-[#FF1C1C]"
                    size={26}
                  />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center px-4 py-2 text-[16px] border border-[#B6B7BC] rounded-md bg-[#FDF1F7] text-[#1F1F1F] hover:bg-[#C8A8E9]"
                    disabled={!product.inStock}
                  >
                    Add to Cart
                    <MdOutlineShoppingCart className="ml-2 w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>
    </div>
  );
};

export default Favorite;
