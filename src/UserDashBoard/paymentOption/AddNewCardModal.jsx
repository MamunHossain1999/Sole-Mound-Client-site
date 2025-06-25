import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddNewCardModal = ({ onAddCard }) => {
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    address: '' // ✅ Added address
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onAddCard === 'function') {
      onAddCard(cardData);
      
    }
    setCardData({ name: '', number: '', expiry: '', cvc: '', address: '' });
    navigate(-1);
    toast.success('Card add successfully!');
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium text-gray-700">Add New Card</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={cardData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Enter Number"
              value={cardData.number}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
              Expire Date
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              placeholder="CVC"
              value={cardData.cvc}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* ✅ New Address Input */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={cardData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              
              className="px-6 py-2 bg-purple-300 text-gray-800 rounded-md hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCardModal;
