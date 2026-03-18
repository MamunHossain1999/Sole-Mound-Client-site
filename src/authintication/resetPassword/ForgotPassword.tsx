import { useForgotPasswordMutation } from "@/Redux/api/authApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Reset link sent! Check your email.");
          // Navigate to OTP page and pass email via state
      navigate(`/auth/verify-otp?email=${email}`);
      setEmail(""); // clear input
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Forgot your password</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-[579px] px-6 py-8 mx-4 sm:mx-0">
          <p className="text-[#505050] text-base font-semibold mb-4">
            Enter the email address associated with your Sole Mound account.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] mb-4 focus:outline-none focus:ring-1 focus:ring-purple-300"
              autoComplete="on"
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C8A8E9] text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>

          <div className="text-center mt-4">
            <span
              className="text-[#3CA6FC] hover:text-blue-400 cursor-pointer"
              onClick={() => navigate("login-page")}
            >
              Return to Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;