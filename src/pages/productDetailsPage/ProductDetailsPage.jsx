import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import {
  FaCopy,
  FaFacebook,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import ProductReviewsSection from "./ProductReviwsSection";
import { FaArrowLeftLong,  FaArrowRightLong } from "react-icons/fa6";
import RelatedProducts from "./RelatedProducts";
import { PiHandshakeThin, PiHeadphonesThin, PiMedalThin, PiTruckThin } from "react-icons/pi";
import { VscCreditCard, VscHeart } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";

// features icon
const featureIcons = [<PiMedalThin />, <PiTruckThin />, <PiHandshakeThin />, <PiHeadphonesThin />, <VscCreditCard />];

const fetchFetured = async (id) => {
  const { data: products } = await axios.get("/featured.json");
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) throw new Error("Product not found");
  return product;
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const thumbnailRef = useRef(null);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  const {
    data: product = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-product", id],
    queryFn: () => fetchFetured(id),
  });

  // img er jnno
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0]);
      setSelectedColor(product.colors?.[0]);
    }
  }, [product]);

  // const scrollThumbnails = (dir) => {
  //   const scrollAmount = 120;
  //   if (thumbnailRef.current) {
  //     thumbnailRef.current.scrollBy({
  //       left: dir === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !product) return <p className="text-center py-10 text-red-500">Something went wrong!</p>;

  return (
    <div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-[300px] sm:h-[400px] md:h-[550px] object-cover rounded-lg"
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
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Thumbnail"
                  className={`h-20 w-20 cursor-pointer rounded border-2 shrink-0 ${
                    selectedImage === img ? "border-purple-500" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <button
              onClick={() => scrollThumbnails("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#C8A8E9] px-2  w-8 h-8 rounded-full shadow hover:bg-[#bf88f5]"
            >
             <FaArrowRightLong />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {product.rating} Star Rating{" "}
              <span className="text-xs">
                ({product.reviews?.toLocaleString()} User feedback)
              </span>
            </span>
          </div>

          <h2 className="text-[24px] font-bold mt-2 text-[#191C1F]">{product.name}</h2>

          <div className="text-base mt-2">
            <p className="text-[#505050]">
              SKU: <span className="text-[#000000]">{product.sku || "N/A"}</span>
            </p>
            <p className="text-[#505050]">
              Availability:{" "}
              <span className="text-[#22C55E] font-medium">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <p className="text-[#505050]">
              Brand: <span className="text-[#000000]">{product.brand}</span>
            </p>
            <p className="text-[#505050]">
              Category: <span className="text-[#000000]">{product.category}</span>
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[#3CA6FC] text-base font-semibold">
              ${product.currentPrice}
            </span>
            <span className="line-through text-[#919191] gray-400">${product.originalPrice}</span>
            <span className="bg-yellow-200 text-yellow-800 text-sm px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          </div>
            

            {/* color and size */}
          <div className="grid grid-cols-2 gap-4">
            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mt-5 text-gray-600">
                <label className="block mb-1 font-medium">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full ${
                          isSelected ? "border-2 border-pink-400" : "border-2 border-transparent"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full"
                          style={{
                            backgroundColor: color,
                            border: isSelected ? "2px solid white" : "none",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size */}
            {product?.size && (
              <div className="mt-4 text-[#1F1F1F]">
              <label className="mb-2 text-base font-medium">Size</label>
              <div className="relative">
                <select className="border border-[#E2E3E8] px-3 rounded py-2 w-full appearance-none pr-8">
                  <option>{product.size}</option>
                  {/* Add other size options here if available */}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-[#ADB7BC]"><MdKeyboardArrowDown /></svg>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* input field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Memory */}
              {product?.memory && (
                <div className="mt-4 text-[#1F1F1F]">
                  <label className="block mb-1 font-medium">Memory</label>
                  <div className="relative">
                    <select className="border border-[#E2E3E8] px-3 rounded py-2 w-full appearance-none pr-8">
                      <option>{product?.memory}</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-[#ADB7BC]"><MdKeyboardArrowDown /></svg>
                    </div>
                  </div>
                </div>
              )}

              {/* storage */}
              {product?.store && (
                <div className="mt-4 text-[#1F1F1F]">
                  <label className="block mb-1 font-medium">Storage</label>
                  <div className="relative">
                    <select className="border border-[#E2E3E8] px-3 rounded py-2 w-full appearance-none pr-8">
                      <option>{product?.store}</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-[#ADB7BC]"><MdKeyboardArrowDown /></svg>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Quantity & Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-30 justify-end text-[#1F1F1F]">
            <div className="flex items-center border border-[#B6B7BC] py-1 rounded overflow-hidden">
              <button
                className="px-3 text-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 text-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="space-x-2">
              <button className="bg-[#C8A8E9] text-[#1F1F1F] px-6 py-2 text-base rounded hover:bg-purple-400 transition">
                Add to Cart
              </button>
              <button className="border border-[#B6B7BC] text-[#1F1F1F] text-base px-6 py-2 rounded hover:bg-gray-100 transition">
                Buy
              </button>
            </div>
          </div>

          {/* Wishlist & Share */}
          <div className="mt-4 text-lg text-[#505050] ">
            <div className="flex flex-col sm:flex-row justify-end gap-25">
              <button className="hover:text-[#505050] text-base flex items-center gap-1">
                <VscHeart className="text-2xl" /> Add to Wishlist
              </button>
              <div className="flex gap-2 items-center">
                <span className="text-base">Share product:</span>
                <span className="cursor-pointer hover:text-purple-600"><FaCopy/></span>
                <span className="cursor-pointer hover:text-purple-600"><FaFacebook /></span>
                <span className="cursor-pointer hover:text-purple-600"><FaTwitter /></span>
                <span className="cursor-pointer hover:text-purple-600"><FaPinterest /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="container mx-auto px-4">
        <div>
          <h3 className="text-[20px] font-bold text-[#1F1F1F]">Description</h3>
          <span className="text-[#1F1F1F] text-base">{product.description}</span>
        </div>

       =
        {/* Additional Information */}
        <div className="">
          <h3 className="text-[20px] font-bold text-[#1F1F1F] py-3">Additional information</h3>
          <div className="space-y-1 px-2">
            <div className="flex -ml-2 py-1">
              <p><span className="text-[#1F1F1F] text-base">{product.additional_information.material}</span> </p>
            </div>
            <div className="flex -ml-2 py-1">
              <p className="text-[#1F1F1F]"><span className="text-[#1F1F1F] text-base">{product.additional_information.node}</span></p>
            </div>
      
          </div>
        </div>


        {/* Features and Shipping */}
        <div className="py-6 flex flex-col md:flex-row gap-8">
          <div className="text-[#1F1F1F] text-base w-full md:w-1/2">
            <h3 className="text-[20px] font-bold text-[#1F1F1F] py-3">Features</h3>
            {product?.features?.map((feature, index) => (
              <div key={index} className="flex -ml-2 py-1">
                <span className="text-[#C8A8E9] w-10 flex items-center justify-center">
                  {React.cloneElement(featureIcons[index], { size: 24 })}
                </span>
                <p>{feature}</p>
              </div>
            ))}
          </div>


          {/* right side */}
          <div className="text-[#1F1F1F] text-base w-full md:w-1/2 space-y-1">
            <h3 className="text-[20px] font-bold text-[#1F1F1F] py-3">Shipping Information</h3>
            <div className="flex items-center space-x-2">
              <span>Cost:</span>
              <p>{product.shipping_information?.shipping_cost}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>Delivery Time:</span>
              <p>{product.shipping_information?.estimated_delivery_time}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>Methods:</span>
              <p>{product.shipping_information?.shipping_methods?.join(", ")}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>Tracking:</span>
              <p>
                {product.shipping_information?.tracking_available
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="container mx-auto px-4">
        <ProductReviewsSection />
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 pb-10">
        <RelatedProducts/>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
