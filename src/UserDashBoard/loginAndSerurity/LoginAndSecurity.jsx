import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/UseAuth';

const LoginAndSecurity = () => {
  const { user, loader } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      // const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/profile`);
      if (response.status === 200) {
        toast.success("Account deleted successfully.");
        navigate('/auth/login-page');
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  if (loader) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-7 pb-10 bg-white">
      <h1 className="text-[#1F1F1F] font-semibold text-xl sm:text-2xl mb-6">Login & Security</h1>

      <div className="border border-[#E2E3E8] rounded-lg divide-y divide-gray-300">

        {/* Name */}
        <div className="px-4 sm:px-6 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[106px] gap-2">
          <div>
            <p className="text-base font-medium text-[#1F1F1F]">Name</p>
            <p className="text-sm text-[#1F1F1F]">{user?.name || 'Not available'}</p>
          </div>
          <Link to='/handle-change-name'>
            <button className="text-base border border-[#B6B7BC] rounded-lg px-6 py-2 sm:py-3 text-[#1F1F1F] cursor-pointer">
              Edit
            </button>
          </Link>
        </div>

        {/* Email */}
        <div className="px-4 sm:px-6 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[106px] gap-2">
          <div>
            <p className="text-base font-medium text-[#1F1F1F]">Email</p>
            <p className="text-sm text-[#1F1F1F]">{user?.email || 'Not available'}</p>
          </div>
          <Link to='/handle-email-change'>
            <button className="text-base border border-[#B6B7BC] rounded-lg px-6 py-2 sm:py-3 text-[#1F1F1F] cursor-pointer">
              Edit
            </button>
          </Link>
        </div>

        {/* Phone */}
        <div className="px-4 sm:px-6 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[106px] gap-2">
          <div>
            <p className="text-base font-medium text-[#1F1F1F]">Primary Mobile Number</p>
            <p className="text-sm text-[#1F1F1F]">{user?.phoneNumber || 'Not added'}</p>
          </div>
          <Link to='/handle-phone-number'>
            <button className="text-base border border-[#B6B7BC] rounded-lg px-6 py-2 sm:py-3 text-[#1F1F1F] cursor-pointer">
              {user?.phoneNumber ? 'Edit' : 'Add'}
            </button>
          </Link>
        </div>

        {/* Password */}
        <div className="px-4 sm:px-6 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[106px] gap-2">
          <div>
            <p className="text-base font-medium text-[#1F1F1F]">Password</p>
            <p className="text-sm text-[#1F1F1F]">{'************'}</p>
          </div>
          <Link to='/handle-password-change'>
            <button className="text-base border border-[#B6B7BC] rounded-lg px-6 py-2 sm:py-3 text-[#1F1F1F] cursor-pointer">
              Edit
            </button>
          </Link>
        </div>

        {/* Delete Account */}
        <div className="px-4 sm:px-6 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-[106px] gap-2">
          <p className="text-base font-semibold text-[#1F1F1F]">Delete Account</p>
          <button
            onClick={handleDeleteAccount}
            className="text-base border border-[#B6B7BC] rounded-lg px-6 py-2 sm:py-3 text-[#1F1F1F] cursor-pointer"
          >
            Yes
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginAndSecurity;
