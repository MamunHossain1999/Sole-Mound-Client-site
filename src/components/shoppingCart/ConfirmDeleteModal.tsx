
import { IoClose } from "react-icons/io5";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-5 relative">
        {/* Close icon */}
        <div className="flex items-center justify-between mb-4">
          {/* Title */}
          <h2 className="text-sm md:text-[20px] font-bold text-[#505050]">
            Remove product
          </h2>

          {/* Close Button */}
          <button
            onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#FDF1F7] hover:bg-gray-200 transition"
          >
            <IoClose className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <p className="text-sm md:text-base font-normal text-[#505050] mb-6">
          Remove item from cart?
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-2 rounded-lg bg-[#C8A8E9] text-[#000000] font-medium hover:bg-purple-300 transition"
          >
            Remove
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 rounded-lg border border-gray-300 text-[#000000] hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
