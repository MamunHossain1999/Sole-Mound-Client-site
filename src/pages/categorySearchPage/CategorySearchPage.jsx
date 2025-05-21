import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import CategoryProductCard from "./CategoryProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Fetch function
const fetchCategoryProducts = async () => {
  const { data } = await axios.get("/categoryProduct.json");
  return data;
};

// Filter options
const categories = [
  "Electronic Devices", "Accessories & Supplies", "Camera & Photo",
  "Car & Vehicle Electronics", "Cell Phones & Accessories",
  "Computers & Accessories", "GPS & Navigation", "Headphones", "Home Audio",
  "Other Electronics", "Gaming Accessories", "Wearable Technology",
  "Television & Video", "Smart Home", "Office Electronics",
];

const priceRanges = [
  { label: "All Price", min: 0, max: 10000 },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1,000", min: 500, max: 1000 },
  { label: "$1,000 to $10,000", min: 1000, max: 10000 },
];

const brands = [
  "Apple", "Google", "Microsoft", "Samsung", "Dell", "HP", "Symphony",
  "Xiaomi", "Sony", "Panasonic", "LG", "Intel", "One Plus"
];

const ratings = [5, 4, 3, 2, 1];
const colors = ["Black", "Yellow", "Red", "Green", "Silver", "Gold", "White"];

const FilterSidebar = ({ filters, setFilters }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 10);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-72 p-4 space-y-6 pb-12">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">Category</h4>
        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {visibleCategories.map((item) => (
            <li key={item}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  className="peer hidden"
                  value={item}
                  checked={filters.category === item}
                  onChange={() => handleChange("category", item)}
                />
                <div className="w-4 h-4 rounded-full border border-[#C9CFD2] bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9]">
                  <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                </div>
                <span className="text-sm text-[#1F1F1F]">{item}</span>
              </label>
            </li>
          ))}
        </ul>
        {categories.length > 10 && (
          <button onClick={() => setShowAll(!showAll)} className="mt-2 text-sm text-[#7C3AED] hover:underline">
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>

      <hr className="text-[#E4E7E9]" />

      {/* Price Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base py-5">Price Range</h4>
        <div className="space-y-2 text-sm">
          {priceRanges.map((range, idx) => (
            <label key={idx} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                className="peer hidden"
                onChange={() => handleChange("priceRange", range)}
                checked={filters.priceRange?.label === range.label}
              />
              <div className="w-4 h-4 rounded-full border border-[#C9CFD2] bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9]">
                <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
              </div>
              <span className="text-sm text-[#191C1F]">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-[#E4E7E9]" />

      {/* Brand Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">Popular Brands</h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                className="peer hidden"
                checked={filters.brand === brand}
                onChange={() => handleChange("brand", brand)}
              />
              <div className="w-4 h-4 rounded-full border border-[#C9CFD2] bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9]">
                <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
              </div>
              <span className="text-base font-semibold text-[#1F1F1F]">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-[#E4E7E9]" />

      {/* Rating Filter */}
      <div>
        <h4 className="font-medium text-[#212121] text-2xl mb-2">Rating</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                className="hidden"
                checked={filters.rating === rating}
                onChange={() => handleChange("rating", rating)}
              />
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? "text-[#FFC61C]" : "text-[#808080]"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-[#4B5563]">And Up</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-[#E4E7E9]" />

      {/* Color Filter */}
      <div>
        <h4 className="font-semibold text-[#212121] text-base mb-2">Color Family</h4>
        <ul className="space-y-1">
          {colors.map((color) => (
            <li key={color}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  className="peer hidden"
                  checked={filters.color === color}
                  onChange={() => handleChange("color", color)}
                />
                <div className="w-4 h-4 rounded-full border border-[#C9CFD2] bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9]">
                  <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                </div>
                <span className="text-base text-[#1F1F1F]">{color}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const CategorySearchPage = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategoryProducts,
  });

 const [filters, setFilters] = useState({
  category: categories[0],
  priceRange: priceRanges[0] || { label: "All Price", min: 0, max: 10000 },
  brand: "",
  rating: null,
  color: "",
});


  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Most Popular");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  console.log("Fetched products:", products);
  console.log("Current filters:", filters);
  console.log("Search term:", searchTerm);

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => !filters.category || product.category === filters.category)
    .filter((product) => product.priceValue >= filters.priceRange.min && product.priceValue <= filters.priceRange.max)
    .filter((product) => !filters.brand || product.brand === filters.brand)
    .filter((product) => !filters.rating || product.rating >= filters.rating)
    .filter((product) => !filters.color || product.color === filters.color)
    .sort((a, b) => {
      if (sortOption === "Price: Low to High") return a.priceValue - b.priceValue;
      if (sortOption === "Price: High to Low") return b.priceValue - a.priceValue;
      if (sortOption === "Newest") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  console.log("Filtered products:", filteredProducts);

  return (
    <div className="flex bg-white shadow container mx-auto">
      <FilterSidebar filters={filters} setFilters={setFilters} />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product, index) => (
            <CategoryProductCard key={index} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategorySearchPage;
