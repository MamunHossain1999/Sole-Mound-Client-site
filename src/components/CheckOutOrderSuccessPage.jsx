import React from 'react';
const CheckOutOrderSuccessPage = () => {
        return (
          <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-purple-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Success Message */}
              <h1 className="text-2xl font-semibold text-gray-800 mb-3">
                Your order is successfully place
              </h1>
              
              <p className="text-gray-600 mb-1">
                Thank you for your purchase. Your order has been placed successfully!
              </p>
              <p className="text-gray-600 mb-1">
                You'll receive a confirmation email shortly.
              </p>
              <p className="text-gray-600 mb-8">
                Happy Shopping
              </p>
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 bg-purple-200 text-purple-800 rounded-md flex items-center">
                  Go to Dashboard
                  <svg 
                    className="w-5 h-5 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
                
                <button className="px-4 py-2 bg-purple-200 text-purple-800 rounded-md flex items-center">
                  View Order
                  <svg 
                    className="w-5 h-5 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      }

export default CheckOutOrderSuccessPage;