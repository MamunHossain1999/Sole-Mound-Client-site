import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";


const fetchCardAddressData = async () => {
  const response = await axios.get("/payment.json");
  return response.data;
};

const CardAndAddress = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["card-address"],
    queryFn: fetchCardAddressData,
  });

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editCardData, setEditCardData] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cardData, setCardData] = useState({
  name: '',
  number: '',
  expiry: '',
  cvc: '',
});


// Fetching data and setting initial states
  useEffect(() => {
    if (data) {
      setCards(data.cards || []);
      setSelectedCard(data.cards?.[0]?.id || 0);
      setShippingAddress(data.shippingAddress);
      setBillingAddress(data.billingAddress);
    }
  }, [data]);


  // handle edit card
  const handleEdit = (cardId) => {
    const cardToEdit = cards.find((card) => card.id === cardId);
    setEditCardData({ ...cardToEdit });
    setIsEditing(true);
  };


  // handle add card
  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCardData({ ...cardData, [name]: value });
};

  // handle add card
const handleAddCardSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('/api/cards', cardData); // API call

    toast.success('Card added successfully!');
    console.log('Card added:', response.data);

    setShowAddCardModal(false);
    setCardData({ name: '', number: '', expiry: '', cvc: '' });
  } catch (error) {
    toast.error('Failed to add card. Please try again.');
    console.error('Error adding card:', error);
  }
};

// handle edit card data
 const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCardData((prev) => ({ ...prev, [name]: value }));
  };

// handle update card reques
const handleUpdateCardSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(`/api/cards/${cardData.id}`, cardData); 

    toast.success('Card updated successfully!');
    console.log('Card updated:', response.data);

    setShowAddCardModal(false);
    setCardData({ name: '', number: '', expiry: '', cvc: '', id: '' }); 
  } catch (error) {
    toast.error('Failed to update card. Please try again.');
    console.error('Error updating card:', error);
  }
};

  // handle delete card
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://server-shopnow.vercel.app/api/v1/payment-method/${selectedCard._id}`
      );

      if (response.status === 200) {
        toast.success("Payment method deleted successfully");
      queryClient.invalidateQueries("paymentMethod");
      setEditMode(false);
      setSelectedCard(null);
    }
  } catch (error) {
    toast.error("Failed to delete payment method");
    console.error(error);
  }
};

// handle cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setEditCardData(null);
  };

  // handle shipping address change
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };
// handle save shipping address
  const handleSaveAddress = async () => {
  try {
    const res = await axios.put('/api/user/shipping-address', shippingAddress);
    toast.success('Shipping address updated!');
    setIsEditingShipping(false);
  } catch (error) {
    toast.error('Failed to update address.');
    console.error(error);
  }
};


  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const AddressForm = ({ address, handleChange }) => (
    <>
      <input
        name="name"
        value={address.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <textarea
        name="street"
        value={address.street}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        rows="3"
      />
      <input
        name="phone"
        value={address.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="email"
        value={address.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
    </>
  );

  const AddressDisplay = ({ address }) => (
    <>
      <p className="font-medium text-gray-600">{address.name}</p>
      <p className="text-gray-600 text-sm mt-1">{address.street}</p>
      <p className="text-gray-600 text-sm mt-4">
        <span className="font-medium">Phone:</span> {address.phone}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-medium">Email:</span> {address.email}
      </p>
    </>
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  if (!shippingAddress || !billingAddress)
    return <p>Loading address data...</p>;

  return (
    <div className="container mx-auto mb-30">
      {/* Payment Section */}
      <div className="rounded-lg p-6 mb-6 mt-14">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#F1DAFC] p-4 px-12 rounded-lg">
          <h2 className="font-semibold text-base text-[#191C1F]">
            Payment Option
          </h2>

          <button
            onClick={() => setShowAddCardModal(true)}
            className=" text-[#3CA6FC] font-semibold text-base "
          >
            Add Card +
          </button>
        </div>

        {/* Add Card Modal */}
        {showAddCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-opacity-40 z-40"></div>

            {/* Modal Box */}
            <div className="relative z-50 bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
              <button
                onClick={() => setShowAddCardModal(false)}
                className="absolute top-3 right-4 text-gray-500 text-xl font-bold hover:text-red-500"
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold mb-4">Add New Card</h2>

              <form onSubmit={handleAddCardSubmit} className="space-y-6 px-20 mt-8">
                <div>
                  <label className="block mb-1 text-sm font-medium">Name on Card</label>
                  <input
                    type="text"
                    name="name"
                    value={cardData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={handleInputChange}
                    placeholder="Enter Number"
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Expire Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YY"
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    placeholder="Number"
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  />
                </div>

                <div className="text-right mt-4">
                  <button
                    type="submit"
                    className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500"
                  >
                    Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      {/* Cards Display */}
      <div className="flex flex-wrap gap-6 px-14 py-8 shadow-xl shadow-[#4B00811F] bg-[#FFFFFF] ">
        {cards?.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
              className={`relative w-full md:w-[48%] overflow-hidden cursor-pointer shadow-lg}`}
            >
              {/* card img */}
              <img
                src={card.image}
                alt="Card Background"
                className="absolute w-full h-full object-cover"
              />
              <div />
              <div className="relative pl-13 pr-8 py-8 text-white h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#FFFFFF] text-2xl">
                    {card.bankName}
                  </span>
                  <span className="font-bold text-2xl text-[#FFFFFF]">
                    {card.network}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="w-10 h-6 rounded-sm mb-4"></div>
                  <p className="text-2xl text-[#FFFFFF] tracking-wider font-bold mb-4">
                    {card.number}
                  </p>
                  <div className="flex justify-between items-end">
                    <p className="text-base text-[#FFFFFF] font-semibold">
                      {card.cardholderName}
                    </p>
                    <div className="text-right flex gap-4">
                      <p className="text-sm">Valid Thru</p>
                      <p className="text-sm">{card.validThru}</p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="absolute -top-5 right-8">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === card.id ? null : card.id);
                    }}
                    className="text-white text-5xl cursor-pointer "
                  >
                    ...
                  </button>
                  {menuOpenId === card.id && (
                    <div
                      className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          handleDelete(card.id);
                          setShowConfirmModal(true);
                          setMenuOpenId(null);
                        }}
                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-[#FF1C1C] "
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => {
                          handleEdit(card.id);
                          setMenuOpenId(null);
                        }}
                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-[#FF1C1C] "
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* Update Modal */}
        {isEditing && editCardData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-opacity-40 z-40"></div>

          {/* Modal */}
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl z-50 relative shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-[#E2E3E8] pb-4">
              <h2 className="font-bold text-2xl text-[#505050]">Edit Card</h2>
              <button onClick={handleCancel} className="text-[#505050] text-xl hover:text-red-500">
                <RxCross2 />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mt-8 px-20">
              {/* Name on Card */}
              <div>
                <label className="block text-base font-semibold text-[#474B57] mb-1">Name on Card</label>
                <input
                  type="text"
                  name="Name on Card"
                  value={editCardData["Name on Card"]}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  placeholder="Enter Name"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-base font-semibold text-[#474B57] mb-1">Card Number</label>
                <input
                  type="text"
                  name="Card Number"
                  value={editCardData["Card Number"]}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  placeholder="Enter Number"
                />
              </div>

              {/* Expire Date & CVC */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-base font-semibold text-[#474B57] mb-1">Expire Date</label>
                  <input
                    type="text"
                    name="Expire Date"
                    value={editCardData["Expire Date"]}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    placeholder="DD/MM/YY"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-base font-semibold text-[#474B57] mb-1">CVC</label>
                  <input
                    type="text"
                    name="CVC"
                    value={editCardData["CVC"]}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    placeholder="Number"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-base font-semibold text-[#474B57] mb-1">Address</label>
                <input
                  type="text"
                  name="Address"
                  value={editCardData["Address"]}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  placeholder="Your Address"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleUpdateCardSubmit}
                  className="px-5 py-3 bg-[#C5A8F9] text-[#1F1F1F] font-semibold rounded-md hover:bg-[#b592f7]"
                >
                  Save the changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>


      {/* delete confirmation modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md text-center max-w-md w-full">
            <img src="/your-image-path.png" alt="Delete Illustration" className="mx-auto mb-4 w-40" />
            <p className="text-lg font-medium mb-6">Are you sure to remove this card?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-12">
        {/* Shipping Address */}
        <div className="border border-[#E2E3E8] rounded-lg">
          <h2 className="text-[20px] font-bold text-[#1F1F1F] mb-4 px-9 py-2 bg-[#FDF1F7]">
            Shipping Address
          </h2>
          <div className="bg-white rounded-lg px-9 text-[#919191]">
            {isEditingShipping ? (
              <AddressForm
                address={shippingAddress}
                handleChange={handleShippingChange}
              />
            ) : (
              <AddressDisplay address={shippingAddress} />
            )}
            <div className="py-3 flex justify-end">
              <button
                className="bg-[#C8A8E9] text-[#1F1F1F] px-6 py-2 rounded-lg hover:bg-purple-400"
                onClick={() => {
                  if (isEditingShipping) {
                    handleSaveAddress(); 
                  } else {
                    setIsEditingShipping(true);
                  }
                }}
              >
                {isEditingShipping ? "Save Address" : "Edit Address"}
              </button>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="border border-[#E2E3E8] rounded-lg">
          <h2 className="text-[20px] font-bold text-[#1F1F1F] mb-4 px-9 py-2 bg-[#FDF1F7]">
            Billing Address
          </h2>
          <div className="bg-white rounded-lg px-9 text-[#919191]">
            {isEditingBilling ? (
              <AddressForm
                address={billingAddress}
                handleChange={handleBillingChange}
              />
            ) : (
              <AddressDisplay address={billingAddress} />
            )}
            <div className="py-3 flex justify-end">
              <button
                className="bg-[#C8A8E9] text-[#1F1F1F] px-6 py-2 rounded-lg hover:bg-purple-400"
                onClick={() => {
                  if (isEditingShipping) {
                    handleSaveAddress(); 
                  } else {
                    setIsEditingShipping(true);
                  }
                }}
              >
                {isEditingShipping ? "Save Address" : "Edit Address"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAndAddress;
