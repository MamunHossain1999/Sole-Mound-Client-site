import React, { useState } from "react";
import loginBgImg from "../../assets/loginImg/Screenshot_1.png";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { auth, googleProvider, facebookProvider, appleProvider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!rememberMe) {
      toast.error("Please check 'Remember Me' to continue.");
      return;
    }

    toast.success("Login successful!");
    console.log({ email, password, rememberMe });
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
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${loginBgImg})` }}
    >
      <div className="flex flex-col md:flex-row max-w-6xl w-full space-x-28 ">
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
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
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
                className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
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
                className="w-full px-3 py-3 border border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <div className="flex items-center relative">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border appearance-none border-[#C8A8E9] rounded checked:bg-purple-600 checked:border-transparent"
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
                className="w-full flex justify-center py-3 px-4 rounded-md text-base font-semibold text-[#1F1F1F] bg-[#C8A8E9] hover:bg-purple-400 focus:outline-none focus:ring-purple-400"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="w-full mx-auto divider before:bg-black after:bg-black text-[#1F1F1F]">
              OR
            </div>

            <div className="flex justify-center space-x-8 mt-4">
              <button onClick={handleAppleLogin}>
                <img className="w-6 h-6" src={apple} alt="apple login" />
              </button>

              <button onClick={handleGoogleLogin}>
                <img className="w-6 h-6" src={google} alt="google login" />
              </button>

              <button onClick={handleFacebookLogin}>
                <img className="w-6 h-6" src={facebook} alt="facebook login" />
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-base text-[#505050]">
              Don't have an account?{" "}
              <span className="font-normal text-[#3CA6FC] hover:text-[#77b9f0] cursor-pointer">
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
