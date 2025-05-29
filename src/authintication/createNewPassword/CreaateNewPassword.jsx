import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNewPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
        {
          password: oldPassword,
          newPassword: newPassword,
          conformPassword: confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate("/auth/login-page");
        }, 1500);
      } else {
        toast.error(res.data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen py-10">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p>Change Password</p>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-4">
        {/* Old Password */}
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password*"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
          />
          <div
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
          >
            {showOldPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password*"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
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
          />
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset your password"}
        </button>
      </div>
    </div>
  );
};

export default CreateNewPassword;
