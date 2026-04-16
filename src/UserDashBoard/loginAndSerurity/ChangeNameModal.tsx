import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useUpdateProfileMutation } from "@/Redux/api/userApi";

interface ApiError {
  data?: {
    message?: string;
  };
}

const ChangeNameModal = () => {
  const [name, setName] = useState<string>("");

  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  const navigate = useNavigate();

  // ============================
  // CANCEL
  // ============================
  const handleCancel = (): void => {
    navigate(-1);
  };

  // ============================
  // UPDATE
  // ============================
  const handleUpdate = async (): Promise<void> => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
     const res = await updateProfile({ name }).unwrap();

      toast.success(res?.message || "Name updated successfully!");

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error: unknown) {
      const err = error as ApiError;

      console.error(err);
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="w-full max-w-[805px] mx-auto flex items-center mb-6 justify-center pt-6 md:pt-20 px-4 sm:px-6">
      <div className="w-full px-6 py-8 border border-[#919191] rounded-[15px] bg-white">
        <h2 className="text-[24px] font-medium mb-2">
          Change your name
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-3 py-3 border rounded-md mb-4"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <div className="flex gap-4">
          <button onClick={handleCancel} disabled={isLoading}>
            Cancel
          </button>

          <button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ChangeNameModal;