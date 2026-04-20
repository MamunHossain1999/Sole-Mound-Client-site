import React, { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import PriceRangeFilter from "./PriceRangeFilter";
import { useGetProductsQuery } from "@/Redux/api/productApi";
import { useAddCartMutation } from "@/Redux/api/cartApi";
import { toast } from "react-toastify";
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";
import { Link } from "react-router";

/* =========================
   TYPES
========================= */
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];

  category?: string;
  brand?: string;
  color?: string;
  rating?: number;

  status: "Low Stock" | "Published" | "Draft" | "Out of Stock";
  discount: number;
  quantity: number;

  createdAt?: string;
  updatedAt?: string;
}

interface Filters {
  category: string;
  priceRange: { min: number; max: number };
  brand: string;
  rating: number;
  color: string;
  search: string;
}

/* =========================
   OPTIONS
========================= */
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

const priceRanges = [
  { label: "All Price", min: 0, max: 10000 },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1,000", min: 500, max: 1000 },
  { label: "$1,000 to $10,000", min: 1000, max: 10000 },
];

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
const colors: string[] = [
  "Black",
  "Yellow",
  "Red",
  "Green",
  "Silver",
  "Gold",
  "White",
];

/* =========================
   FILTER SIDEBAR
========================= */
interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 10);

  const handleChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K],
  ): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-72 p-4 space-y-6 pb-12">
      {/* Category */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Category
        </h4>

        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {visibleCategories?.map((item: string) => (
            <li key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category === item}
                onChange={() =>
                  handleChange(
                    "category",
                    filters.category === item ? "" : item,
                  )
                }
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

      {/* Price */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">
          Price Range
        </h4>

        <PriceRangeFilter
          ranges={priceRanges}
          selectedRange={filters.priceRange ?? { min: 0, max: 10000 }}
          onRangeChange={(range) => handleChange("priceRange", range)}
        />
      </div>

      {/* Brand */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">Brand</h4>

        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {brands.map((brand: string) => (
            <li key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brand === brand}
                onChange={() =>
                  handleChange("brand", filters.brand === brand ? "" : brand)
                }
                className="mr-2"
              />
              <label className="cursor-pointer">{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
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
                onChange={() =>
                  handleChange("rating", filters.rating === rating ? 0 : rating)
                }
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

      {/* Color */}
      <div>
        <h4 className="font-semibold text-[#191C1F] text-base mb-2">Color</h4>

        <ul className="space-y-2 text-base font-normal text-[#191C1F]">
          {colors.map((color: string) => (
            <li key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.color === color}
                onChange={() =>
                  handleChange("color", filters.color === color ? "" : color)
                }
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

/* =========================
   MAIN PAGE
========================= */

const CategorySearchPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    priceRange: { min: 0, max: 10000 },
    brand: "",
    rating: 0,
    color: "",
    search: "",
  });

  // RTK Queries
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery();

  const [addCart] = useAddCartMutation();

  const { data: reviewsResponse, isLoading: reviewsLoading } =
    useGetAllReviewsQuery();

  // Reviews Data Normalize
  const reviewsData = Array.isArray(reviewsResponse)
    ? reviewsResponse
    : reviewsResponse?.data || [];

  // Average Rating Function
  const getAverageRating = (productId: string): number => {
    const productReviews = reviewsData.filter(
      (review: any) =>
        review.productId === productId || review.product?._id === productId,
    );

    if (productReviews.length === 0) return 0;

    const total = productReviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0,
    );
    return total / productReviews.length;
  };

  // Filtered Products with useMemo (সব ফিল্টার এখন কাজ করবে)
  const filteredProducts = useMemo(() => {
    if (productsLoading || reviewsLoading) return [];

    return products.filter((product: IProduct) => {
      const avgRating = getAverageRating(product._id);

      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesColor = !filters.color || product.color === filters.color;
      const matchesRating = !filters.rating || avgRating >= filters.rating;
      const matchesPrice =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;
      const matchesSearch =
        !filters.search ||
        product.name
          ?.toLowerCase()
          .includes(filters.search.toLowerCase().trim());

      return (
        matchesCategory &&
        matchesBrand &&
        matchesColor &&
        matchesRating &&
        matchesPrice &&
        matchesSearch
      );
    });
  }, [products, filters, reviewsData, productsLoading, reviewsLoading]);

  // Add to Cart Handler
  const handleAddToCart = async (product: IProduct) => {
    try {
      await addCart({ productId: product._id, quantity: 1 }).unwrap();
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  // Loading & Error States
  if (productsLoading || reviewsLoading) {
    return (
      <p className="text-center py-20 text-lg">
        Loading products and reviews...
      </p>
    );
  }

  if (productsError) {
    return (
      <p className="text-center py-20 text-red-500 text-lg">
        Failed to load products. Please try again later.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredProducts.length}</span>{" "}
              of <span className="font-semibold">{products.length}</span>{" "}
              products
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-16 text-lg">
              No products found matching your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product: IProduct) => {
                const avgRating = getAverageRating(product._id);
                const discountedPrice =
                  product.price -
                  (product.price * (product.discount || 0)) / 100;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <img
                      src={product.images?.[0] || "/api/placeholder/300/300"}
                      alt={product.name}
                      className="w-full h-[200px] sm:h-[220px] object-cover rounded-lg"
                    />

                    {/* Rating */}
                    <div className="flex items-center mt-3 mb-2">
                      <div className="flex text-[#FFC61C]">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className="text-lg">
                            {i < Math.floor(avgRating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#919191] ml-2 text-sm">
                        ({avgRating.toFixed(1)})
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-medium text-base text-[#0F0F0F] line-clamp-2 min-h-[44px]">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-xl text-black">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-gray-400 line-through">
                            ${product.price}
                          </span>
                          <span className="text-red-500 text-sm font-medium">
                            {product.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Status */}
                    {product.status && (
                      <span className="inline-block mt-1 text-xs font-medium px-3 py-1 bg-red-100 text-red-600 rounded-full">
                        {product.status}
                      </span>
                    )}

                    {/* Stock */}
                    <div
                      className={`text-sm mt-3 mb-4 font-medium ${product.quantity > 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {product.quantity > 0
                        ? `In Stock (${product.quantity})`
                        : "Out of Stock"}
                    </div>

                    {/* Buttons - Responsive */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 h-11 bg-[#E3AADD] hover:bg-[#d88bc7] text-black font-medium rounded-lg transition-all active:scale-95"
                      >
                        Add to Cart
                      </button>

                      <Link
                        to={`/product-details/${product._id}`}
                        className="flex-1 h-11 border border-[#E3AADD] hover:bg-[#E3AADD] text-black font-medium rounded-lg flex items-center justify-center transition-all active:scale-95"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySearchPage;
