import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const EmailVerificationForm = () => {
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();
  const email = "mamun@gmail.com";

  const handleSubmit = () => {
    if (!otpCode || otpCode.length < 4) {
      toast.error("Please enter a valid OTP code.");
      return;
    }

    console.log("OTP verification submitted with code:", otpCode);
    toast.success("OTP verified successfully!");

    // Navigate after short delay to allow toast to show
    setTimeout(() => {
      navigate("/dashboard/accountPage");
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-auto pt-16">
      <div className="w-[690px] bg-white rounded-lg border border-[#B6B7BC] p-8">
        <div className="mb-4">
          <h1 className="text-2xl font-medium text-[#262736]">Verify your email</h1>
        </div>

        <div className="mb-6">
          <p className="text-[#919191] text-base">{email}</p>
        </div>

        <div className="mb-6">
          <p className="text-[#1F1F1F] text-base">
            We have sent a One Time Password (OTP) to your email address.
            Please enter it below.
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="otpInput" className="block mb-2 text-[#505050] text-base font-semibold">
            Enter OTP
          </label>
          <input
            type="text"
            id="otpInput"
            className="w-full px-4 py-3 rounded-lg text-[#1F1F1F] border border-[#B6B7BC] bg-white autofill:bg-white"
            placeholder="Code"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-[#C8A8E9] rounded-lg text-[#1F1F1F] font-semibold text-base hover:bg-purple-400 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationForm;
