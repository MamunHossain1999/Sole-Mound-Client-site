// import React from "react";

// const PriceRangeFilter = ({ filters, setFilters }) => {
//   const min = filters.priceRange.min;
//   const max = filters.priceRange.max;

//   const handleMinChange = (e) => {
//     const newMin = Math.min(Number(e.target.value), max - 10);
//     setFilters((prev) => ({
//       ...prev,
//       priceRange: { label: "Custom", min: newMin, max },
//     }));
//   };

//   const handleMaxChange = (e) => {
//     const newMax = Math.max(Number(e.target.value), min + 10);
//     setFilters((prev) => ({
//       ...prev,
//       priceRange: { label: "Custom", min, max: newMax },
//     }));
//   };

//   return (
//     <div className="w-full p-4 bg-white rounded-md shadow-sm">
//       <h3 className="text-sm font-semibold text-black mb-4">Custom Price Range</h3>

//       <div className="relative w-full h-6 flex items-center mb-4">
//         <input
//           type="range"
//           min={0}
//           max={1000}
//           value={min}
//           onChange={handleMinChange}
//           className="absolute w-full h-1 appearance-none bg-gray-200 rounded accent-purple-400 z-10"
//         />
//         <input
//           type="range"
//           min={0}
//           max={1000}
//           value={max}
//           onChange={handleMaxChange}
//           className="absolute w-full h-1 appearance-none bg-transparent accent-purple-400 z-10"
//         />
//       </div>

//       <div className="flex gap-4">
//         <button
//           type="button"
//           className="w-full border border-[#919191] text-sm text-[#77878F] rounded-[4px] font-semibold px-4 py-2 bg-white"
//         >
//           $ {min}
//         </button>
//         <button
//           type="button"
//           className="w-full border border-[#919191] text-sm text-[#77878F] rounded-[4px] font-semibold px-4 py-2 bg-white"
//         >
//           $ {max}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PriceRangeFilter;
