import React, { useState } from "react";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import bgOne from '../../assets/loginImg/bg-1.png';
import bgTwo from '../../assets/loginImg/bg-2.png';
import bgThree from '../../assets/loginImg/bg-3.png';
import bgFour from '../../assets/loginImg/bg-4.png';
import bgFive from '../../assets/loginImg/bg-5.png';
import bgSix from '../../assets/loginImg/bg-6.png';
import bgSeven from '../../assets/loginImg/bg-7.png';
import bgEight from '../../assets/loginImg/bg-8.png';
import axios from "axios";


const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
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
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    if (response.data.success) {
      toast.success("Login successful!");
      navigate("/", { replace: true });
    } else {
      toast.error("Login failed. Try again.");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};


  // google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Logged in as ${result.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   facebook login
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      toast.success(`Logged in as ${result.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   apple login
  const handleAppleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      toast.success(`Logged in as ${result.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#FAE6F0] to-b-[#FDF6FA] min-h-screen">
      {/* Background Icons */}
      <img src={bgOne} alt="bg" className="absolute top-5 left-5 w-[120.68px] h-[109.72px] " />
      <img src={bgTwo} alt="bg" className="absolute top-40 left-95 w-[110px] h-[103px]" />
      <img src={bgThree} alt="bg" className="absolute top-25  left-3/6 w-[127px] h-[108px]" />
      <img src={bgFour} alt="bg" className="absolute top-10 right-40 w-[278px] h-[220px]" />
      <img src={bgFive} alt="bg" className="absolute top-3/5 left-0 w-[145px] h-[124px] " />
      <img src={bgSix} alt="bg" className="absolute top-1/2 left-[20%] w-[290px] h-[202px]" />
      <img src={bgSeven} alt="bg" className="absolute top-2/3 left-[47%] w-[128px] h-[97px]" />
      <img src={bgEight} alt="bg" className="absolute bottom-[25%] right-[13%] w-[116px] h-[110px]" />

      <div
        className="h-[600px] md:h-[850px] w-full bg-cover flex items-center justify-center px-4"
        
      >
        <div className="flex flex-col md:flex-row max-w-7xl w-full space-x-28 ">
          {/* Left Section */}
          <div className="hidden md:flex md:w-1/2 p-10 flex-col justify-center ">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#EC75AD] mb-4">
              Welcome!
            </h1>
            <p className="text-2xl lg:text-3xl text-[#EC75AD]">
              Unlock exclusive perks when you log in
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden z-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-[#474B57] mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-semibold text-[#474B57]"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <div className="flex items-center relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 cursor-pointer appearance-none border-[#C8A8E9]  rounded checked:bg-purple-600 checked:border-transparent"
                  />
                  <span className="pointer-events-none absolute left-[5px] top-1 text-white text-xs font-bold peer-checked:block hidden">
                    ✓
                  </span>
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-base text-[#505050]"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/authintication/forgot-password"
                  className="text-base text-[#3CA6FC] hover:text-[#77b9f0]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center cursor-pointer py-3 px-4 rounded-md text-base font-semibold text-[#1F1F1F] bg-[#C8A8E9] hover:bg-purple-400 focus:outline-none focus:ring-purple-400"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* divider */}
            <div className="mt-6">
              <div className="w-full mx-auto divider before:bg-[#B6B7BC] after:bg-[#B6B7BC] text-[#1F1F1F]">
                OR
              </div>

              <div className="flex justify-center space-x-8 mt-4">
                <button onClick={handleAppleLogin}>
                  <img
                    className="w-6 h-6 cursor-pointer"
                    src={apple}
                    alt="apple login"
                  />
                </button>

                <button onClick={handleGoogleLogin}>
                  <img
                    className="w-6 h-6 cursor-pointer"
                    src={google}
                    alt="google login"
                  />
                </button>

                <button onClick={handleFacebookLogin}>
                  <img
                    className="w-6 h-6 cursor-pointer"
                    src={facebook}
                    alt="facebook login"
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base text-[#505050]">
                Don't have an account?{" "}
                <Link to='/register/sign-up'>
                    <span className="font-normal text-[#3CA6FC] hover:text-[#77b9f0] cursor-pointer">
                    Create Account
                    </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
