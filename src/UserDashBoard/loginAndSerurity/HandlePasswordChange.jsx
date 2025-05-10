import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const HandlePasswordChange = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/change-password', {
        oldPassword,
        newPassword
      });

      if (response.status === 200) {
        toast.success('Password updated successfully!');
        navigate(-1); // Go back after success
      } else {
        toast.error('Failed to update password. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-auto p-4 pt-18">
      <div className="w-[690px] mx-auto bg-white rounded-lg border border-[#B6B7BC] p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-[#262736]">Password</h1>
          <p className="text-[#919191] text-base font-normal mt-1">Change or view your password</p>
        </div>

        <div>
          <div className="mb-6">
            <label htmlFor="oldPassword" className="block mb-2 text-[#505050] font-semibold text-base">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                className="w-full px-4 py-3 rounded-lg text-[#B6B7BC] border border-[#B6B7BC] "
                placeholder="Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleOldPasswordVisibility}
              >
                {showOldPassword ? (
                  <EyeOff className="h-5 w-5 text-[#505050]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#505050]" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="newPassword" className="block mb-2 text-[#505050] font-semibold text-base">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="w-full px-4 py-3 rounded-lg text-[#B6B7BC] border border-[#B6B7BC] "
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-[#505050]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#505050]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between gap-15">
            <button
              className="bg-white w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#B6B7BC] hover:border-gray-400 hover:border-2 rounded cursor-pointer"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="bg-[#C8A8E9] w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#C8A8E9] hover:border-white rounded cursor-pointer"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandlePasswordChange;
