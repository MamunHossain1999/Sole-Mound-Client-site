import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import useAuth from '../../hooks/UseAuth';


const ChangeNameModal = () => {
  const { ManageProfile } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const result = await ManageProfile(name); 

      if (result.success) {
        toast.success('Name updated successfully!');
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        toast.error(result.message || 'Failed to update name.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[805px] mx-auto h-auto items-center justify-center pt-32">
      <div className="px-6 py-8 border border-[#919191] rounded-[15px]">
        <h2 className="text-[24px] font-medium text-[#1F1F1F] mb-2">Change your name</h2>
        <p className="text-sm font-normal text-[#505050] mb-4">
          To update the name on your Sole Mound account, enter the new name below and click the Save Changes button to confirm
        </p>

        <div className="mb-5 rounded-lg ">
          <label htmlFor="name" className="block text-[#1F1F1F] text-base font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> 
        </div>

        <div className="flex justify-between gap-15">
          <button
            className="bg-white w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#B6B7BC] hover:border-purple-400 hover:border-1 rounded-[8px] cursor-pointer"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-[#C8A8E9] w-1/2 text-[#1F1F1F] font-semibold py-2 px-4 border border-[#C8A8E9] hover:border-white rounded-[8px] cursor-pointer"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop />
    </div>
  );
};

export default ChangeNameModal;
