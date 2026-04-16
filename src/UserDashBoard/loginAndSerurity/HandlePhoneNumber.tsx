import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "@/Redux/api/userApi";

const HandlePhoneNumber = () => {
  const [phone, setPhone] = useState<string>("");
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // ================= CANCEL =================
  const handleCancel = (): void => {
    navigate(-1);
  };

// ================= UPDATE =================
const handleUpdate = async (): Promise<void> => {
  if (!phone.trim()) {
    toast.error("Please enter a valid phone number.");
    return;
  }

  try {
    const res = await updateProfile({
     phone, // ✅ correct field
    }).unwrap();

    toast.success(res?.message || "Phone updated successfully!");

    navigate(-1);
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update phone number");
  }
};

  return (
    <div className="w-full max-w-[805px] mx-auto flex items-center justify-center mb-6 pt-6 md:pt-20 px-4 sm:px-6">
      <div className="w-full px-6 py-8 border border-[#919191] rounded-lg bg-white">
        <h2 className="text-[24px] font-medium text-[#1F1F1F] mb-2">
          Add your Phone Number
        </h2>

        <p className="text-sm text-[#505050] mb-4">
          Enter your new phone number and click update to save.
        </p>

        {/* INPUT */}
        <div className="mb-5">
          <label className="block text-[#1F1F1F] text-base font-semibold mb-1">
            Phone
          </label>

          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            className="bg-white w-full sm:w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#B6B7BC] hover:border-purple-400 rounded-lg cursor-pointer"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            className="bg-[#C8A8E9] w-full sm:w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#C8A8E9] hover:border-white rounded-lg cursor-pointer"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {" "}
            {isLoading ? "Updating..." : "Update"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandlePhoneNumber;
