import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useGetWeeklyDealsQuery } from "@/Redux/api/weeklyDealsApi";
import { Link } from "react-router-dom";
import { useAddCartMutation } from "@/Redux/api/cartApi";
import { useAddWishlistMutation } from "@/Redux/api/wishlistApi";
import { toast } from "react-toastify";

export interface DealProduct {
  _id: string;
  name?: string;
  title?: string;
  price: number;
  discount?: number;
  originalPrice?: number;
  discountedPrice?: number;
  images?: string[];
  label?: "hot" | "new" | "sale" | "sold out" | string;
  dealType?: "weekly" | "today" | "none";
  startDate?: string;
}

// ⏱ time calculator
const calculateRemainingTime = (endDate: Date) => {
  const totalMs = endDate.getTime() - new Date().getTime();
  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return { totalMs, days, hours, minutes, seconds };
};

// 🎨 badge color
const getLabelColor = (label?: string) => {
  switch (label?.toLowerCase()) {
    case "hot":
      return "bg-[#C8A8E9]";
    case "new":
      return "bg-[#A5D6FE]";
    case "sale":
      return "bg-[#B6DC91]";
    case "sold out":
      return "bg-[#B6B7BC]";
    default:
      return "bg-yellow-500";
  }
};

const WeeklyDeals = () => {
  const { data, isLoading, isError } = useGetWeeklyDealsQuery();
  const [addCart] = useAddCartMutation();
  const [addWishlist] = useAddWishlistMutation();

  const [filteredDeals, setFilteredDeals] = useState<DealProduct[]>([]);
  const [countdown, setCountdown] = useState<string | null>(null);

  // Add to cart
  const handleAddToCart = async (productId: string) => {
    try {
      await addCart({
        productId,
        quantity: 1,
      }).unwrap();

      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  // Add to wishlist
  const handleAddWishlist = async (productId: string) => {
    try {
      await addWishlist(productId).unwrap();
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Failed to add wishlist");
    }
  };

  useEffect(() => {
    const deals: DealProduct[] = data ?? [];

    if (!deals.length) return;

    const validDeals = deals.filter((deal) => {
      if (!deal.startDate) return true;

      const start = new Date(deal.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 16);

      return new Date() < end;
    });

    setFilteredDeals(validDeals);

    const soonestEnd = validDeals.reduce<Date | null>((earliest, deal) => {
      if (!deal.startDate) return earliest;

      const start = new Date(deal.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 16);

      return !earliest || end < earliest ? end : earliest;
    }, null);

    if (!soonestEnd) return;

    const interval = setInterval(() => {
      const { totalMs, days, hours, minutes } =
        calculateRemainingTime(soonestEnd);

      if (totalMs <= 0) {
        clearInterval(interval);
        setCountdown(null);
      } else {
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="bg-gray-100 py-10 md:pb-36">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="rounded-lg md:p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#191C1F]">
            Weekly Best Deals
          </h2>

          {countdown ? (
            <div className="text-[#1F1F1F] rounded-md md:px-3 py-1 text-sm font-medium flex flex-wrap items-center">
              <span className="mr-2">Deals end in</span>
              <span className="text-[#1F1F1F] text-base md:text-[32px] px-4 bg-[#C8A8E9] font-medium rounded">
                {countdown}
              </span>
            </div>
          ) : (
            <div className="text-red-600 font-medium text-sm">
              Deals expired
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDeals?.map((deal) => (
            <div
              key={deal._id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative p-4 flex flex-col"
            >
              {/* Wishlist Icon */}
              <button
                onClick={() => handleAddWishlist(deal._id)}
                className="absolute top-2 right-2 bg-[#FDF1F7] text-gray-500 hover:text-pink-500 rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
              >
                <FaRegHeart className="w-6 h-6" />
              </button>

              {/* Badge */}
              {(deal?.label || deal?.discount) && (
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {deal.label && (
                    <span
                      className={`text-white text-xs font-bold rounded-tl-2xl rounded-br-2xl px-4 py-2 ${getLabelColor(
                        deal.label,
                      )}`}
                    >
                      {deal.label}
                    </span>
                  )}

                  {deal.discount && (
                    <span className="bg-[#FF9797] text-white text-xs font-bold rounded-tl-2xl rounded-br-2xl px-2 py-2 w-fit">
                      {deal.discount} %
                    </span>
                  )}
                </div>
              )}

              {/* Image */}
              <div className="w-full h-[200px] flex items-center justify-center overflow-hidden">
                <img
                  src={deal?.images?.[0] || "/placeholder.jpg"}
                  alt={deal?.title || deal?.name || "product"}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-sm font-medium text-[#191C1F] mb-2 line-clamp-2">
                  {deal?.title || deal?.name}
                </h3>

                {/* Price */}
                {deal?.originalPrice && deal?.discountedPrice ? (
                  <div className="flex items-center text-sm mb-2">
                    <span className="line-through text-gray-500 mr-2">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                    <span className="font-semibold text-[#A8537B]">
                      ${deal.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <p className="text-base font-semibold text-[#A8537B]">
                    ${deal?.price ? deal.price.toFixed(2) : ""}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex justify-between gap-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(deal._id)}
                    className="flex-1 bg-[#E3AADD] text-[#1F1F1F] rounded-md px-3 py-2 cursor-pointer text-sm hover:bg-pink-300 transition"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/product-details/${deal._id}`}
                    className="flex-1 border text-center border-[#C8A8E9] text-[#1F1F1F] rounded-md px-3 py-2 cursor-pointer text-sm hover:bg-purple-100 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyDeals;
