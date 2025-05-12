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
    <div className="bg-gradient-to-b from-[#FAE6F0]  to-b-[#FDF6FA] ">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Create new password </p>
      </div>
      <div className="w-full max-w-lg mx-auto">
        <div className="space-y-4">
          <div>
            <div className="relative flex items-center justify-center">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md  text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300"
                required
              />
              <div
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-6 h-6" />
                ) : (
                  <Eye className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050]  focus:outline-none focus:ring-1 focus:ring-purple-300"
                required
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-6 h-6" />
                ) : (
                  <Eye className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-200 cursor-pointer"
            >
              Reset your password
            </button>
          </div>
        </div>

        <div className="mt-6 font-medium text-base text-[#1F1F1F]">
          <h3 className="font-semibold mb-2">Secure password tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Use at least 8 characters, a combination of numbers and letters
            </li>
            <li>Do not use the same password you have used with us</li>
            <li>
              Do not use dictionary words, your name, e-mail address, mobile
              phone number or other personal information that can be easily
              obtained
            </li>
            <li>Do not use the same password for multiple online accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreaateNewPassword;
