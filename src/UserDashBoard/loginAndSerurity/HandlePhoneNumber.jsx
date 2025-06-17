import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const HandlePhoneNumber = () => {
  const { ManageProfile } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await ManageProfile(undefined, phoneNumber);
      if (res.success) {
        toast.success('Phone number updated successfully!');
        navigate(-1);
      } else {
        toast.error(res.message || 'Failed to update phone number.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
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
            className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="bg-white w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#B6B7BC] hover:border-purple-400 rounded-lg cursor-pointer"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-[#C8A8E9] w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#C8A8E9] hover:border-white rounded-lg cursor-pointer"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandlePhoneNumber;
