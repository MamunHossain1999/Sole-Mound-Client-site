/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";
import { useState } from "react";

interface Review {
  _id: string;
  product: string | { _id: string };
  rating: number;
  comment?: string;
  user?: {
    name?: string;
    avatar?: string;
  };
}

interface Props {
  productId: string;
}

const ProductReviewsSection: React.FC<Props> = ({ productId }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: reviewsResponse } = useGetAllReviewsQuery();

  const allReviews: Review[] = Array.isArray(reviewsResponse)
    ? reviewsResponse
    : reviewsResponse?.data || [];

  // ✅ filter by product
  const reviews = allReviews.filter((r) => {
    if (typeof r.product === "string") {
      return r.product === productId;
    }
    return r.product?._id === productId;
  });

  // ⭐ render stars (type safe)
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FFD700" : "#E5E7EB"}
          className="inline-block"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  if (reviews.length === 0) {
    return (
      <p className="text-center py-6 text-gray-500">
        No reviews yet
      </p>
    );
  }

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-[20px] font-bold mb-5 text-[#1F1F1F]">
        Reviews
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[0, 1].map((offset) => {
          const index = (activeIndex + offset) % reviews.length;
          const review = reviews[index];

          return (
            <div
              key={review._id}
              className="bg-white rounded-lg p-6 border border-[#E2E3E8]"
            >
              <div className="flex items-center mb-4">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={
                      review.user?.avatar ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <div>
                  <h3 className="font-medium text-[18px] text-[#1F1F1F]">
                    {review.user?.name || "Anonymous"}
                  </h3>
                  <p className="text-[#919191] text-sm">
                    Verified Buyer
                  </p>
                </div>

                {/* Rating */}
                <div className="ml-auto">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className="text-[#1F1F1F] text-base leading-relaxed">
                {review.comment || "No comment"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-purple-600"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsSection;