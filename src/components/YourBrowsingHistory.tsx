import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import favoriteIcon from "../assets/navbarIcon/Vector (3).png";
import cardIcon from "../assets/navbarIcon/Vector (4).png";
import { FaRegEye } from "react-icons/fa";
import { useGetHistoryQuery } from "@/Redux/api/historyApi";
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";
import { Link } from "react-router-dom";
import { useAddWishlistMutation } from "@/Redux/api/wishlistApi";
import { toast } from "react-toastify";
import { useAddCartMutation } from "@/Redux/api/cartApi";

// ✅ Review Type
interface Review {
  _id: string;
  product: string | { _id: string };
  rating: number;
  comment?: string;
}

const YourBrowsingHistory: React.FC = () => {
  const { data = [], isLoading, isError } = useGetHistoryQuery();

  const [addWishlist] = useAddWishlistMutation();
  const [addCart] = useAddCartMutation();

  const { data: reviewResponse, refetch } = useGetAllReviewsQuery();
  const reviews = reviewResponse?.data || [];

  const [historyItems, setHistoryItems] = useState<any[]>([]);

  React.useEffect(() => {
    if (data?.length) {
      setHistoryItems(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  // ✅ Add to wishlist
  const handleAddWishlist = async (productId: string) => {
    try {
      await addWishlist(productId).unwrap();
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Failed to add wishlist");
    }
  };
  // ✅ Add to cart
  const handleAddToCart = async (productId: string) => {
    try {
      await addCart({
        productId,
      }).unwrap();
      refetch();
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add cart");
    }
  };

  // ✅ Get average rating for a product
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

  return (
    <div className="container mx-auto bg-white pt-7 px-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4.5 },
        }}
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {historyItems?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative group bg-[#F8F8F8] hover:bg-[#FDF1F7] rounded-lg overflow-hidden duration-600 border border-transparent hover:border-[#C8A8E9] transition-all">
              {/* Hover Icons */}
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAddWishlist(item.product?._id)}
                    className="bg-white p-4 rounded-full hover:bg-[#C8A8E9] cursor-pointer"
                  >
                    <img src={favoriteIcon} alt="favoriteIcon" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(item.product?._id)}
                    className="bg-white p-4 rounded-full hover:bg-[#C8A8E9] cursor-pointer"
                  >
                    <img src={cardIcon} alt="cardIcon" />
                  </button>
                  <Link
                    className="bg-white p-4 rounded-full hover:bg-[#C8A8E9] cursor-pointer"
                    to={`/product-details/${item?.product?._id}`}
                  >
                    <FaRegEye className="text-gray-700 text-lg cursor-pointer" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <img
                  src={item?.product?.images?.[0]}
                  alt={item?.product?.name}
                  className="w-full h-[250px] object-contain bg-white rounded-lg mb-4 p-3"
                />

                <div className="flex items-center mb-2">
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
                </div>

                <h3 className="font-normal text-[#1F1F1F] text-sm mb-2 line-clamp-2 h-12">
                  {item.product?.name}
                </h3>

                <div className="flex items-center mb-2">
                  <span className="text-[#3CA6FC] text-base font-semibold">
                    ${item.product?.price}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="custom-swiper-pagination mt-4 flex justify-center gap-2"></div>
    </div>
  );
};

export default YourBrowsingHistory;
