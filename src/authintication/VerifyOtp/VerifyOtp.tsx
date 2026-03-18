/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/Redux/api/authApi";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL থেকে email auto নেওয়া
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email") || "";
  const [email] = useState(emailFromQuery);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(20);
  const otpInputs = useRef<Array<HTMLInputElement | null>>([]);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // OTP input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next/prev
    if (value && index < 5) otpInputs.current[index + 1]?.focus();
    if (!value && index > 0) otpInputs.current[index - 1]?.focus();
  };

  // Verify OTP
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) return toast.error("Enter complete 6-digit OTP");

    try {
      const res = await verifyOtp({ email, otp: otpCode }).unwrap();
      toast.success(res.message);
      navigate(`/auth/reset-password?email=${email}&otp=${otpCode}`);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "OTP verification failed",
      );
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!email) return toast.error("Email is required");

    try {
      await resendOtp({ email }).unwrap();
      toast.success("OTP resent to your email");

      setTimeLeft(30); // reset timer
      setOtp(["", "", "", "", "", ""]); // clear inputs
      otpInputs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the 6-digit OTP sent to{" "}
          <span className="font-medium">{email}</span>
        </p>

        {/* OTP Inputs */}
        <form onSubmit={handleVerify} className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                otpInputs.current[index] = el!; // assign
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </form>

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center text-gray-600">
          {timeLeft > 0 ? (
            <p>Resend OTP in: {timeLeft}s</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-blue-500 hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
