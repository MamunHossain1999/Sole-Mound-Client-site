import React from "react";

const CategoryProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-sm border-amber-400 text-gray-800 mt-2 font-semibold">
        {product.name}
      </h3>
      {/* <div className="text-sm space-x-2 mt-1">
        <span className="text-gray-500 line-through">{product.oldPrice}</span>
        <span className="text-green-600 font-bold">{product.price}</span>
        <span className="text-red-500 text-xs">{product.status}</span>
      </div> */}
      <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{product.name}</h3>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.priceValue}</p>
      <p>Rating: {product.rating}</p>
    </div>
      <div className="flex gap-2 mt-3 justify-between">
        <button className="border text-black text-sm px-3 py-1 hover:bg-gray-400 rounded cursor-pointer">
          Add to Cart
        </button>
        <button className="border text-sm px-5 py-1 text-black rounded hover:bg-gray-400 cursor-pointer">
          View
        </button>
      </div>
    </div>
  );
};

export default CategoryProductCard;
