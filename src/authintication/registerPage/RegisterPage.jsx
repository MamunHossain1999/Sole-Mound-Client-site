import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import signUpbgimg from "../../assets/signUpbgImg/simg.png";
import dotdot from "../../assets/signUpbgImg/dotdot.png";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields.");
    if (!rememberMe) return toast.error("Please accept Terms & Conditions to continue.");
    toast.success("Form submitted successfully!");
    console.log("Submitting form with:", { email, password });
    navigate(from, { replace: true });
  };

  const handleGoogleLogin = async () => {
    try {
      navigate("/register/google-sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      navigate("/register/google-sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      navigate("/register/google-sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${signUpbgimg})` }}
    >
      <div className="container mx-auto flex justify-center items-center md:-mt-[150px]">
        <div className="bg-white w-full max-w-5xl md:h-[550px] rounded-lg shadow-lg p-6 md:p-12">
          <h2 className="text-[26px] sm:text-[32px] font-medium text-center text-[#1F1F1F] mb-6">
            Create your Sole Mound account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Side */}
              <div>
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-base font-semibold text-[#505050] mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B6B7BC] text-[#878A92] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                    <div className="absolute right-3 top-4 text-gray-400">
                      <Mail size={18} />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B6B7BC] text-[#878A92] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                    <div className="absolute right-3 top-4 text-gray-400">
                      <Lock size={18} />
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-2">
                  <div className="relative">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer h-5 w-5 text-purple-600 border-2 appearance-none border-[#C8A8E9] rounded checked:bg-purple-600 checked:border-transparent"
                    />
                    <span className="pointer-events-none absolute left-[5px] top-1 text-white text-xs font-bold peer-checked:block hidden">
                      ✓
                    </span>
                  </div>
                  <label htmlFor="remember-me" className="text-sm text-[#505050]">
                    I agree that I’ve read and agreed to the Terms & Conditions and Privacy Policy
                  </label>
                </div>
              </div>

              {/* Right Side */}
              <div>
                {/* Divider */}
                <div className="flex items-center gap-4 pb-7 w-full md:w-[422px] mx-auto">
                  <div className="flex-grow h-px bg-[#B6B7BC]"></div>
                  <span className="text-[#1F1F1F] font-medium">OR</span>
                  <div className="flex-grow h-px bg-[#B6B7BC]"></div>
                </div>

                {/* Social Logins */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] rounded-md hover:bg-gray-50"
                  >
                    <img src={google} alt="google" className="w-5 h-5 mr-3" />
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    onClick={handleAppleLogin}
                    className="w-full flex items-center justify-center px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] rounded-md hover:bg-gray-50"
                  >
                    <img src={apple} alt="apple" className="w-5 h-5 mr-3" />
                    Continue with Apple
                  </button>

                  <button
                    type="button"
                    onClick={handleFacebookLogin}
                    className="w-full flex items-center justify-center px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] rounded-md hover:bg-gray-50"
                  >
                    <img src={facebook} alt="facebook" className="w-5 h-5 mr-3" />
                    Continue with Facebook
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 w-full md:w-3/4 mx-auto">
              <button
                type="submit"
                className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-3 rounded-md font-semibold hover:bg-purple-300 flex items-center justify-center"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
