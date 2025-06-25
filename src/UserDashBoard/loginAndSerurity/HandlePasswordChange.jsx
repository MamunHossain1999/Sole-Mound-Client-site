import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const HandlePasswordChange = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password must match.");
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You're not logged in.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/change-password`,
        {
          oldPassword,
          newPassword,
          conformPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 203) {
        toast.success("Password updated successfully!");
        navigate(-1);
      } else {
        toast.error("Failed to update password. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-auto p-4 md:my-18">
      <div className="w-full max-w-[690px] bg-white rounded-[15px] border border-[#B6B7BC] py-10 px-4 sm:px-8 md:py-16 md:px-20">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-[#262736]">Password</h1>
          <p className="text-[#919191] text-base font-normal mt-1">
            Change or view your password
          </p>
        </div>

        {/* Old Password */}
        <div className="mb-6">
          <label className="block mb-2 text-[#505050] font-semibold text-base">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <EyeOff className="h-6 w-6 text-[#505050]" />
              ) : (
                <Eye className="h-6 w-6 text-[#505050]" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block mb-2 text-[#505050] font-semibold text-base">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-6 w-6 text-[#505050]" />
              ) : (
                <Eye className="h-6 w-6 text-[#505050]" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block mb-2 text-[#505050] font-semibold text-base">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-6 w-6 text-[#505050]" />
              ) : (
                <Eye className="h-6 w-6 text-[#505050]" />
              )}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            className="bg-white w-full sm:w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#B6B7BC] hover:border-purple-400 rounded-lg cursor-pointer"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-[#C8A8E9] w-full sm:w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#C8A8E9] hover:border-white rounded-lg cursor-pointer"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandlePasswordChange;
