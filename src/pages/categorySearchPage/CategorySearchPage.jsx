import React, { useState } from "react";
import { Star } from "lucide-react";

// Sample product array
const products = [
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-1.png",
    name: "Speed HDMI Cable (1.2B Gbps, 1080p, 3D, Ethernet)",
    price: "$320.00",
    oldPrice: "$350.00",
    status: "10% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-2.png",
    name: "4K Ultra HDMI Cable (2.0A Gbps, 60Hz, 3D, Ethernet)",
    price: "$400.00",
    oldPrice: "$450.00",
    status: "11% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-3.png",
    name: "Mini DisplayPort to HDMI Cable (4K, 60Hz)",
    price: "$150.00",
    oldPrice: "$180.00",
    status: "16% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-1.png",
    name: "Speed HDMI Cable (1.2B Gbps, 1080p, 3D, Ethernet)",
    price: "$320.00",
    oldPrice: "$350.00",
    status: "10% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-2.png",
    name: "4K Ultra HDMI Cable (2.0A Gbps, 60Hz, 3D, Ethernet)",
    price: "$400.00",
    oldPrice: "$450.00",
    status: "11% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-3.png",
    name: "Mini DisplayPort to HDMI Cable (4K, 60Hz)",
    price: "$150.00",
    oldPrice: "$180.00",
    status: "16% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-1.png",
    name: "Speed HDMI Cable (1.2B Gbps, 1080p, 3D, Ethernet)",
    price: "$320.00",
    oldPrice: "$350.00",
    status: "10% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-2.png",
    name: "4K Ultra HDMI Cable (2.0A Gbps, 60Hz, 3D, Ethernet)",
    price: "$400.00",
    oldPrice: "$450.00",
    status: "11% OFF",
  },
  {
    image: "https://i.ibb.co/com/spCZRnx7/Image-3.png",
    name: "Mini DisplayPort to HDMI Cable (4K, 60Hz)",
    price: "$150.00",
    oldPrice: "$180.00",
    status: "16% OFF",
  },
  
  // ... other products
];

// Filter Sidebar Component
const FilterSidebar = () => {
  return (
    <aside className="w-72 p-4 space-y-6 border-r  text-sm ">
      {/* category */}
      <div>
        <h4 className="font-semibold mb-2 ">Category</h4>
        <ul className="space-y-1 text-black">
          {[
            "Electronic Devices", "Accessories & Supplies", "Camera & Photo",
            "Car & Vehicle Electronics", "Cell Phones & Accessories", "Computers & Accessories",
            "GPS & Navigation", "Headphones", "Home Audio", "Other Electronics"
          ].map((item) => (
            <li key={item}>
              <input type="radio" name="category" className="mr-2 text-w" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* price range */}
      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <input type="range" className="w-full" />
        <div className="flex justify-between text-xs">
          <input className="border px-1 py-0.5 w-20" placeholder="Min price" />
          <input className="border px-1 py-0.5 w-20" placeholder="Max price" />
        </div>
      </div>

      {/* brands */}
      <div>
        <h4 className="font-semibold mb-2">Popular Brands</h4>
        <ul className="space-y-1">
          {[
            "Google", "Microsoft", "Sony", "Samsung", "Xiaomi", "LG",
            "Panasonic", "One Plus", "Intel"
          ].map((brand) => (
            <li key={brand}>
              <input type="checkbox" className="mr-2" />
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {/* rating */}
      <div>
        <h4 className="font-semibold mb-2">Rating</h4>
        <ul className="space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <li key={star} className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />
              {[...Array(star)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-500" fill="yellow" />
              ))}
              <span className="ml-1 text-xs">& Up</span>
            </li>
          ))}
        </ul>
      </div>

      {/* color */}
      <div>
        <h4 className="font-semibold mb-2">Color Family</h4>
        <ul className="space-y-1">
          {["Black", "Yellow", "Red", "Green", "Silver", "Gold", "White"].map((color) => (
            <li key={color}>
              <input type="checkbox" className="mr-2" />
              {color}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

// Product card
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow p-3">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
    <h3 className="text-sm border-amber-400 text-gray-800 mt-2 font-semibold">{product.name}</h3>
    <div className="text-sm space-x-2 mt-1">
      <span className="text-gray-500 line-through">{product.oldPrice}</span>
      <span className="text-green-600 font-bold">{product.price}</span>
      <span className="text-red-500 text-xs">{product.status}</span>
    </div>
    <div className="flex gap-2 mt-3 justify-between">
      <button className="border text-black text-sm px-3 py-1 hover:bg-gray-400 rounded cursor-pointer">Add to Cart</button>
      <button className="border text-sm px-5 py-1 text-black rounded hover:bg-gray-400 cursor-pointer">View</button>
    </div>
  </div>
);

// Main component
const CategorySearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Most Popular");

  // Filtering & Sorting Logic
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));

      if (sortOption === "Price: Low to High") return priceA - priceB;
      if (sortOption === "Price: High to Low") return priceB - priceA;
      return 0; // Default: "Most Popular" or "Newest"
    });

  return (
    <div className="flex bg-white shadow container mx-auto">
      <FilterSidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search for anything..."
            className="border px-4 text-gray-400 py-2 w-1/2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border px-3 py-2 text-gray-400 rounded-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategorySearchPage;
