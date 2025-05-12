import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Reset link sent to your email.");
    navigate("/sign-up/reset-password-success");

    // Simulate password reset
    // toast.success("Reset link sent to your email.");
    // // Optionally: send reset request to server
    // navigate("/login");
  };

  
  return (
    <div className='bg-gradient-to-b from-[#FAE6F0]  to-b-[#FDF6FA] '>
   
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Reset your password</p>
      </div>

      <div className="flex items-center justify-center ">
        <div className="w-[579px] px-6 py-8 mx-4 sm:mx-0"
        >
          <div className=" mb-6"></div>
          <p className="text-[#505050] text-base font-semibold mb-4">
          Enter the email address associated with your sole mound account..
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email "
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] mb-4 focus:outline-none focus:ring-1 focus:ring-purple-300"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-[#C8A8E9] text-center text-[#1F1F1F] font-semibold text-base py-3 rounded-md transition duration-300"
          >
            Continue
          </button>

          <div className="text-center mt-4">
            <span
              className="text-[#3CA6FC] hover:text-blue-400 text-base cursor-pointer"
              onClick={() => navigate("/sign-up/login-page")}
            >
              Return to Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
