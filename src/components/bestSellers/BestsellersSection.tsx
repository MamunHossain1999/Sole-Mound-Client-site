import {
  useGetBestSellersQuery,
  useGetTopCategoriesQuery,
} from "@/Redux/api/topCategoryApi";
import { useGetWeeklyDealsQuery } from "@/Redux/api/weeklyDealsApi";
import { Link } from "react-router-dom";

/* ================= TYPES ================= */

interface Product {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
}

interface Category {
  _id: string;
  image?: string;
  total: number;
}

/* ================= COMPONENT ================= */

const BestsellersSection: React.FC = () => {
  const {
    data: bestSellers,
    isLoading: bestLoading,
    isError: bestError,
  } = useGetBestSellersQuery();

  const {
    data: topCategories,
    isLoading: catLoading,
    isError: catError,
  } = useGetTopCategoriesQuery();

  const {
    data: weeklyDeals,
    isLoading: dealLoading,
    isError: dealError,
  } = useGetWeeklyDealsQuery();

  /* ===== LOADING ===== */
  if (bestLoading || catLoading || dealLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  /* ===== ERROR ===== */
  if (bestError || catError || dealError) {
    return <div className="text-center py-10">Something went wrong</div>;
  }

  return (
    <div className="container mx-auto lg:px-0 ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT - BESTSELLERS */}
        <div className="w-full lg:w-1/2 bg-[#F5F5F5] rounded-xl p-4 md:p-4 lg:p-6">
          <div className="mb-4">
            <h2 className="text-base md:text-2xl font-bold text-[#1F1F1F]">
              Bestsellers
            </h2>
            <p className="text-sm md:text-base text-[#1F1F1F]">
              Get discounts on popular items
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {bestSellers?.slice(0, 6).map((item: Product) => (
              <Link to={`/product-details/${item._id}`} key={item._id}>
                <div className="relative">
                  <img
                    src={item.image || item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-32 md:h-40 object-cover"
                  />
                  <div className="text-[#1F1F1F] mt-1 text-sm text-right">
                    {item.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-end">
            <Link to="/best-seller">
              <p className="text-[#3CA6FC] font-normal text-sm">
                Discover more
              </p>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 space-y-4">
          {/* TOP CATEGORIES */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-4 lg:p-6">
            <div className="flex justify-between items-center mb-4 ">
              <div className="text-base md:text-2xl font-bold text-[#1F1F1F]">
                Deals on Top Categories
              </div>

              <Link to="/category-search-page">
                <p className="text-[#3CA6FC] font-normal text-sm">
                  Discover more
                </p>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {topCategories?.slice(0, 3).map((cat: Category) => (
                <div key={cat._id}>
                  <div className="w-full h-32 md:h-40 bg-white rounded overflow-hidden">
                    <img
                      src={cat.image || "/placeholder.png"}
                      alt={cat._id}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-2 text-sm text-right text-[#000000]">
                    {cat._id}
                  </div>

                  <div className="text-xs text-right text-gray-500">
                    {cat.total} products
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WEEKLY DEALS */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-4 lg:p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-base md:text-2xl font-bold text-[#1F1F1F] ">
                Weekly Deals
              </div>

              <Link to="/weekly-deals">
                <p className="text-[#3CA6FC] font-normal text-sm">
                  Discover more
                </p>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {weeklyDeals?.slice(0, 3).map((item: Product) => (
                <Link
                  to={`/product-details/${item._id}`}
                  key={item._id}
                >
                  <div>
                    <img
                      src={
                        item.image ||
                        item.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={item.name}
                      className="w-full h-32 md:h-40 object-cover"
                    />

                    <div className="mt-2 text-sm text-right text-[#000000]">
                      {item.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestsellersSection;