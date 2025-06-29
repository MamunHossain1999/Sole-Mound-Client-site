import React from "react";

const CategoryProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-3">
      {/* img section */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[200px] sm:h-[220px] md:h-[240px] object-cover rounded"
      />

      {/* rating section */}
      <div className="flex items-center mb-2">
        <div className="flex items-center text-[#FFC61C] text-base">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>{i < Math.round(product.rating) ? "★" : "☆"}</span>
          ))}
        </div>
        <span className="text-[#919191] ml-1 text-[12px]">({product.quantity})</span>
      </div>

      {/* product name */}
      <h3 className="font-normal text-sm md:text-base text-[#0F0F0F] mt-2">
        {product.name}
      </h3>

      {/* price section */}
      <div className="flex items-center mb-2">
        <span className="font-bold text-[#0F0F0F] text-sm md:text-base">
          {product.oldPrice}
        </span>
        <span className="text-[#919191] line-through text-sm md:text-base ml-2">
          ${product.price}
        </span>
        <span className="text-[#FF1C1C] text-xs md:text-sm px-2 py-1 ml-2 rounded">
          {product.status}
        </span>
      </div>

      {/* stock */}
      <div className="text-[#22C55E] text-sm md:text-base mb-3">
        {product.stock}-{product.quantity}
      </div>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          className="flex-[2] border text-[#1F1F1F] h-[42px] md:h-[46px] border-[#E3AADD] rounded-lg px-4 py-2 text-sm md:text-base bg-[#E3AADD] w-full cursor-pointer"
        >
          Add to Cart
        </button>

        <button className="flex-1 bg-white border text-[#1F1F1F] h-[42px] md:h-[46px] border-[#E3AADD] rounded-lg px-2 py-2 text-sm md:text-base hover:bg-[#E3AADD] w-full cursor-pointer">
          View
        </button>
      </div>
    </div>
  );
};

export default CategoryProductCard;
