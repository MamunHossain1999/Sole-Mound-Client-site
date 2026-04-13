// import React from 'react';

// const Nk = () => {
//     return (
//         <div>
//             {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h3 className="text-lg font-semibold text-[#474B57] mb-4">
//               Reset Your Password
//             </h3>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#878A92] text-sm mb-4"
//             />
//             <div className="flex justify-between">
//               <button
//                 className="py-2 px-4 bg-[#C8A8E9] rounded-md text-white"
//                 onClick={handleForgotPassword}
//               >
//                 Send Reset Link
//               </button>
//               <button
//                 className="py-2 px-4 bg-gray-400 rounded-md text-white"
//                 onClick={() => setIsModalOpen(false)} // Close modal
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//         </div>
//     );
// };

// export default Nk;