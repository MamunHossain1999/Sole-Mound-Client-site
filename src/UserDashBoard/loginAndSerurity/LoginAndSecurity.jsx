import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginAndSecurity = () => {
 
  const navigate = useNavigate();
  const name = "Mamun";
  const email = "mamun@gmail.com";
  const phone = "01795920956";
  const password = "************";


  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('/api/user');
      if (response.status === 200) {
        toast.success("Account deleted successfully.");
        navigate('/'); // redirect after deletion
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="container mx-auto pt-8 pb-10 bg-white">
      <h1 className="text-[#1F1F1F] font-semibold mb-6">Login & Security</h1>

      <div className="border border-[#E2E3E8] rounded-lg divide-y divide-gray-300">
        
        {/* Name */}
        <div className="px-12 py-4 h-[106px] flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Name</p>
            <p className="text-[14px] text-[#1F1F1F]">{name}</p>
          </div>
          <Link to='/change-name'>
            <button className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              Edit
            </button>
          </Link>
        </div>

        {/* Email */}
        <div className="px-12 py-4 h-[106px]  flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Email</p>
            <p className="text-[14px] text-[#1F1F1F]">{email}</p>
          </div>
          <Link to='/change-email'>
            <button onClick={() => setModal('email')} className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              Edit
            </button>
          </Link>
        </div>

        {/* Phone */}
        <div className="px-12 py-4 h-[106px]  flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Primary Mobile Number</p>
            <p className="text-[14px] text-[#1F1F1F]">{phone}</p>
          </div>
          <Link to='/phone-number'>
            <button onClick={() => setModal('phone')} className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
              Add
            </button>
          </Link>
        </div>

        {/* Password */}
        <div className="px-12 py-4 h-[106px]  flex justify-between items-center">
          <div>
            <p className="text-[16px] font-medium text-[#1F1F1F]">Password</p>
            <p className="text-[14px] text-[#1F1F1F]">{password}</p>
          </div>
          <Link to='/password'>
            <button
              onClick={() => setModal('password')}
              className="text-[16px] border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]"
            >
              Edit
            </button>
          </Link>
        </div>

        {/* Delete Account */}
        <div className="px-12 py-4 h-[106px]  flex justify-between items-center">
          <div>
            <p className="text-base font-semibold text-[#1F1F1F]">Delete Account</p>
          </div>
          <button onClick={handleDeleteAccount} className="text-base border border-[#B6B7BC] rounded-lg px-6 py-3 text-[#1F1F1F]">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSecurity;
