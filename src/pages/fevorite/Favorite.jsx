
// import React from "react";
// import { Heart, ShoppingCart } from "lucide-react";

// const products = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/100",
//     title:
//       "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
//     oldPrice: "$129.00",
//     newPrice: "$99.00",
//     inStock: true,
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/100",
//     title:
//       "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
//     oldPrice: "$129.00",
//     newPrice: "$99.00",
//     inStock: false,
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/100",
//     title:
//       "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
//     oldPrice: "$129.00",
//     newPrice: "$99.00",
//     inStock: true,
//   },
//   {
//     id: 4,
//     image: "https://via.placeholder.com/100",
//     title:
//       "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
//     oldPrice: "$129.00",
//     newPrice: "$99.00",
//     inStock: false,
//   },
// ];

// const Favorite = () => {
//   return (
//     <div className="flex container mx-auto bg-gray-50">
//       <aside className="w-64 p-6 border-r border-gray-300">
//         <p className="mb-4 text-sm text-gray-600">Welcome, Anika. <span className="text-red-500 cursor-pointer">Sign out</span></p>
//         <ul className="space-y-3 text-sm">
//           <li className="font-semibold">My Account homepage</li>
//           <li>Order History</li>
//           <li>Login & Security</li>
//           <li>Shopping Cart</li>
//           <li className="text-pink-500">♡ Wishlist</li>
//           <li>Cards & Address</li>
//           <li>Browsing History</li>
//           <li>Log-out</li>
//         </ul>
//       </aside>

//       <main className="flex-1 p-6">
//         <h2 className="text-lg font-semibold mb-4">All items ({products.length})</h2>
//         <div className="space-y-4">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="flex items-center p-4 bg-white rounded-lg shadow-sm border"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-24 h-24 object-cover rounded-md"
//               />
//               <div className="ml-4 flex-1">
//                 <p className="text-sm font-medium text-gray-700 mb-1">
//                   {product.title}
//                 </p>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-400 line-through">
//                     {product.oldPrice}
//                   </span>
//                   <span className="text-pink-600 font-bold">
//                     {product.newPrice}
//                   </span>
//                 </div>
//                 <p
//                   className={`text-sm mt-1 font-semibold ${
//                     product.inStock ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
//                 </p>
//               </div>
//               <button
//                 className={`flex items-center px-4 py-2 text-sm rounded-md ml-4 ${
//                   product.inStock
//                     ? "bg-violet-500 text-white"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 }`}
//                 disabled={!product.inStock}
//               >
//                 Add to Cart <ShoppingCart className="ml-2 w-4 h-4" />
//               </button>
//               <Heart className="ml-4 text-red-500" fill="red" />
//             </div>
//           ))}
//         </div>
//         <p className="mt-4 text-sm text-right text-gray-500 cursor-pointer">
//           View More
//         </p>
//       </main>
//     </div>
//   );
// }

// export default Favorite;