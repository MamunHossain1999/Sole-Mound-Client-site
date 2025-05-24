import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";

const ResetPassword = () => {
  const {ForgotPassword} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const handleSubmit = async () => {
  if (!email.trim()) {
    toast.error("Please enter your email.");
    return;
  }

  try {
    // Call the forgotPassword function with email
    const res = await ForgotPassword(email);

    if (res.success) {
      toast.success("OTP has been sent to your email.");
      // Navigate to OTP input page with email as state
      navigate("/auth/reset-password-success", { state: { email } });
    } else {
      toast.error(res.message || "Failed to send OTP. Try again.");
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to send OTP. Try again."
    );
  }
};


  return (
    <div className="bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Reset your password</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-[579px] px-6 py-8 mx-4 sm:mx-0">
          <p className="text-[#505050] text-base font-semibold mb-4">
            Enter the email address associated with your Sole Mound account.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] mb-4 focus:outline-none focus:ring-1 focus:ring-purple-300"
            autoComplete="on"
            required
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-[#C8A8E9] text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-300"
          >
            Continue
          </button>

          <div className="text-center mt-4">
            <span
              className="text-[#3CA6FC] hover:text-blue-400 cursor-pointer"
              onClick={() => navigate("/auth/login-page")}
            >
              Return to Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
