import React, { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/Redux/api/authApi";

// Background images
import bgOne from "../../assets/loginImg/bg-1.png";
import bgTwo from "../../assets/loginImg/bg-2.png";
import bgThree from "../../assets/loginImg/bg-3.png";
import bgFour from "../../assets/loginImg/bg-4.png";
import bgFive from "../../assets/loginImg/bg-5.png";
import bgSix from "../../assets/loginImg/bg-6.png";
import bgSeven from "../../assets/loginImg/bg-7.png";
import bgEight from "../../assets/loginImg/bg-8.png";

import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";

const SellerLoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!rememberMe) {
      toast.error("Please check 'Remember Me' to continue.");
      return;
    }

    try {
      // ✅ RTK Query mutation call
      const response = await login({ email, password }).unwrap();

      // response থেকে user data নেওয়া (সাধারণত এভাবে আসে)
      const user = response?.user || response?.data || response;

      toast.success("Login successful!");

      // Role অনুসারে Redirect
      if (user?.role === "seller" || user?.role === "both") {
        toast.info("Redirecting to Seller Dashboard...");
        
        // আলাদা Seller App-এ যাওয়ার জন্য (full URL)
        setTimeout(() => {
          window.location.href = "http://localhost:5174/";
        }, 1200);
      } 
      else {
        // যদি কোনো কারণে customer role আসে
        navigate("/", { replace: true });
      }

    } catch (error: any) {
      console.error("Login failed:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Invalid email or password. Please try again.";

      toast.error(errorMessage);
    }
  };

  // Social Logins (placeholder)
  const handleGoogleLogin = () => toast.info("Google login coming soon!");
  const handleFacebookLogin = () => toast.info("Facebook login coming soon!");
  const handleAppleLogin = () => toast.info("Apple login coming soon!");

  return (
    <div className="relative bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] min-h-screen">
      {/* Background Images */}
      <img src={bgOne} alt="bg" className="absolute top-5 left-5 w-[120.68px] h-[109.72px]" />
      <img src={bgTwo} alt="bg" className="absolute top-40 left-95 w-[110px] h-[103px]" />
      <img src={bgThree} alt="bg" className="absolute top-25 left-1/2 w-[127px] h-[108px]" />
      <img src={bgFour} alt="bg" className="absolute top-10 right-40 w-[278px] h-[220px]" />
      <img src={bgFive} alt="bg" className="absolute top-3/5 left-0 w-[145px] h-[124px]" />
      <img src={bgSix} alt="bg" className="absolute top-1/2 left-[20%] w-[290px] h-[202px]" />
      <img src={bgSeven} alt="bg" className="absolute top-2/3 left-[47%] w-[128px] h-[97px]" />
      <img src={bgEight} alt="bg" className="absolute bottom-[25%] right-[13%] w-[116px] h-[110px]" />

      <div className="h-[600px] md:h-[850px] w-full flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row max-w-7xl w-full space-x-28">
          {/* Left Section */}
          <div className="hidden md:flex md:w-1/2 p-10 flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#EC75AD] mb-4">
              Welcome!
            </h1>
            <p className="text-2xl lg:text-3xl text-[#EC75AD]">
              To Global Selling Center
            </p>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden z-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-[#474B57] mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-semibold text-[#474B57]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <div className="flex items-center relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 appearance-none border-[#C8A8E9] rounded checked:bg-[#C8A8E9] checked:border-transparent"
                  />
                  <span className="pointer-events-none absolute left-[5px] top-1 text-white text-xs font-bold peer-checked:block hidden">
                    ✓
                  </span>
                  <label htmlFor="remember-me" className="ml-2 text-base text-[#505050]">
                    Remember me
                  </label>
                </div>

                <Link to="/auth/forgot-password" className="text-base text-[#3CA6FC] hover:text-[#77b9f0]">
                  Forgot Password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 rounded-md text-base font-semibold text-[#1F1F1F] bg-[#C8A8E9] hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-purple-400 disabled:opacity-50 transition-all"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </div>
            </form>

            {/* OR Divider + Social Login */}
            <div className="mt-6">
              <div className="w-full mx-auto divider before:bg-[#B6B7BC] after:bg-[#B6B7BC] text-[#1F1F1F]">
                OR
              </div>

              <div className="flex justify-center space-x-8 mt-4">
                <button onClick={handleAppleLogin}>
                  <img className="w-6 h-6 cursor-pointer" src={apple} alt="apple" />
                </button>
                <button onClick={handleGoogleLogin}>
                  <img className="w-6 h-6 cursor-pointer" src={google} alt="google" />
                </button>
                <button onClick={handleFacebookLogin}>
                  <img className="w-6 h-6 cursor-pointer" src={facebook} alt="facebook" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base text-[#505050]">
                Don't have an account?{" "}
                <Link to="/seller/sign-up" className="font-medium text-[#3CA6FC] hover:text-[#77b9f0]">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLoginPage;