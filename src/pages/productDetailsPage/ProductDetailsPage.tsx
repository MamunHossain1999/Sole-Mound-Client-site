/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect, type JSX } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import ProductReviewsSection from "./ProductReviwsSection";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import RelatedProducts from "./RelatedProducts";
import { useGetProductByIdQuery } from "@/Redux/api/productApi";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewsQuery,
} from "@/Redux/api/reviewApi";
import { useAddHistoryMutation } from "@/Redux/api/historyApi";
import { useAddCartMutation } from "@/Redux/api/cartApi";
import { useCreateCheckoutSessionMutation } from "@/Redux/api/paymentApi";
import { toast } from "react-toastify";

import { useCreateOrderMutation } from "@/Redux/api/orderApi";
import { useGetProfileQuery } from "@/Redux/api/userApi";

// ✅ Product Type
interface IProduct {
  _id: string;
  name: string;
  sku?: string;
  brand?: string;
  category?: string;
  ratingsAverage: number;
  ratingsCount: number;
  quantity: number;
  price: number;
  discount: number;
  images: string[];
  colors?: string[];
  description?: string;
}

// ✅ Review Type
interface Review {
  _id?: string;
  user?: { name?: string };
  product?: string | { _id: string }; // ✅ FIX
  rating: number;
  comment?: string;
  createdAt: string;
}
const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  // Review Form State
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>("");

  // API Hooks
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id!, { skip: !id }) as {
    data: IProduct | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const [addHistory] = useAddHistoryMutation();
  const [addCart] = useAddCartMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [createOrder] = useCreateOrderMutation();
  const { data: user } = useGetProfileQuery();
  const { data: reviewsResponse } = useGetAllReviewsQuery();
  const review: Review[] = Array.isArray(reviewsResponse)
    ? reviewsResponse
    : reviewsResponse?.data || [];
  const { data: reviewsData } = useGetReviewsQuery(product?._id || "", {
    skip: !product?._id, // ✅ Only fetch when we have real product ID
  });

  const [createReview] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const reviews: Review[] = reviewsData?.data || [];

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const productReviews = review.filter((r) => {
    if (!product) return false;
    return typeof r.product === "string"
      ? r.product === product._id
      : r.product?._id === product._id;
  });

  const ratingsCount = productReviews.length;
  const ratingsAverage =
    ratingsCount > 0
      ? productReviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount
      : 0;

  // Submit Review
  const handleSubmitReview = async () => {
    if (!id) return;
    try {
      await createReview({
        productId: id,
        data: { rating: reviewRating, comment: reviewComment.trim() },
      }).unwrap();

      setReviewComment("");
      toast.success("Thank you! Your review has been submitted.");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  // Delete Review
  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };
  // Default Shipping Data (Fallback)
  const shippingAddress = {
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "Unknown Address",
    city: user?.city || "",
    postalCode: "",
    country: user?.country || "Bangladesh",
  };
  // Add to History
  useEffect(() => {
    if (!product?._id) return;

    const viewed = sessionStorage.getItem("viewedProduct");
    if (viewed !== product._id) {
      addHistory(product._id);
      sessionStorage.setItem("viewedProduct", product._id);
    }
  }, [product?._id, addHistory]);

  // ✅ Buy Now Handler (Fixed & Improved)
  const handleBuyNow = async (): Promise<void> => {
    if (!product) return;

    try {
      const finalPrice: number =
        product.price - (product.price * (product.discount || 0)) / 100;

      const totalAmount: number = finalPrice * quantity;

      /* =========================
       STEP 1: CREATE ORDER
    ========================= */

      const orderRes = await createOrder({
        products: [
          {
            productId: product._id,
            name: product.name,
            price: finalPrice,
            quantity,
            image: product.images?.[0] || "",
            sku: product.sku,
          },
        ],
        totalAmount,
        shippingAddress,
      }).unwrap();

      const orderId: string | undefined = orderRes?.data?._id;

      if (!orderId) {
        toast.error("Order create failed");
        return;
      }

      /* =========================
       STEP 2: STRIPE CHECKOUT
    ========================= */

      const paymentRes = await createCheckoutSession({
        orderId,
        totalAmount,
      }).unwrap();

      if (paymentRes?.url) {
        window.location.href = paymentRes.url;
      } else {
        toast.error("Payment URL not found");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Payment failed");
    }
  };

  // Add to Cart
  const handleAddToCart = async (productId: string) => {
    try {
      await addCart({ productId, quantity: 1 }).unwrap();
      toast.success("Added to cart successfully!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollLeft += direction === "left" ? -100 : 100;
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || null);
      setSelectedColor(product.colors?.[0] || null);
    }
  }, [product]);

  if (isLoading) return <p className="text-center py-10">Loading product...</p>;
  if (isError || !product)
    return <p className="text-center py-10 text-red-500">Product not found!</p>;

  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage || "/no-image.png"}
            alt={product.name}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover rounded-lg"
          />

          <div className="relative mt-4">
            <button
              onClick={() => scrollThumbnails("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#C8A8E9] px-2 w-8 h-8 rounded-full shadow hover:bg-[#bf88f5]"
            >
              <FaArrowLeftLong />
            </button>

            <div
              ref={thumbnailRef}
              className="flex overflow-x-auto gap-2 px-8 scrollbar-hide"
            >
              {product.images?.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`h-20 w-20 cursor-pointer rounded border-2 shrink-0 ${
                    selectedImage === img
                      ? "border-purple-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            <button
              onClick={() => scrollThumbnails("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#C8A8E9] px-2 w-8 h-8 rounded-full shadow hover:bg-[#bf88f5]"
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start mb-2">
            <div className="flex text-[#FFC61C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < Math.round(ratingsAverage) ? "currentColor" : "none"
                  }
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-[#1F1F1F] ml-2">
              {ratingsAverage.toFixed(1)} Star Rating{" "}
              <span className="text-xs text-[#919191]">
                ({ratingsCount} reviews)
              </span>
            </span>
          </div>

          <h2 className="text-[24px] font-bold mt-2 text-[#191C1F]">
            {product.name}
          </h2>

          <div className="text-base mt-3 space-y-1 text-[#505050]">
            <p>
              SKU: <span className="text-black">{product.sku || "N/A"}</span>
            </p>
            <p>
              Availability:{" "}
              <span className="text-[#22C55E] font-medium">
                {product.quantity > 0 ? "In Stock" : "Out of Stock"} (
                {product.quantity})
              </span>
            </p>
            <p>
              Brand:{" "}
              <span className="text-black">{product.brand || "N/A"}</span>
            </p>
            <p>
              Category:{" "}
              <span className="text-black">{product.category || "N/A"}</span>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <span className="text-[#505050] text-lg">Price:</span>
            <span className="text-[#3CA6FC] text-2xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="line-through text-[#919191] text-lg">
                  ${product.price}
                </span>
                <span className="bg-[#FFC61C] text-[#1F1F1F] text-sm px-3 py-1 rounded font-medium">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border cursor-pointer border-gray-300 rounded hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 text-center border border-gray-300 rounded py-2"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border cursor-pointer border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleAddToCart(product._id)}
              className="flex-1 bg-[#C8A8E9] cursor-pointer hover:bg-[#b38fd9] text-white py-4 rounded-lg font-semibold transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#A8537B] cursor-pointer hover:bg-[#8f3f5f] text-white py-4 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description, Reviews, Related Products */}
      <div className="container mx-auto p-4 mt-12">
        <h3 className="text-2xl font-bold mb-4">Product Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description || "No description available for this product."}
        </p>
      </div>
      {/* Reviews Section */}
      <div className="p-6 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Customer Reviews
        </h3>

        <div className="space-y-8">
          {reviews?.length > 0 ? (
            reviews?.map((review) => (
              <div key={review._id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">{review?.user?.name}</p>
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(review._id || "")}
                    className="text-red-600 text-sm border cursor-pointer rounded-sm px-2 py-1 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>

                {review.comment && (
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>

        {/* Add Review Form */}
        <div className="mt-12 border p-6 rounded-xl bg-gray-50">
          <h4 className="font-semibold mb-4">Write a Review</h4>

          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewRating(star)}
                className={`text-4xl transition-colors ${star <= reviewRating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="What did you think about this product?"
            className="w-full border border-gray-300 rounded-lg p-4 text-sm min-h-[110px]"
          />

          <button
            onClick={handleSubmitReview}
            className="mt-4 bg-[#E3AADD] cursor-pointer hover:bg-purple-300 text-white px-8 py-3 rounded-lg font-medium"
          >
            Submit Review
          </button>
        </div>
      </div>
      <div className="container mx-auto p-4 mt-12">
        <ProductReviewsSection productId={product._id} />
      </div>

      <div className="container mx-auto p-4 mt-12">
        <h3 className="text-2xl font-bold mb-6">Related Products</h3>
        <RelatedProducts
          category={product.category}
          currentProductId={product._id}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
