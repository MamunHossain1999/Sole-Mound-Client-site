import topImg from "../../assets/returnSuccessFullTopImg/Screenshot_15.png";
import { Link, useSearchParams } from "react-router-dom";
import { LiaBuffer } from "react-icons/lia";

const CheckOutOrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[472px] bg-[#FDF1F7] p-6">
        
        <div className="w-full rounded-xl p-8 flex flex-col items-center">
          
          <div className="w-22 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <img src={topImg} alt="success" />
          </div>

          <div className="text-center space-y-4 mt-4">
            <h1 className="text-[24px] font-bold text-[#191C1F]">
              Payment Successful 🎉
            </h1>

            <div className="text-[#5F6C72] text-base space-y-1">
              <p>Your payment has been completed successfully.</p>
              <p>We’ve received your order.</p>
              <p>Happy Shopping ❤️</p>
            </div>

            {sessionId && (
              <p className="text-sm text-gray-500">
                Session ID: {sessionId}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full md:max-w-[430px] p-4 rounded-lg">
            
            <Link to="/dashboard/account-page" className="w-full">
              <button className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-300">
                Go to Dashboard
                <LiaBuffer className="h-6 w-6" />
              </button>
            </Link>

            <Link to="/dashboard/order-history" className="w-full">
              <button className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-300">
                View Order
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutOrderSuccessPage;