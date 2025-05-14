import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Replace this with your actual image import
import signUpbgimg from "../../assets/signUpbgImg/Screenshot_2.png";

const GoogleSignIn = () => {
  const [language, setLanguage] = useState("English");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const accounts = [
    {
      name: "Kevin Gilbert",
      email: "Kevin.Gilbert@gmail.com",
      initial: "D",
      color: "bg-yellow-400",
    },
    {
      name: "Emerson Aminoff",
      email: "email@gmail.com",
      initial: "C",
      color: "bg-pink-300",
    },
    {
      name: "Aspen Aminoff",
      email: "email@gmail.com",
      initial: "K",
      color: "bg-blue-200",
    },
  ];

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${signUpbgimg})` }}
    >
      <div className="flex container min-h-screen p-4">
        <div className="w-full bg-white rounded-lg h-[550px] mt-16 shadow-lg pt-12">
          <div className="bg-white rounded-lg w-7xl mx-auto p-8 ">
            <div className="flex">
              <div className="w-1/2">
                {/* left side */}
                <div className="flex flex-col">
                  <div className="flex items-center justify- mb-4">
                    <svg className="w-16 h-16" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2 text-[32px] font-medium text-[#1F1F1F]">
                      Sign Up with Google
                    </span>
                  </div>
                </div>

                <h1 className="text-[32px] font-medium text-[#1F1F1F] mb-1">
                  Choose an account
                </h1>
                <p className="text-base text-[#1F1F1F] mb-6">
                  to continue to{" "}
                  <span className="text-[#E3AADD]">SoleMound</span>
                </p>
              </div>

              {/* right side */}
              <div className="w-1/2 space-y-2 mb-6">
                {accounts?.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3  hover:bg-gray-100 cursor-pointer border-b border-[#919191]"
                  >
                    <div
                      className={`${account.color} rounded-full w-10 h-10 flex items-center justify-center text-lg text-white`}
                    >
                      {account.initial}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-base text-[#1F1F1F]">
                        {account.name}
                      </div>
                      <div className="text-base font-semibold text-[#919191]">
                        {account.email}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
                  <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 text-base font-semibold text-[#1F1F1F]">
                    Use another account
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 text-base text-[#000000]">
              <button className="flex items-center">
                {language}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="flex space-x-6">
                <Link to="#">Help</Link> 
                <Link to="#">Privacy</Link>
                <Link to="#">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
