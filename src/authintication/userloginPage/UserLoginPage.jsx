import React, { useContext, useState } from "react";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import bgOne from "../../assets/loginImg/bg-1.png";
import bgTwo from "../../assets/loginImg/bg-2.png";
import bgThree from "../../assets/loginImg/bg-3.png";
import bgFour from "../../assets/loginImg/bg-4.png";
import bgFive from "../../assets/loginImg/bg-5.png";
import bgSix from "../../assets/loginImg/bg-6.png";
import bgSeven from "../../assets/loginImg/bg-7.png";
import bgEight from "../../assets/loginImg/bg-8.png";
import { Eye, EyeOff, Mail } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  // Email/password login handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!rememberMe) {
      toast.error("Please check 'Remember Me' to continue.");
      return;
    }

      const result = await handleLogin(email, password);

      if (result.success) {
        toast.success("Login successful!");
        navigate("/", { replace: true });
      } else {
         toast.error(result.message || "Login failed. Try again.");
      }
   
  };

  // Google login handler
  const handleGoogleLogin = () => {
    const googleLoginURL = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    window.location.href = googleLoginURL;
  };

  // Facebook & Apple login placeholders 
  const handleFacebookLogin = () => toast.info("Facebook login coming soon");
  const handleAppleLogin = () => toast.info("Apple login coming soon");

  return (
    <div className="relative bg-gradient-to-b from-[#FAE6F0] to-b-[#FDF6FA] min-h-screen">
      {/* Background icons */}
      <img src={bgOne} alt="bg" className="absolute top-5 left-5 w-[120.68px] h-[109.72px]" />
      <img src={bgTwo} alt="bg" className="absolute top-40 left-95 w-[110px] h-[103px]" />
      <img src={bgThree} alt="bg" className="absolute top-25 left-3/6 w-[127px] h-[108px]" />
      <img src={bgFour} alt="bg" className="absolute top-10 right-40 w-[278px] h-[220px]" />
      <img src={bgFive} alt="bg" className="absolute top-3/5 left-0 w-[145px] h-[124px]" />
      <img src={bgSix} alt="bg" className="absolute top-1/2 left-[20%] w-[290px] h-[202px]" />
      <img src={bgSeven} alt="bg" className="absolute top-2/3 left-[47%] w-[128px] h-[97px]" />
      <img src={bgEight} alt="bg" className="absolute bottom-[25%] right-[13%] w-[116px] h-[110px]" />

      <div className="h-[600px] md:h-[850px] w-full bg-cover flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row max-w-7xl w-full space-x-28 ">
          {/* Left section */}
          <div className="hidden md:flex md:w-1/2 p-10 flex-col justify-center ">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#EC75AD] mb-4">Welcome!</h1>
            <p className="text-2xl lg:text-3xl text-[#EC75AD]">Unlock exclusive perks when you log in</p>
          </div>

          {/* Right section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden z-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 cursor-pointer appearance-none border-[#C8A8E9]  rounded checked:bg-[#C8A8E9] checked:border-transparent"
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

            {/* divider */}
            <div className="mt-6">
              <div className="w-full mx-auto divider before:bg-[#B6B7BC] after:bg-[#B6B7BC] text-[#1F1F1F]">OR</div>
            </div>

            {/* Social login buttons */}
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
