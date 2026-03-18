import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "@/Redux/api/authApi";

const CreateNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL থেকে email & otp নেওয়া
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const otp = queryParams.get("otp") || "";

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Email or OTP not found. Please try again.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword,
        confirmPassword,
      }).unwrap();
      console.log("Reset response:", res);

      // শুধু message দেখাও, navigate সরাসরি করো
      toast.success(res.message || "Password reset successfully!");
      navigate("/auth/login-page");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen py-10">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p>Change Password</p>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-4">
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password*"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
              disabled={isLoading}
            />
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
              disabled={isLoading}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset your password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
