import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const EmailVerificationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newEmail = location.state?.newEmail || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtpAndChangeEmail = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/profile/change-email`,
        { email: newEmail, otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Email changed successfully!");
        navigate("/"); 
      } else {
        toast.error(res.data.message || "Failed to change email.");
      }
    } catch (error) {
      console.error("Email change error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mb-6 sm:px-6 pt-10 sm:pt-16 min-h-auto">
      <div className="w-full max-w-[690px] bg-white rounded-[15px] border border-[#B6B7BC] py-10 px-4 sm:px-8 md:py-16 md:px-20">
        <h1 className="text-2xl font-medium text-[#262736] mb-6">
          Verify OTP to change email
        </h1>

        <p className="mb-4 text-[#919191] text-sm sm:text-base">
          We sent a 4-digit OTP to your current email. Please enter it below to confirm changing your email to{" "}
          <strong>{newEmail}</strong>.
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md mb-6 text-center text-xl tracking-widest focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
          placeholder="Enter OTP"
          disabled={loading}
        />

        <button
          onClick={verifyOtpAndChangeEmail}
          className={`w-full py-3 px-4 rounded-lg text-[#1F1F1F] font-medium transition-colors ${
            loading
              ? "bg-purple-200 cursor-not-allowed"
              : "bg-[#C8A8E9] hover:bg-purple-300"
          }`}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationForm;
