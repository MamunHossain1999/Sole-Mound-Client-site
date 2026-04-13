// import React, { useState } from "react";
// import { Mail } from "lucide-react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";


// const HandleEmailChange = () => {
//   const { data: user, isLoading: profileLoading } = useGetProfileQuery();
//   const [newEmail, setNewEmail] = useState("");
//   const navigate = useNavigate();

//   const [sendOtp, { isLoading }] = useSendOtpMutation();

//   if (profileLoading) return <div>Loading...</div>;

//   const currentEmail = user?.email || "Not available";

//   const handleSendOtp = async () => {
//     if (!newEmail || !newEmail.includes("@")) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     const token = Cookies.get("token");
//     if (!token) {
//       toast.error("User not authenticated.");
//       return;
//     }

//     try {
//       const res = await sendOtp({ newEmail, token }).unwrap();

//       if (res.success) {
//         toast.success("OTP sent to your current email.");
//         navigate("/email-verify", { state: { newEmail } });
//       } else {
//         toast.error(res.message || "Failed to send OTP.");
//       }
//     } catch (err) {
//       console.error("Send OTP error:", err);
//       toast.error(
//         err?.data?.message || "Something went wrong. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center pt-6 md:pt-16 px-4 mb-6">
//       <div className="w-[690px] bg-white rounded-[15px] border border-[#B6B7BC] p-8 relative">
//         <div className="mb-6">
//           <h1 className="text-2xl font-medium text-[#262736]">
//             Change your email address
//           </h1>
//         </div>

//         <div className="mb-6">
//           <p className="text-[#919191] text-base mb-1">Current Email Address</p>
//           <p className="text-[#919191] text-base">{currentEmail}</p>
//         </div>

//         <p className="text-[#919191] text-base mb-6">
//           Enter the new email address you would like to associate with your
//           account below. We will send a One Time Password (OTP) to your current
//           email to verify.
//         </p>

//         <div className="mb-6">
//           <label
//             htmlFor="newEmail"
//             className="block mb-2 text-[#505050] font-semibold text-base"
//           >
//             New Email Address
//           </label>
//           <div className="relative">
//             <input
//               type="email"
//               id="newEmail"
//               className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
//               placeholder="Email"
//               value={newEmail}
//               onChange={(e) => setNewEmail(e.target.value)}
//               disabled={isLoading}
//             />
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={handleSendOtp}
//           className={`w-full py-3 px-4 rounded-lg text-[#1F1F1F] font-medium transition-colors ${
//             isLoading
//               ? "bg-purple-200 cursor-not-allowed"
//               : "bg-[#C8A8E9] hover:bg-purple-300"
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Continue"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HandleEmailChange;