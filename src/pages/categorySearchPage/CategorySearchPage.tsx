import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import CategoryProductCard from "./CategoryProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import PriceRangeFilter from "./PriceRangeFilter";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  color?: string;
  inStock: boolean;
}

interface Filters {
  category: string;
  priceRange: { min: number; max: number };
  brand: string;
  rating: number;
  color: string;
  search: string;
}

// Fetch function
const fetchCategoryProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>("/categoryProduct.json");
  return data;
};

// Filter options
const categories: string[] = [
  "Electronic Devices",
  "Accessories & Supplies",
  "Camera & Photo",
  "Car & Vehicle Electronics",
  "Cell Phones & Accessories",
  "Computers & Accessories",
  "GPS & Navigation",
  "Headphones",
  "Home Audio",
  "Other Electronics",
  "Gaming Accessories",
  "Wearable Technology",
  "Television & Video",
  "Smart Home",
  "Office Electronics",
];

// product ranges
const priceRanges = [
  { label: "All Price", min: 0, max: 10000 },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1,000", min: 500, max: 1000 },
  { label: "$1,000 to $10,000", min: 1000, max: 10000 },
];

// product brands
const brands: string[] = [
  "Apple",
  "Google",
  "Microsoft",
  "Samsung",
  "Dell",
  "HP",
  "Symphony",
  "Xiaomi",
  "Sony",
  "Panasonic",
  "LG",
  "Intel",
  "One Plus",
];

const ratings: number[] = [5, 4, 3, 2, 1];
const colors: string[] = ["Black", "Yellow", "Red", "Green", "Silver", "Gold", "White"];

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 10);
  
  const handleChange = (key: keyof Filters, value: any): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-72 p-4 space-y-6 pb-12">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Category
        </h4>
        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {visibleCategories.map((item: string) => (
            <li key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category === item}
                onChange={() => handleChange("category", filters.category === item ? "" : item)}
                className="mr-2"
              />
              <label className="cursor-pointer">{item}</label>
            </li>
          ))}
        </ul>
        {categories.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#3CA6FC] text-sm mt-2 hover:underline"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Price Range
        </h4>
        <PriceRangeFilter
          ranges={priceRanges}
          selectedRange={filters.priceRange}
          onRangeChange={(range) => handleChange("priceRange", range)}
        />
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Brand
        </h4>
        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {brands.map((brand: string) => (
            <li key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brand === brand}
                onChange={() => handleChange("brand", filters.brand === brand ? "" : brand)}
                className="mr-2"
              />
              <label className="cursor-pointer">{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Customer Rating
        </h4>
        <ul className="space-y-2">
          {ratings.map((rating: number) => (
            <li key={rating} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.rating === rating}
                onChange={() => handleChange("rating", filters.rating === rating ? 0 : rating)}
                className="mr-2"
              />
              <div className="flex items-center">
                <div className="flex text-[#FFC61C]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      fill={i < rating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">& Up</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Color
        </h4>
        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {colors.map((color: string) => (
            <li key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.color === color}
                onChange={() => handleChange("color", filters.color === color ? "" : color)}
                className="mr-2"
              />
              <label className="cursor-pointer">{color}</label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const CategorySearchPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    priceRange: { min: 0, max: 10000 },
    brand: "",
    rating: 0,
    color: "",
    search: "",
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["category-products"],
    queryFn: fetchCategoryProducts,
  });

  // Filter products based on selected filters
  const filteredProducts = products.filter((product: Product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.color && product.color !== filters.color) return false;
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Products Grid */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#A8537B]"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A8537B]"></div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySearchPage;
