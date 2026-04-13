
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

import {
  useAddWishlistCountMutation,
  useGetTrendingProductsQuery,
} from "@/Redux/api/trendingApi";

const TrendingPage = () => {
  const { data=[], isLoading, isError } = useGetTrendingProductsQuery();

  console.log(data)
  const [addWishlist] = useAddWishlistCountMutation();

  // ❌ removed: addView from trending page (wrong place)

  // =========================
  // LOADING
  // =========================
  if (isLoading) return <p className="p-4">Loading trending products...</p>;

  // =========================
  // ERROR
  // =========================
  if (isError)
    return <p className="p-4 text-center text-red-500">Error loading trending products</p>;

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">🔥 Trending Products</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {data?.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded shadow relative"
            >

              {/* ❤️ Wishlist Button (TOGGLE RECOMMENDED) */}
              <button
                onClick={() => addWishlist(product._id)}
                className="absolute top-2 right-2 text-red-500 hover:scale-110 transition"
              >
                <FaRegHeart />
              </button>

              {/* Product Image */}
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-[200px] object-cover rounded"
              />

              {/* Info */}
              <h3 className="mt-2 text-sm font-semibold">
                {product.name}
              </h3>

              <p className="text-pink-500 font-bold">
                ${product.price}
              </p>

              {/* Stats */}
              <div className="text-xs text-gray-500 mt-1">
                👀 {product.views ?? 0} views
                <br />
                ❤️ {product.wishlistCount ?? 0} wishlist
                <br />
                🛒 {product.salesCount ?? 0} sales
              </div>

              {/* View Button */}
              <Link
                to={`/product-details/${product._id}`}
                className="block mt-3 bg-[#E3AADD] text-white text-center py-2 rounded hover:bg-purple-400 transition"
              >
                View Details
              </Link>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TrendingPage;