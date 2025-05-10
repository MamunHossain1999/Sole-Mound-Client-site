import React, { useState } from 'react';
import { Mail } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const HandleEmailChange= () => {
  const [newEmail, setNewEmail] = useState("");
  const currentEmail = "mamun@gmail.com";
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Simulate an API call (you can replace this with axios.post)
    console.log("Email change requested with:", newEmail);
    toast.success(`OTP sent to ${newEmail}`);


    setTimeout(()=>{
      navigate('/email-varify')
    },1000);
  };

  return (
    <div className="flex justify-center items-center min-h-auto pt-14">
      <div className="w-[690px] bg-white rounded-lg border border-[#B6B7BC] p-8 relative">
        {/* Top dotted line */}
        <div className="absolute top-0 left-0 right-0 border-t border-dashed border-blue-200"></div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-[#262736]">Change your email address</h1>
        </div>

        {/* Current email */}
        <div className="mb-6">
          <p className="text-[#919191] text-base mb-1">Current Email Address</p>
          <p className="text-[#919191] text-base">{currentEmail}</p>
        </div>

        {/* Instructions */}
        <p className="text-[#919191] text-base mb-6">
          Enter the new email address you would like to associate with your account below. 
          We will send a One Time Password (OTP) to that address.
        </p>

        {/* New email input */}
        <div className="mb-6">
          <label htmlFor="newEmail" className="block mb-2 text-[#505050] font-semibold text-base">
            New Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="newEmail"
              className="w-full px-4 py-3 rounded-lg text-[#1F1F1F] border border-[#B6B7BC] bg-white autofill:bg-white "
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-[#C8A8E9] rounded-lg text-[#1F1F1F] font-medium hover:bg-purple-400 transition-colors"
        >
          Continue
        </button>

        {/* Bottom indicator */}
        
      </div>
    </div>
  );
};

export default HandleEmailChange;
