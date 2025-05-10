import React, { useState } from "react";
import {ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GoHeartFill } from "react-icons/go";

const wishlist = async () => {
  const { data } = await axios.get("/wishlist.json");
  return data;
};

const WishList = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [favorites, setFavorites] = useState([]);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["wishList"],
    queryFn: wishlist,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const visibleProducts = data.slice(0, visibleCount);
  const allProducts = data; 

  const handleAddToCart = (product) => {
    if (product.inStock) {
      console.log(`Added to cart: ${product.title}`);
      
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, allProducts.length));
  };

  return (
    <div className="container mx-auto py-19">
      <main className="flex-1 ">
        <h2 className="text-[24px] text-[#505050] bg-[#FDF1F7] font-[500px] rounded-lg p-4 mb-4">
          All items ({visibleProducts.length})
        </h2>

        <div className="space-y-4 ">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center p-4 py-6 bg-[#FDF1F7] rounded-lg border"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-[160px] h-[140px] object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <p className="text-[16px] font-normal text-[#475156] mb-1">
                  {product.title}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-[#919191] line-through text-[14px]">
                    {product.oldPrice}
                  </span>
                  <span className="text-[#1F1F1F] font-[500px] text-[16px]">
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

              <div className="space-y-12">
                {/* Heart (Favorite) Icon */}
               <div className="flex justify-end">
                  <GoHeartFill
                      className="top-2 right-2 cursor-pointer text-red-500"
                      size={26}
                    />
               </div>

                {/* Add to Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center px-4 py-2 text-[16px] border border-[#B6B7BC] rounded-md bg-[#FDF1F7] text-gray-700 hover:bg-[#C8A8E9]"
                    disabled={!product.inStock}
                  >
                    Add to Cart
                    <ShoppingCart className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {allProducts.length > visibleCount && ( // Corrected condition
          <p
            className="mt-4 text-[16px] text-right text-[#000000] cursor-pointer "
            onClick={handleViewMore}
          >
            View More
          </p>
        )}
      </main>
    </div>
  );
};

export default WishList;