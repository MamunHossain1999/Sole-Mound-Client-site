import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import bgOne from "../../assets/userlogin.png";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useLoginUserMutation } from "@/Redux/api/authApi";


const UserLoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  // ✅ RTK Query hook
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
      const res = await loginUser({ email, password }).unwrap();

      console.log("Login response:", res);

      // 👉 চাইলে এখানে user/token store করতে পারো
      // localStorage.setItem("token", res.token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = (): void => {
    toast.info("Google login coming soon");
  };

  const handleFacebookLogin = (): void => {
    toast.info("Facebook login coming soon");
  };

  const handleAppleLogin = (): void => {
    toast.info("Apple login coming soon");
  };

  return (
    <div className="w-full relative bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA] overflow-hidden">
      <img
        src={bgOne}
        alt="bg"
        className="absolute w-full lg:h-auto object-cover md:hidden lg:block"
      />

      <div className="w-full flex items-center justify-center mt-12 md:mt-0 md:min-h-screen px-4 relative">
        <div className="flex flex-col md:flex-row max-w-7xl w-full space-x-28">
          {/* LEFT */}
          <div className="hidden lg:flex md:w-1/2 p-10 flex-col justify-center">
            <h1 className="text-4xl font-bold text-[#EC75AD] mb-4">
              Welcome!
            </h1>
            <p className="text-2xl text-[#EC75AD]">
              Unlock exclusive perks when you log in
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 p-4 mx-auto bg-white rounded-lg shadow-lg z-20 relative">
            <form className="space-y-6 md:mt-12" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full px-3 py-3 border rounded-md"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-4 text-gray-400">
                    <Mail size={18} />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="w-full px-3 py-3 border rounded-md"
                    disabled={isLoading}
                  />
                  <div
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </div>
                </div>
              </div>

              {/* Remember */}
              <div className="flex justify-between">
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

                <Link to="/auth/forgot-password" className="text-blue-500">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#C8A8E9] rounded-md font-semibold disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Social */}
            <div className="mt-6 text-center">OR</div>

            <div className="flex justify-center gap-6 mt-4">
              <img
                src={apple}
                onClick={handleAppleLogin}
                className="w-6 cursor-pointer"
              />
              <img
                src={google}
                onClick={handleGoogleLogin}
                className="w-6 cursor-pointer"
              />
              <img
                src={facebook}
                onClick={handleFacebookLogin}
                className="w-6 cursor-pointer"
              />
            </div>

            {/* Register */}
            <div className="mt-6 text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/register/sign-up" className="text-blue-500">
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

export default UserLoginPage;