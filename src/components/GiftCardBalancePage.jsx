import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GiftCardBalancePage = () => {
  const [balance, setBalance] = useState(0);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    setBalance(120.5);
    setActivity([
      {
        date: "2025-04-20",
        description: "Gift card redeemed",
        amount: "-$30.00",
        closingBalance: "$90.50",
      },
      {
        date: "2025-04-10",
        description: "Gift card loaded",
        amount: "+$120.50",
        closingBalance: "$120.50",
      },
    ]);
  }, []);

  const handleCancel = () => {
    toast.warning("Gift card cancellation requested.");
  };

  const handleReload = () => {
    toast.success("Redirecting to reload page...");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
      <h1 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-6 text-center sm:text-left">
        View Gift Card Balance and Activity
      </h1>

      {/* Balance Card */}
      <div className="rounded mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <p className="text-xl sm:text-2xl font-medium text-[#1F1F1F]">
            Your Gift Card Balance: ${balance.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="w-full sm:flex-1 py-2 px-4 border border-[#B6B7BC] rounded text-[#1F1F1F] hover:bg-gray-50 transition"
            onClick={handleCancel}
          >
            Cancel Gift Card
          </button>
          <button
            className="w-full sm:flex-1 py-2 px-4 bg-[#C8A8E9] rounded text-[#1F1F1F] hover:bg-purple-300 transition"
            onClick={handleReload}
          >
            Reload Your Balance
          </button>
        </div>
      </div>

      {/* Activity Card */}
      <div className="border border-[#4B008114] rounded p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-4 text-center sm:text-left">
          Gift Card Activity
        </h2>

        <div className="overflow-x-auto">
          <div className="w-full min-w-[640px]">
            <div className="flex text-[#505050] font-semibold bg-gray-50">
              <p className="w-1/4 py-3 px-2">Date</p>
              <p className="w-1/4 py-3 px-2">Description</p>
              <p className="w-1/4 py-3 px-2">Amount</p>
              <p className="w-1/4 py-3 px-2">Closing Balance</p>
            </div>

            {activity.length > 0 ? (
              activity?.map((item, index) => (
                <div
                  key={index}
                  className="flex border-t border-gray-100 text-[#505050] bg-white"
                >
                  <p className="w-1/4 py-3 px-2">{item.date}</p>
                  <p className="w-1/4 py-3 px-2">{item.description}</p>
                  <p className="w-1/4 py-3 px-2">{item.amount}</p>
                  <p className="w-1/4 py-3 px-2">{item.closingBalance}</p>
                </div>
              ))
            ) : (
              <div className="flex">
                <p className="py-6 px-2 font-semibold text-[#1F1F1F] w-full">
                  You have no gift card activity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardBalancePage;
