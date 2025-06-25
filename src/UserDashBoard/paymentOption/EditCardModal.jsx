import React from "react";
import { RxCross2 } from "react-icons/rx";

const EditCardModal = ({ show, cardData, onClose, onChange, onSubmit }) => {
  if (!show || !cardData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-40 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl z-50 relative shadow-lg mx-4 sm:mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-[#E2E3E8] pb-4">
          <h2 className="font-bold text-2xl text-[#505050]">Edit Card</h2>
          <button
            onClick={onClose}
            className="text-[#505050] text-xl hover:text-red-500 cursor-pointer"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 mt-8 px-4 sm:px-20">
          <div>
            <label className="block text-base font-semibold text-[#474B57] mb-1">
              Name on Card
            </label>
            <input
              type="text"
              name="name"
              value={cardData.name || ""}
              onChange={onChange}
               className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-[#474B57] mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="number"
              value={cardData.number || ""}
              onChange={onChange}
               className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              placeholder="Enter Number"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-base font-semibold text-[#474B57] mb-1">
                Expire Date
              </label>
              <input
                type="text"
                name="expiry"
                value={cardData.expiry || ""}
                onChange={onChange}
                 className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                placeholder="DD/MM/YY"
              />
            </div>

            <div className="flex-1">
              <label className="block text-base font-semibold text-[#474B57] mb-1">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                value={cardData.cvc || ""}
                onChange={onChange}
                 className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                placeholder="Number"
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-[#474B57] mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={cardData.address || ""}
              onChange={onChange}
               className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              placeholder="Your Address"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-5 py-3 bg-[#C5A8F9] text-[#1F1F1F] font-semibold cursor-pointer rounded-md hover:bg-[#b592f7]"
            >
              Save the changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCardModal;
