import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const CreaateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill out both password fields");
      return;
    }
  
    if (newPassword.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        return;
      }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
  
    setPasswordError("");
    console.log("Password reset submitted");
    // Add actual password reset logic here
  };
  

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Enter verification code</p>
      </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password*
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                required
              />
              <div
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password*
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                required
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>
          </div>

          {passwordError && (
            <div className="text-red-500 text-sm mb-4">{passwordError}</div>
          )}

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Reset your password
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Secure password tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Use at least 8 characters, a combination of numbers and letters</li>
            <li>Do not use the same password you have used with us</li>
            <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained</li>
            <li>Do not use the same password for multiple online accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreaateNewPassword;
