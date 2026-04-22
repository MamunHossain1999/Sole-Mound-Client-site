import { useGetBestSellersQuery } from "@/Redux/api/topCategoryApi";
import { Link } from "react-router-dom";

/* ================= TYPE ================= */
interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[]; // 🔥 optional করা হয়েছে (important fix)
}

const BestSellerPage: React.FC = () => {
  const { data, isLoading, isError } = useGetBestSellersQuery();

  if (isLoading)
    return <div className="text-center py-10">Loading best sellers...</div>;

  if (isError)
    return <div className="text-center py-10">Failed to load products</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#1F1F1F]">
          🔥 Best Sellers
        </h1>
        <p className="text-gray-500 mt-2">
          Most popular products selected for you
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {data?.map((item: Product) => (
          <Link
            to={`/product-details/${item._id}`}
            key={item._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={item.images?.[0] || "/placeholder.png"} // 🔥 SAFE FIX
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* INFO */}
            <div className="p-3 text-right">
              <h3 className="text-sm font-semibold text-[#1F1F1F]">
                {item.name}
              </h3>
              <p className="text-purple-600 font-bold">$ {item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellerPage;