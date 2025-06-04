import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HandlePhoneNumber = ({ onUpdate, initialPhone }) => {
  const [number, setNumber] = useState(initialPhone || ''); 
  const navigate = useNavigate(); 

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    onUpdate(number);
  };

  return (
    <div className="w-[805px] mx-auto h-auto items-center justify-center pt-32">
      <div className="px-6 py-8 border border-[#919191] rounded-lg">
        <h2 className="text-[24px] font-medium text-[#1F1F1F] mb-2">Add your Phone Number</h2>
        <p className="text-sm font-normal text-[#505050] mb-4">
          To update the phone number on your Sole Mound account, enter the new number below and click the Update button to confirm.
        </p>

        {/* Input */}
        <div className="mb-5 rounded-lg">
          <label htmlFor="phone" className="block text-[#1F1F1F] text-base font-semibold mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            className="w-full py-2 px-2 text-[#1F1F1F] border border-[#B6B7BC] rounded-md bg-white autofill:bg-white"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="bg-white w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#B6B7BC] hover:border-gray-400 hover:border-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#C8A8E9] w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#C8A8E9] hover:border-white rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandlePhoneNumber;
