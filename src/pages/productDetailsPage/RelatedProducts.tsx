/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "@/Redux/api/productApi";
import { useAddCartMutation } from "@/Redux/api/cartApi";

// ✅ Product Type
interface IProduct {
  _id: string;
  name: string;
  category?: string;
  images: string[];
  price: number;
  discount: number;
  quantity: number;
  ratingsAverage?: number;
  ratingsCount?: number;
}

// ✅ Props Type
interface Props {
  category?: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<Props> = ({ category, currentProductId }) => {
  // ✅ API
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [addCart] = useAddCartMutation();

  // ✅ Filter related products
  const relatedProducts: IProduct[] = products.filter(
    (p: IProduct) => p.category === category && p._id !== currentProductId,
  );

  // ✅ Add to cart
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

  if (isLoading)
    return <p className="text-center">Loading related products...</p>;

  if (isError)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        modules={[Pagination]}
        className="mySwiper pb-16"
      >
        {relatedProducts?.map((product: IProduct, index: number) => {
          const discountedPrice =
            product.price - (product.price * (product.discount || 0)) / 100;

          return (
            <SwiperSlide key={index}>
              <div className="mx-auto border border-[#919191] transition-all duration-600">
                <div className="p-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-[250px] object-cover mb-4"
                  />

                  {/* ⭐ Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#FFC61C]">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {i < Math.round(product.ratingsAverage || 0)
                            ? "★"
                            : "☆"}
                        </span>
                      ))}
                    </div>

                    <span className="text-[#919191] ml-1 text-[12px]">
                      ({product.ratingsCount || 0})
                    </span>
                  </div>

                  {/* 🏷️ Name */}
                  <h3 className="text-base mb-2 line-clamp-2 h-14">
                    {product.name}
                  </h3>

                  {/* 💰 Price */}
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-base">
                      ${discountedPrice.toFixed(2)}
                    </span>

                    {product.discount > 0 && (
                      <>
                        <span className="line-through ml-2">
                          ${product.price}
                        </span>
                        <span className="text-red-500 text-sm px-2 ml-2">
                          {product.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* 📦 Stock */}
                  <div className="text-green-500 mb-3">
                    In stock - {product.quantity}
                  </div>

                  {/* 🛒 Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/product-details/${product._id}`}
                      className="flex-1"
                    >
                      <button className="bg-white border h-[46px] text-[#1F1F1F] border-[#E3AADD] rounded-md px-2 py-2 text-sm md:text-base hover:bg-[#E3AADD] w-full cursor-pointer">
                        View Details
                      </button>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="flex-1 border text-[#1F1F1F] h-[46px] border-[#E3AADD] rounded-md px-4 py-2 text-sm md:text-base bg-[#E3AADD] w-full cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Pagination */}
      <div className="custom-swiper-pagination mt-4 flex justify-center gap-2"></div>
    </div>
  );
};

export default RelatedProducts;
