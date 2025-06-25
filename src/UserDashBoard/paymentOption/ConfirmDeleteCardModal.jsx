import React from "react";
import man from '../../assets/cartAdreesIng/deletePage.svg'

const ConfirmDeleteCardModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md text-center max-w-md w-full mx-4 sm:mx-auto">
        <img
          src={man}
          alt="Delete Illustration"
          className="mx-auto mb-4 w-40"
        />
        <p className="text-lg md:text-2xl font-medium text-[#1F1F1F] mb-6">
          Are you sure to remove this card?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border text-[#1F1F1F] font-semibold border-[#B6B7BC] text-base cursor-pointer rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 border text-[#1F1F1F] font-semibold border-[#B6B7BC] bg-[#C8A8E9] cursor-pointer hover:bg-purple-300 text-base rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};


export default ConfirmDeleteCardModal;
