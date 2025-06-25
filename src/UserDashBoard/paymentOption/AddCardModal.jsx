import React from "react";

const AddCardModal = ({ show, onClose, cardData, onChange, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-40 z-40"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative z-50 bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 cursor-pointer text-xl font-bold hover:text-red-500"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#505050] mb-4">Add New Card</h2>

        <hr className="border-[#E2E3E8]" />

        <form onSubmit={onSubmit} className="space-y-6 px-0 sm:px-20 mt-8">
          <div>
            <label className="block mb-1 text-base text-[#474B57] font-semibold">
              Name on Card
            </label>
            <input
              type="text"
              name="name"
              value={cardData.name}
              onChange={onChange}
              placeholder="Enter Name"
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-base text-[#474B57] font-semibold">
              Card Number
            </label>
            <input
              type="text"
              name="number"
              value={cardData.number}
              onChange={onChange}
              placeholder="Enter Number"
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-base text-[#474B57] font-semibold">
              Expire Date
            </label>
            <input
              type="text"
              name="expiry"
              value={cardData.expiry}
              onChange={onChange}
              placeholder="DD/MM/YY"
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-base text-[#474B57] font-semibold">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              value={cardData.cvc}
              onChange={onChange}
              placeholder="Number"
              className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            />
          </div>

          <div className="text-right mt-4">
            <button
              type="submit"
              className="bg-[#C8A8E9] text-[#1F1F1F] font-semibold text-base px-4 py-2 rounded-md hover:bg-purple-300"
            >
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
