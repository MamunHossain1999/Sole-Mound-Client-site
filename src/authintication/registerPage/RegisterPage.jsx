import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

// import {
//   auth,
//   googleProvider,
//   facebookProvider,
//   signInWithPopup,
// } from "../../firebase";

import signUpbgimg from "../../assets/signUpbgImg/Screenshot_2.png";
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

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!rememberMe) {
      toast.error("Please accept Terms & Conditions to continue.");
      return;
    }

    toast.success("Form submitted successfully!");
    console.log("Submitting form with:", { email, password });

    navigate(from, { replace: true });
  };

  const handleGoogleLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, googleProvider);
      // toast.success(`Welcome ${result.user.displayName}`);
      navigate("/register/google-sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, googleProvider);
      // toast.success(`Welcome ${result.user.displayName}`);
      navigate("/register/google-sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, googleProvider);
      // toast.success(`Welcome ${result.user.displayName}`);
      navigate("/register/google-sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-full bg-cover flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${signUpbgimg})` }}
    >
      <div className="flex container min-h-screen p-4">
        <div className="w-full bg-white rounded-lg h-[550px] mt-12">
          <div className="pt-12 w-7xl mx-auto">
            <h2 className="text-[32px] font-medium text-center text-[#1F1F1F] mb-6">
              Create your Sole Mound account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Side */}
                <div>
                  {/* Email */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-base font-semibold text-[#505050] mb-1"
                    >
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
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600 mb-1"
                    >
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
                  <div className="flex items-center relative">
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
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-base text-[#505050]"
                    >
                      I agree that I’ve read and agreed to the Terms & Conditions and Privacy Policy
                    </label>
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  {/* Divider */}
                  <div className="flex items-center gap-4 pb-7 w-[422px] mx-auto">
                    <div className="flex-grow h-px bg-[#B6B7BC]"></div>
                    <span className="text-[#1F1F1F] font-medium">OR</span>
                    <div className="flex-grow h-px bg-[#B6B7BC]"></div>
                  </div>

                  {/* Social Logins */}
                  <div className="space-y-6">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-between px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] cursor-pointer rounded-md hover:bg-gray-50"
                    >
                      <div className="w-full flex items-center justify-center">
                        <img src={google} alt="google" className="w-5 h-5 mr-3" />
                        Continue with Google
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleAppleLogin}
                      className="w-full flex items-center justify-between px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] cursor-pointer rounded-md hover:bg-gray-50"
                    >
                      <div className="w-full flex items-center justify-center">
                        <img src={apple} alt="apple" className="w-5 h-5 mr-3" />
                        Continue with Apple
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleFacebookLogin}
                      className="w-full flex items-center justify-between px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] cursor-pointer rounded-md hover:bg-gray-50"
                    >
                      <div className="w-full flex items-center justify-center">
                        <img src={facebook} alt="facebook" className="w-5 h-5 mr-3" />
                        Continue with Facebook
                      </div>
                    </button>

                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 w-2xl mx-auto">
                <button
                  type="submit"
                  className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-3 rounded-md font-semibold hover:bg-purple-300 flex items-center justify-center cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
