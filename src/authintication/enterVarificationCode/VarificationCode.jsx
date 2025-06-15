import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerificationCode = () => {
  const [code, setCode] = useState("");
  const [resendTimer, setResendTimer] = useState(35);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // Masked email for display
  const maskedEmail = email
    ? email.replace(/^(.{1})(.*)(@.*)$/, (_, a, b, c) =>
        a + "*".repeat(b.length) + c
      )
    : "";

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`,
        { otp: code }
      );

      if (res.status === 200) {
        toast.success("OTP verified successfully!");
        navigate("/auth/reset-password", { state: { email } });
      }
    } catch (err) {
      const error = err.response?.data;
      toast.error(error?.error || "Invalid or expired code. Try again.");
    }
  };

  const handleResend = async () => {
    if (resendTimer === 0 && email) {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`, {
          email, 
        });
        toast.success("New OTP has been sent.");
        setResendTimer(35);
      } catch (err) {
        toast.error("Failed to resend OTP.");
      }
    }
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen flex flex-col px-4">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Enter verification code</p>
      </div>

      <div className="w-full max-w-xl mx-auto">
        <p className="text-[#505050] mb-4 text-base font-medium">
          For your security, we've sent the code to your email{" "}
          <span className="font-semibold">{maskedEmail}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
            required
          />

          <p className="text-sm text-[#919191] font-medium">
            Didn't get the code yet?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className={`ml-1 font-semibold ${
                resendTimer === 0 ? "text-[#A8537B]" : "text-rose-500"
              }`}
            >
              Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-200 cursor-pointer"
          >
            Submit code
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
