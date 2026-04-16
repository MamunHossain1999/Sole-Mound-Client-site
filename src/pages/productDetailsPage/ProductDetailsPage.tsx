/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import ProductReviewsSection from "./ProductReviwsSection";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import RelatedProducts from "./RelatedProducts";

import { useGetProductByIdQuery } from "@/Redux/api/productApi";
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";
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
  _id: string;
  product: string | { _id: string };
  rating: number;
  comment?: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const thumbnailRef = useRef<HTMLDivElement>(null);

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

  // Default Shipping Data (Fallback)
  const shippingAddress = {
    fullName: user?.name || "",
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

  // Reviews
  const { data: reviewsResponse } = useGetAllReviewsQuery();
  const reviewsData: Review[] = Array.isArray(reviewsResponse)
    ? reviewsResponse
    : reviewsResponse?.data || [];

  const productReviews = reviewsData.filter((r) => {
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
              className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
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
              className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleAddToCart(product._id)}
              className="flex-1 bg-[#C8A8E9] hover:bg-[#b38fd9] text-white py-4 rounded-lg font-semibold transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#A8537B] hover:bg-[#8f3f5f] text-white py-4 rounded-lg font-semibold transition"
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
