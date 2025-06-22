import React from "react";
import topImg from "../../assets/returnSuccessFullTopImg/Screenshot_15.png";
import { Link } from "react-router-dom";
import { LiaBuffer } from "react-icons/lia";

const ReturnRequestConfirm = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[472px] bg-[#FDF1F7] p-6">
        <div className="w-full rounded-xl p-8 flex flex-col items-center">
          <div className="">
            <div className="w-22 h-20 rounded-full bg-purple-100 flex items-center justify-center">
              <img src={topImg} alt="check img" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-[24px] font-bold text-[#191C1F]">
              Your return request is successfully placed
            </h1>

            <div className="text-[#5F6C72] text-base font-normal space-y-1">
              <p>Your request has been placed successfully!</p>
              <p>You'll receive a confirmation email shortly.</p>
              <p>Happy Shopping</p>
            </div>
          </div>

          {/* <div className="w-full flex justify-center items-center px-4"> */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full md:max-w-[430px] p-4 rounded-lg">
              {/* Dashboard Button */}
              <Link to="/dashboard/account-page" className="w-full ">
                <button className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-2 px-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-300 transition">
                  Go to Dashboard
                  <LiaBuffer className="h-6 w-6" />
                </button>
              </Link>

              {/* View Order Button */}
              <Link to="/dashboard/order-history" className="w-full mx-auto">
                <button className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-300 transition">
                  View Order
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </Link>
            </div>
          {/* </div> */}

        </div>
      </div>
    </div>
  );
};

export default ReturnRequestConfirm;
