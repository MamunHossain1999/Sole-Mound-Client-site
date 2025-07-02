import React, { useState } from "react";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import bgOne from "../../assets/userlogin.png";
import { Eye, EyeOff, Mail } from "lucide-react";
import useAuth from "../../hooks/UseAuth";



const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

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
    const result = await handleLogin(email, password);

    if (result.success) {
      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      toast.error(result.message || "Login failed. Try again.");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};


  const handleGoogleLogin = () => {
    // const googleLoginURL = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    // window.location.href = googleLoginURL;
  };

  const handleFacebookLogin = () => toast.info("Facebook login coming soon");
  const handleAppleLogin = () => toast.info("Apple login coming soon");

  return (
    <div className="w-full relative bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] overflow-hidden">
      {/* Background Icons - Added -z-10 to keep them behind */}
      <img src={bgOne} alt="bg" className="absolute w-full lg:h-auto object-cover md:hidden lg:block" />
      
      <div className=" w-full flex items-center justify-center mt-12 md:mt-0 md:min-h-screen px-4 relative ">
        <div className="flex flex-col md:flex-row max-w-7xl w-full space-x-28">
          {/* Left Section */}
          <div className="hidden lg:flex md:w-1/2 p-10 flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#EC75AD] mb-4">Welcome!</h1>
            <p className="text-2xl lg:text-3xl text-[#EC75AD]">Unlock exclusive perks when you log in</p>
          </div>

          {/* Right Section - Increased z-index and opacity */}
          <div className="w-full lg:w-1/2 p-4 mx-auto bg-white bg-opacity-95 md:h-[550px] rounded-lg shadow-lg overflow-hidden z-20 relative">
            <form className="space-y-6 md:mt-12 lg:mt-12" onSubmit={handleSubmit} >
              <div className="mb-4">
                <label htmlFor="email" className="block text-base font-semibold text-[#505050] mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                   
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    required
                  />
                  <div className="absolute right-3 top-4 text-gray-400"><Mail size={18} /></div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                  
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
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

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <div className="flex items-center relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 cursor-pointer appearance-none border-[#C8A8E9] rounded checked:bg-[#C8A8E9] checked:border-transparent"
                  />
                  <span className="pointer-events-none absolute left-[5px] top-1 text-white text-xs font-bold peer-checked:block hidden">✓</span>
                  <label htmlFor="remember-me" className="ml-2 text-base text-[#505050]">Remember me</label>
                </div>
                <Link to="/auth/forgot-password" className="text-base text-[#3CA6FC] hover:text-[#77b9f0]">Forgot Password?</Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center cursor-pointer py-3 px-4 rounded-md text-base font-semibold text-[#1F1F1F] bg-[#C8A8E9] hover:bg-purple-300 focus:outline-none focus:ring-purple-400"
                >
                  Log In
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="w-full mx-auto divider before:bg-[#B6B7BC] after:bg-[#B6B7BC] text-[#1F1F1F]">OR</div>
            </div>

            <div className="flex justify-center space-x-8 mt-4">
              <button onClick={handleAppleLogin}>
                <img className="w-6 h-6 cursor-pointer" src={apple} alt="apple login" />
              </button>
              <button onClick={handleGoogleLogin}>
                <img className="w-6 h-6 cursor-pointer" src={google} alt="google login" />
              </button>
              <button onClick={handleFacebookLogin}>
                <img className="w-6 h-6 cursor-pointer" src={facebook} alt="facebook login" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base text-[#505050]">
                Don't have an account?{" "}
                <Link to="/register/sign-up">
                  <span className="font-normal text-[#3CA6FC] hover:text-[#77b9f0] cursor-pointer">Create Account</span>
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