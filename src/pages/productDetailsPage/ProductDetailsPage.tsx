/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import ProductReviewsSection from "./ProductReviwsSection";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import RelatedProducts from "./RelatedProducts";
import {
  PiHandshakeThin,
  PiHeadphonesThin,
  PiMedalThin,
  PiTruckThin,
} from "react-icons/pi";
import { VscCreditCard } from "react-icons/vsc";

import { useGetProductByIdQuery } from "@/Redux/api/productApi";
import { useGetAllReviewsQuery } from "@/Redux/api/reviewApi";
import { useAddHistoryMutation } from "@/Redux/api/historyApi";
import { useAddCartMutation } from "@/Redux/api/cartApi";
import { toast } from "react-toastify";

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

// features icon
const featureIcons = [
  <PiMedalThin />,
  <PiTruckThin />,
  <PiHandshakeThin />,
  <PiHeadphonesThin />,
  <VscCreditCard />,
];

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  // ✅ Product API
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id!, {
    skip: !id,
  }) as { data: IProduct | undefined; isLoading: boolean; isError: boolean };

//   history and related products API
const [addHistory] = useAddHistoryMutation();
const [addCart] = useAddCartMutation();

useEffect(() => {
  if (!product?._id) return;

  const viewed = sessionStorage.getItem("viewedProduct");

  if (viewed !== product._id) {
    addHistory(product._id); // ✅ correct
    sessionStorage.setItem("viewedProduct", product._id);
  }
}, [product?._id, addHistory]);


// handle add to cart
  const handleAddToCart = async (productId: string) => {
    try {
      await addCart({
        productId,
        quantity: 1,
      }).unwrap();

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add");
    }
  };
  // ✅ Reviews API
  const { data: reviewsResponse } = useGetAllReviewsQuery();
  const reviewsData: Review[] = Array.isArray(reviewsResponse)
    ? reviewsResponse
    : reviewsResponse?.data || [];

  // ✅ Filter reviews by product
  const productReviews = reviewsData.filter((r) => {
    if (!product) return false;

    if (typeof r.product === "string") {
      return r.product === product._id;
    }

    return r.product?._id === product._id;
  });

  const ratingsCount = productReviews.length;

  const ratingsAverage =
    ratingsCount > 0
      ? productReviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount
      : 0;

  const scrollThumbnails = (direction: "left" | "right"): void => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollLeft += direction === "left" ? -100 : 100;
    }
  };

  // image + color set
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || null);
      setSelectedColor(product.colors?.[0] || null);
    }
  }, [product]);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !product)
    return (
      <p className="text-center py-10 text-red-500">Something went wrong!</p>
    );

  // ✅ discount price
  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage || "/no-image.png"}
            alt="Product"
            className="w-full h-[300px] sm:h-[200px] md:h-[400px] lg:h-[550px] object-cover rounded-lg"
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
                  alt="Thumbnail"
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
          {/* ⭐ Rating (Dynamic) */}
          <div className="flex items-start mb-2">
            <div className="flex text-[#FFC61C]">
              {[...Array(5)].map((_, i: number) => (
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
                ({ratingsCount} User feedback)
              </span>
            </span>
          </div>

          <h2 className="text-[24px] font-bold mt-2 text-[#191C1F]">
            {product.name}
          </h2>

          <div className="text-base mt-2">
            <p className="text-[#505050]">
              SKU:{" "}
              <span className="text-[#000000]">{product.sku || "N/A"}</span>
            </p>

            <p className="text-[#505050]">
              Availability:{" "}
              <span className="text-[#22C55E] font-medium">
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                {" ("}
                {product.quantity}
                {")"}
              </span>
            </p>

            <p className="text-[#505050]">
              Brand:{" "}
              <span className="text-[#000000]">{product.brand || "N/A"}</span>
            </p>

            <p className="text-[#505050]">
              Category:{" "}
              <span className="text-[#000000]">
                {product.category || "N/A"}
              </span>
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[#505050] text-lg">Price:</span>
            <span className="text-[#3CA6FC] text-base font-semibold">
              ${discountedPrice.toFixed(2)}
            </span>

            {product.discount > 0 && (
              <>
                <span className="line-through text-[#919191]">
                  ${product.price}
                </span>
                <span className="bg-[#FFC61C] text-[#1F1F1F] text-sm px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 border border-gray-300 rounded"
            >
              -
            </button>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 text-center border border-gray-300 rounded"
            />

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 border border-gray-300 rounded"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={() => handleAddToCart(product._id)} className="flex-1 cursor-pointer bg-[#C8A8E9] text-white py-3 rounded-lg">
              Add to Cart
            </button>

            <button className="flex-1 bg-[#A8537B] cursor-pointer text-white py-3 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="container mx-auto p-4 mt-8">
        <h3 className="text-xl font-bold mb-4">Product Description</h3>
        <p className="text-gray-600">
          {product.description || "No description available"}
        </p>
      </div>

      {/* Reviews */}
      <div className="container mx-auto p-4 mt-8">
        <ProductReviewsSection productId={product._id} />
      </div>

      {/* Related */}
      <div className="container mx-auto p-4 mt-8">
        <h3 className="text-xl font-bold mb-4">Related Products</h3>
        <RelatedProducts
          category={product.category}
          currentProductId={product._id}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
