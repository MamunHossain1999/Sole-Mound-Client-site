import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UseAuth from '../../hooks/UseAuth';

// export const getUserProfile = async () => {
//   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`);
//   return response.data;
// };

const LoginAndSecurity = () => {
  const {user, loader} = UseAuth()
  console.log(user)
  const navigate = useNavigate();

  // const { data: users, isLoading, isError } = useQuery({
  //   queryKey: ['userProfile'],
  //   queryFn: getUserProfile,
  // });
  // Delete account handler
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/profile`);
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
    <div className="container mx-auto pt-8 pb-10 bg-white">
      <h1 className="text-[#1F1F1F] font-semibold mb-6">Login & Security</h1>

      <div className="border border-[#E2E3E8] rounded-lg divide-y divide-gray-300">

        {/* Name */}
        <div className="px-12 py-4 h-[106px] flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Name</p>
            <p className="text-[14px] text-[#1F1F1F]">{user?.name || 'Not available'}</p>
          </div>
          <Link to='/change-name'>
            <button className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              Edit
            </button>
          </Link>
        </div>

        {/* Email */}
        <div className="px-12 py-4 h-[106px] flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Email</p>
            <p className="text-[14px] text-[#1F1F1F]">{user?.email || 'Not available'}</p>
          </div>
          <Link to='/change-email'>
            <button className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              Edit
            </button>
          </Link>
        </div>

        {/* Phone */}
        <div className="px-12 py-4 h-[106px] flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Primary Mobile Number</p>
            {/* Assuming user.phone or user.mobileNumber */}
            <p className="text-[14px] text-[#1F1F1F]">{user?.phone || 'Not added'}</p>
          </div>
          <Link to='/phone-number'>
            <button className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              {user.phone ? 'Edit' : 'Add'}
            </button>
          </Link>
        </div>

        {/* Password */}
        <div className="px-12 py-4 h-[106px] flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Password</p>
            <p className="text-[14px] text-[#1F1F1F]">{'************'}</p>
          </div>
          <Link to='/password'>
            <button className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              Edit
            </button>
          </Link>
        </div>

        {/* Delete Account */}
        <div className="px-12 py-4 h-[106px] flex justify-between items-center">
          <div>
            <p className="text-base font-semibold text-[#1F1F1F]">Delete Account</p>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="text-base border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]"
          >
            Yes
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginAndSecurity;
