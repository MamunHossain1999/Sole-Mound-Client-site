import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import simg from "../../assets/signUpbgImg/simg.png";
import dotdot from "../../assets/signUpbgImg/dotdot.png";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";

import useAuth from "../../hooks/UseAuth";

const UserRegisterPage = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, agree } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!agree) {
      toast.error("Please accept Terms & Conditions to continue.");
      return;
    }

    const result = await handleRegister(name, email, password, "customer");

    if (result.success) {
      toast.success("Signup successful!");

      // ✅ Reset all fields properly
      setFormData({
        name: "",
        email: "",
        password: "",
        agree: false,
        role: "customer",
      });

      // Optional: wait before redirect
      setTimeout(() => {
        navigate("/auth/login-page", { replace: true });
      }, 1000);
    } else {
      toast.error(result.message || "Signup failed. Try again.");
    }
  };

  const handleSocialLogin = (platform) => {
    toast.info(`${platform} sign-in not implemented yet.`);
    navigate("/register/google-sign-in");
  };

  return (
    <div className="w-full flex relative min-h-screen bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] bg-white">
      <img
        src={dotdot}
        alt="bg"
        className="absolute bottom-40 right-64 w-[153px] h-[153px]"
      />
      <img
        src={simg}
        alt="bg"
        className="absolute top-0 left-18 w-[685px] h-[961px]"
      />

      <div className="container mx-auto flex justify-center items-center md:pt-[0px]">
        <div className="bg-white w-full max-w-5xl md:h-[550px] rounded-lg shadow-lg p-6 md:p-12 z-10">
          <h2 className="text-[26px] sm:text-[32px] font-medium text-center text-[#1F1F1F] mb-6">
            Create your Sole Mound account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div className="mb-4">
                  <label className="block text-base font-semibold text-[#505050] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-base font-semibold text-[#505050] mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                      required
                    />
                    <div className="absolute right-3 top-4 text-gray-400">
                      <Mail size={18} />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                      required
                    />
                    <div
                      className="absolute right-3 top-4 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="relative">
                    <input
                      id="agree"
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="peer h-5 w-5 border-2 border-[#C8A8E9] rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                    />
                    <span className="pointer-events-none absolute left-[5px] top-0.5 text-white text-xs font-bold peer-checked:block hidden">
                      ✓
                    </span>
                  </div>
                  <label htmlFor="agree" className="text-sm text-[#505050]">
                    I agree that I’ve read and agreed to the Terms & Conditions
                    and Privacy Policy
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 pb-7 w-full md:w-[422px] mx-auto">
                  <div className="flex-grow h-px bg-[#B6B7BC]"></div>
                  <span className="text-[#1F1F1F] font-medium">OR</span>
                  <div className="flex-grow h-px bg-[#B6B7BC]"></div>
                </div>

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full flex items-center justify-center px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] rounded-md hover:bg-gray-50"
                  >
                    <img src={google} alt="google" className="w-5 h-5 mr-3" />
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Apple")}
                    className="w-full flex items-center justify-center px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] rounded-md hover:bg-gray-50"
                  >
                    <img src={apple} alt="apple" className="w-5 h-5 mr-3" />
                    Continue with Apple
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Facebook")}
                    className="w-full flex items-center justify-center px-4 text-[#505050] text-base font-semibold py-3 border border-[#B6B7BC] rounded-md hover:bg-gray-50"
                  >
                    <img src={facebook} alt="facebook" className="w-5 h-5 mr-3" />
                    Continue with Facebook
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:w-3/4 mx-auto">
              <button
                type="submit"
                className="w-full bg-[#C8A8E9] text-[#1F1F1F] py-3 rounded-md font-semibold hover:bg-purple-300"
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

export default UserRegisterPage;
