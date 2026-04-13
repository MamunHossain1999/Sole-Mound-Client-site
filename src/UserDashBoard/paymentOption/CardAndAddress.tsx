import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import AddCardModal from "./AddCardModal";
import ConfirmDeleteCardModal from "./ConfirmDeleteCardModal";
import EditCardModal from "./EditCardModal";

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
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    if (data) {
      setCards(data.cards || []);
      setSelectedCard(data.cards?.[0]?.id || 0);
      setShippingAddress(data.shippingAddress);
      setBillingAddress(data.billingAddress);
    }
  }, [data]);

  const handleEdit = (cardId) => {
    const cardToEdit = cards.find((card) => card.id === cardId);
    setEditCardData({ ...cardToEdit });
    setTimeout(() => {
      setIsEditing(true);
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleAddCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/cards", cardData);
      toast.success("Card added successfully!");
      console.log("Card added:", response.data);
      setShowAddCardModal(false);
      setCardData({ name: "", number: "", expiry: "", cvc: "" });
    } catch (error) {
      toast.error("Failed to add card. Please try again.");
      console.error("Error adding card:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/cards/${cardData.id}`, cardData);
      toast.success("Card updated successfully!");
      console.log("Card updated:", response.data);
      setShowAddCardModal(false);
      setCardData({ name: "", number: "", expiry: "", cvc: "", id: "" });
    } catch (error) {
      toast.error("Failed to update card. Please try again.");
      console.error("Error updating card:", error);
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
        setIsEditing(false);
        setSelectedCard(null); // optional
      }
    } catch (error) {
      toast.error("Failed to delete payment method");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditCardData(null);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveShippingAddress = async () => {
    try {
      await axios.put("/api/user/shipping-address", shippingAddress);
      toast.success("Shipping address updated!");
      setIsEditingShipping(false);
    } catch (error) {
      toast.error("Failed to update address.");
      console.error(error);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveBillingAddress = async () => {
    try {
      await axios.put("/api/user/billing-address", billingAddress);
      toast.success("Billing address updated!");
      setIsEditingBilling(false);
    } catch (error) {
      toast.error("Failed to update billing address.");
      console.error(error);
    }
  };

  const AddressForm = ({ address, handleChange }) => (
    <>
      <input
        name="name"
        value={address.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Name"
      />
      <textarea
        name="street"
        value={address.street}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        rows="3"
        placeholder="Street Address"
      />
      <input
        name="phone"
        value={address.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Phone"
      />
      <input
        name="email"
        value={address.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
        placeholder="Email"
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
    <div className="container mx-auto max-w-screen-lg md:mb-30 px-2 md:px-4 sm:px-6 lg:px-8">
      {/* Payment Section */}
      <div className="rounded-lg p-0 md:p-6 mb-6 md:mt-14">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#F1DAFC] p-4 sm:px-4 rounded-lg">
          <h2 className="font-semibold text-base text-[#191C1F]">
            Payment Option
          </h2>

          <button
            onClick={() => setShowAddCardModal(true)}
            className="text-[#3CA6FC] font-semibold text-base cursor-pointer"
          >
            Add Card +
          </button>
          <AddCardModal
            show={showAddCardModal}
            onClose={() => setShowAddCardModal(false)}
            cardData={cardData}
            onChange={handleInputChange}
            onSubmit={handleAddCardSubmit}
          />
        </div>

        {/* Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 px-0 sm:px-7 py-8 shadow-xl shadow-[#4B00811F] bg-[#FFFFFF]">
          {cards?.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className="relative overflow-hidden cursor-pointer shadow-lg rounded-lg"
            >
              {/* card img */}
              <img
                src={card.image}
                alt="Card Background"
                className="absolute w-full h-full object-cover rounded-lg"
              />
              <div className="relative p-6 lg:pl-10 pr-8 py-8 text-white h-full flex flex-col justify-between rounded-lg">
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
                    className="text-white text-5xl cursor-pointer"
                  >
                    ...
                  </button>
                  {menuOpenId === card.id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          setShowConfirmModal(true);
                          setMenuOpenId(null);
                        }}
                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-[#FF1C1C]"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => {
                          handleEdit(card.id);
                          setMenuOpenId(null);
                        }}
                        className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-[#FF1C1C]"
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
      </div>

      {/*show all modal  */}
      {/* Add Card Modal */}
      <AddCardModal
        show={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
        cardData={cardData}
        onChange={handleInputChange}
        onSubmit={handleAddCardSubmit}
      />

      {/* Edit Card Modal */}
      {isEditing && editCardData && (
        <EditCardModal
          show={isEditing}
          cardData={editCardData}
          onClose={handleCancel}
          onChange={handleChange}
          onSubmit={handleUpdateCardSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmDeleteCardModal
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => {
            handleDelete();
            setShowConfirmModal(false);
          }}
        />
      )}

      {/* Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 px-0 sm:px-7">
        {/* Shipping Address */}
        <div className="border border-[#E2E3E8] rounded-lg">
          <h2 className="text-[20px] font-bold text-[#1F1F1F] mb-4 px-6 sm:px-9 py-2 bg-[#FDF1F7]">
            Shipping Address
          </h2>
          <div className="bg-white rounded-lg px-6 sm:px-9 text-[#919191]">
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
                className="bg-[#C8A8E9] text-[#1F1F1F] px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-400"
                onClick={() => {
                  if (isEditingShipping) {
                    handleSaveShippingAddress();
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
          <h2 className="text-[20px] font-bold text-[#1F1F1F] mb-4 px-6 sm:px-9 py-2 bg-[#FDF1F7]">
            Billing Address
          </h2>
          <div className="bg-white rounded-lg px-6 sm:px-9 text-[#919191]">
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
                className="bg-[#C8A8E9] text-[#1F1F1F] px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-400"
                onClick={() => {
                  if (isEditingBilling) {
                    handleSaveBillingAddress();
                  } else {
                    setIsEditingBilling(true);
                  }
                }}
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
