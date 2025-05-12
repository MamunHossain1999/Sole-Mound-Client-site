import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [code, setCode] = useState("");
  const [resendTimer, setResendTimer] = useState(35);
  const maskedEmail = "a******@gmail.com";
  const navigate = useNavigate()

  // ata holo timing er jnno
  useEffect(() => {
    const timer =
      resendTimer > 0 &&
      setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Code:", code);
    navigate('/sign-up/reset-password')
    // verify code API call here
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      console.log("Resending code...");
      setResendTimer(35);
      // resend code logic here
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FAE6F0]  to-b-[#FDF6FA] ">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Enter verification code</p>
      </div>
      <div className=" w-[570px] mx-auto">
       

        <p className="text-gray-600 mb-4 ">
          For your security, we've sent the code to your email{" "}
          <span className="font-medium">{maskedEmail}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 w-[480px] ">
          <input
            type="text"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] mb-4 focus:outline-none focus:ring-1 focus:ring-purple-300"
            required
          />

          <p className="text-sm text-[#919191] font-medium">
            Didn't get the code yet?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className={`ml-1 ${
                resendTimer === 0 ? "text-[#A8537B]" : "text-rose-500"
              }`}
            >
              Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-[#C8A8E9] hover:bg-purple-300 text-[#1F1F1F] font-semibold py-3 rounded-md transition duration-200 cursor-pointer"
          >
            Submit code
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
