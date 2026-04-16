import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useGetProfileQuery } from "@/Redux/api/userApi";
import { useResendOtpMutation } from "@/Redux/api/authApi";

interface ApiError {
  data?: {
    message?: string;
  };
  error?: string;
}

const HandleEmailChange = () => {
  // ============================
  // STATE
  // ============================
  const [newEmail, setNewEmail] = useState<string>("");

  // ============================
  // API
  // ============================
  const { data: user, isLoading: profileLoading } =
    useGetProfileQuery();

  const [sendOtp, { isLoading }] = useResendOtpMutation();

  const navigate = useNavigate();

  // ============================
  // LOADING
  // ============================
  if (profileLoading) return <div>Loading...</div>;

  const currentEmail: string = user?.email ?? "Not available";

  // ============================
  // HANDLE OTP
  // ============================
  const handleSendOtp = async (): Promise<void> => {
    // ✅ validation
    if (!newEmail.trim()) {
      toast.error("Email required");
      return;
    }

    if (!newEmail.includes("@")) {
      toast.error("Invalid email");
      return;
    }

    try {
      // ✅ correct API call
      const res = await sendOtp({
        email: newEmail,
      }).unwrap();

      console.log("OTP RESPONSE:", res);

      toast.success(res?.message || "OTP sent successfully");

      navigate("/email-verify", {
        state: { newEmail },
      });
    } catch (error: unknown) {
      const err = error as ApiError;

      console.error("Send OTP error:", err);

      toast.error(
        err?.data?.message ||
          err?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="flex justify-center items-center pt-6 md:pt-16 px-4 mb-6">
      <div className="w-[690px] bg-white rounded-[15px] border border-[#B6B7BC] p-8 relative">

        <div className="mb-6">
          <h1 className="text-2xl font-medium text-[#262736]">
            Change your email address
          </h1>
        </div>

        <div className="mb-6">
          <p className="text-[#919191] text-base mb-1">
            Current Email Address
          </p>
          <p className="text-[#919191] text-base">
            {currentEmail}
          </p>
        </div>

        <p className="text-[#919191] text-base mb-6">
          Enter the new email address you would like to associate with your
          account below. We will send a One Time Password (OTP) to your current
          email to verify.
        </p>

        <div className="mb-6">
          <label className="block mb-2 text-[#505050] font-semibold text-base">
            New Email Address
          </label>

          <div className="relative">
            <input
              type="email"
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={isLoading}
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          onClick={handleSendOtp}
          disabled={isLoading}
          className={`w-full py-3 cursor-pointer rounded-lg ${
            isLoading
              ? "bg-gray-300"
              : "bg-[#E3AADD] hover:bg-purple-300"
          }`}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default HandleEmailChange;