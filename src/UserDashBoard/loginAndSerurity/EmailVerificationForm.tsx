import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "@/Redux/api/authApi";

// ================= TYPES =================
interface ApiError {
  data?: {
    message?: string;
  };
  error?: string;
}

const EmailVerificationForm = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const newEmail: string = location.state?.newEmail || "";

  const [otp, setOtp] = useState<string>("");

  // ================= VERIFY =================
  const verifyOtpAndChangeEmail = async (): Promise<void> => {
    if (!otp.trim() || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    if (!newEmail) {
      toast.error("Email missing. Please try again.");
      return;
    }

    try {
      // ✅ RTK Query use (axios remove)
      const res = await verifyOtp({
        email: newEmail,
        otp,
      }).unwrap();

      toast.success(res?.message || "Email changed successfully!");

      navigate("/");
    } catch (error: unknown) {
      const err = error as ApiError;

      console.error("Email change error:", err);

      toast.error(
        err?.data?.message ||
          err?.error ||
          "Something went wrong. Please try again."
      );
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
          maxLength={4}
          value={otp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtp(e.target.value)
          }
          className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md mb-6 text-center text-xl tracking-widest focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
          placeholder="Enter OTP"
          disabled={isLoading}
        />

        <button
          onClick={verifyOtpAndChangeEmail}
          className={`w-full py-3 px-4 cursor-pointer rounded-lg text-[#1F1F1F] font-medium transition-colors ${
            isLoading
              ? "bg-purple-200 cursor-not-allowed"
              : "bg-[#C8A8E9] hover:bg-purple-300"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationForm;