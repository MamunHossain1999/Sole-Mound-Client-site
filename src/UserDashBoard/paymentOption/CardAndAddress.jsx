import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardAndAddress = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [cards, setCards] = useState([
    {
      id: 1,
      bankName: "BANK NAME",
      network: "VISA",
      number: "1234 5678 9009 8765",
      cardholderName: "Cardholder Name",
      validThru: "08/28",
      gradient: "from-purple-500 to-purple-300",
    },
    {
      id: 2,
      bankName: "BANK NAME",
      network: "VISA",
      number: "1234 5678 9009 8765",
      cardholderName: "Cardholder Name",
      validThru: "08/28",
      gradient: "from-gray-600 to-gray-400",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editCardData, setEditCardData] = useState(null);

  const handleEdit = (cardId) => {
    const cardToEdit = cards.find((card) => card.id === cardId);
    setEditCardData({ ...cardToEdit });
    setIsEditing(true);
  };

  const handleDelete = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
    if (selectedCard === cardId) {
      setSelectedCard(cards[0]?.id || null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setCards(
      cards.map((card) => (card.id === editCardData.id ? editCardData : card))
    );
    setIsEditing(false);
    setEditCardData(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditCardData(null);
  };

  const [shippingAddress, setShippingAddress] = useState({
    name: "Kevin Gilbert",
    street:
      "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
    phone: "+1-202-555-0118",
    email: "kevingilbert@gmail.com",
  });

  const [billingAddress, setBillingAddress] = useState({
    name: "Kevin Gilbert",
    street:
      "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
    phone: "+1-202-555-0118",
    email: "kevingilbert@gmail.com",
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShippingEdit = () => {
    setIsEditingShipping((prev) => !prev);
  };

  const toggleBillingEdit = () => {
    setIsEditingBilling((prev) => !prev);
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
        <span className="font-medium">Phone Number:</span> {address.phone}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-medium">Email:</span> {address.email}
      </p>
    </>
  );

  return (
    <div className="container mx-auto">
      {/* Payment Option Section */}
      <div className="rounded-lg p-6 mb-6 mt-14">
        <div className="flex justify-between items-center bg-[#F1DAFC] p-4 mb-4 px-12 rounded-lg">
          <h2 className="text-lg font-semibold text-[#000000]">
            Payment Option
          </h2>
          <Link to="/dashboard/add-new-card">
            <button className="text-blue-400 hover:text-blue-600 font-medium flex items-center cursor-pointer">
              Add Card <span className="ml-1 text-xl">+</span>
            </button>
          </Link>
        </div>
        <div className=" ">
          <div className="flex gap-6 mb-4 gird grid-cols-2 px-12">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`relative w-full  rounded-xl overflow-hidden cursor-pointer shadow-lg ${
                  selectedCard === card.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCard(card.id)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${card.gradient}`}
                ></div>
                <div className="relative p-4 text-white h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-lg">{card.bankName}</span>
                    <span className="font-bold text-xl">{card.network}</span>
                  </div>

                  <div className="mt-6">
                    <div className="w-10 h-6 bg-yellow-400 rounded-sm mb-4"></div>
                    <p className="text-lg tracking-wider font-medium mb-4">
                      {card.number}
                    </p>
                    <div className="flex justify-between items-end">
                      <p className="text-sm">{card.cardholderName}</p>
                      <div className="text-right">
                        <p className="text-xs">Valid Thru</p>
                        <p className="text-sm">{card.validThru}</p>
                      </div>
                    </div>
                  </div>

                  {/* 3-dot menu */}
                  <div className="absolute cursor-pointer -top-8 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === card.id ? null : card.id);
                      }}
                      className="text-white  bg-opacity-30 hover:bg-opacity-50 p-1 rounded-full text-5xl"
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
                            handleEdit(card.id);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(card.id);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && editCardData && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-[16px] font-medium mb-4 text-black">Edit Card</h2>
              <div className="space-y-4">
                {[
                  "bankName",
                  "network",
                  "number",
                  "cardholderName",
                  "validThru",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-[16px] font-medium text-gray-700 mb-1">
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={editCardData[field]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md"
                    />
                  </div>
                ))}

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border rounded-md text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 border text-gray-500 rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
                onClick={toggleShippingEdit}
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
            <div className="py-2 flex justify-end">
              <button
                className="bg-[#C8A8E9] text-[#1F1F1F] px-6 py-2 rounded-lg hover:bg-purple-400"
                onClick={toggleBillingEdit}
              >
                {isEditingBilling ? "Save Address" : "Edit Address"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAndAddress;
