import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out both password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // ✅ Axios POST request
      const res = await axios.post("/api/reset-password", {
        password: newPassword,
      });

      if (res.status === 200) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen py-10">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p>Create new password</p>
      </div>

      <div className="w-full max-w-lg mx-auto">
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password*"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
              required
            />
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
              required
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-200"
            >
              Reset your password
            </button>
          </div>
        </div>

        <div className="mt-6 font-normal text-base text-[#1F1F1F]">
          <h3 className="font-semibold mb-2">Secure password tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Use at least 8 characters, a combination of numbers and letters
            </li>
            <li>Do not use the same password you have used with us</li>
            <li>
              Avoid dictionary words, your name, email, or other personal info
            </li>
            <li>Use different passwords for different accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
