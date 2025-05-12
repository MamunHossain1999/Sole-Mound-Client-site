import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const EnterVarificationCode = () => {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Reset link sent to your email.");
    navigate("/sign-up/reset-password-success");
  };

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  // Helper to mask email for display
  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (!user || !domain) return "";
    const masked = user[0] + "*".repeat(user.length - 1);
    return `${masked}@${domain}`;
  };

  return (
    <div className="bg-gradient-to-b from-[#FAE6F0]  to-b-[#FDF6FA]">
      <div className="text-[32px] font-medium text-[#1F1F1F] text-center mb-6 border-b border-[#919191] py-6">
        <p className="pt-7">Reset your password</p>
      </div>

      <div className="flex flex-col items-center justify-start pt-8">
        <div className="w-full max-w-md px-4">
          {/* Success Message Box */}
          <div className="rounded-md flex items-start">
            <div>
              <p className="text-gray-700 text-sm">
                For your security, we've sent the code to your email{" "}
              </p>
            </div>
          </div>

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#1F1F1F] mb-4 focus:outline-none focus:ring-1 focus:ring-purple-300"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-[#C8A8E9] text-center text-[#1F1F1F] font-semibold text-base py-3 rounded-md transition duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterVarificationCode;
