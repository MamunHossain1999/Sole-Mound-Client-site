import React, { useState } from "react";

import { toast } from "react-toastify";
import {
  useClearHistoryMutation,
  useGetHistoryQuery,
} from "@/Redux/api/historyApi";
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";

// ✅ Review Type
interface Review {
  _id: string;
  product: string | { _id: string };
  rating: number;
  comment?: string;
}

const BrowsHistory = () => {
  const { data = [], isLoading, isError } = useGetHistoryQuery();
  console.log(data);
  const { data: reviewResponse } = useGetAllReviewsQuery();
  const reviews = reviewResponse?.data || [];

  // ✅ FIX: mutation destructure
  const [clearHistory] = useClearHistoryMutation();

  const [historyItems, setHistoryItems] = useState<any[]>([]);

  React.useEffect(() => {
    if (data?.length) {
      setHistoryItems(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  const getProductRating = (productId: string) => {
    const filtered = reviews?.filter(
      (r: Review) =>
        (r.product as any)?._id === productId || r.product === productId,
    );

    if (!filtered || filtered.length === 0) return 0;

    const total = filtered.reduce(
      (sum: number, r: Review) => sum + r.rating,
      0,
    );

    return total / filtered.length;
  };
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };
  // 🔥 FIXED API CALL
  const handleClearHistory = async () => {
    try {
      await clearHistory().unwrap(); // ✅ real API call
      setHistoryItems([]); // UI update
      toast.success("Browsing history cleared successfully!");
    } catch (err) {
      toast.error("Failed to clear history");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="pt-7 md:pt-5 mx-4">
        <h2 className="text-base text-[#000000] font-semibold">
          Your Browsing History
        </h2>
        <p className="text-[#505050] text-base mb-4">
          These items were viewed recently. We use them to personalize
          recommendations.
        </p>
      </div>

      {historyItems.length === 0 ? (
        <div className="text-center text-gray-500 my-10">
          No browsing history found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer mx-4">
          {historyItems?.map((item, index) => (
            <div
              key={index}
              className="bg-[#FDF1F7] hover:border rounded-lg p-4 overflow-hidden cursor-pointer duration-600 border border-transparent hover:border-[#C8A8E9] transition-all"
            >
              {/* IMAGE FIX */}
              <div>
                <img
                  src={item.product?.images?.[0]} // ✅ FIXED
                  alt={item.product?.name}
                  className="w-full h-auto object-cover rounded"
                />
              </div>

              <div>
                <div className="flex items-center text-[#919191] mt-1">
                  {renderStars(getProductRating(item.product?._id))}

                  <span className="ml-2 text-sm">
                    (
                    {
                      reviews?.filter(
                        (r: any) =>
                          (r.product?._id || r.product) === item.product?._id,
                      ).length
                    }
                    )
                  </span>
                </div>

                <h3 className="text-base font-normal text-[#191C1F] mt-1">
                  {item.product?.name} {/* ✅ FIXED */}
                </h3>

                <p className="text-base text-[#2DA5F3] font-semibold mt-3">
                  ${item.product?.price} {/* ✅ FIXED */}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {historyItems.length > 0 && (
        <div className="flex justify-center md:justify-end gap-4 py-8">
          <button
            onClick={handleClearHistory}
            className="px-6 py-2 bg-white border border-[#B6B7BC] text-[#1F1F1F] text-base rounded hover:bg-[#C8A8E9]"
          >
            Clear All History
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowsHistory;
