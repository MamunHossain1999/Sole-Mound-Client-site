import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import simg from "../../assets/signUpbgImg/simg.png";
import dotdot from "../../assets/signUpbgImg/dotdot.png";
import apple from "../../assets/loginImg/apple.png";
import google from "../../assets/loginImg/google.png";
import facebook from "../../assets/loginImg/facebook.png";

import { useSignupUserMutation } from "@/Redux/api/authApi";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  agree: boolean;
  role: string;
}

const UserRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupUserMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    agree: false,
    role: "customer",
  });

  // input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { name, email, password, agree } = formData;

    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (!agree) {
      toast.error("Please accept Terms & Conditions.");
      return;
    }

    try {
      await signup({
        name,
        email,
        password,
        role: "customer",
      }).unwrap();

      toast.success("Signup successful!");
      navigate("/auth/login-page", { replace: true });

    } catch (error: any) {
      toast.error(error?.data?.message || "Signup failed");
    }
  };

  const handleSocialLogin = (platform: string): void => {
    toast.info(`${platform} sign-in not implemented yet.`);
  };

  return (
    <div className="w-full flex relative min-h-screen bg-gradient-to-b from-[#FAE6F0] to-[#FDF6FA]">

      {/* Background */}
      <img src={dotdot} alt="bg" className="absolute bottom-40 right-64 w-[153px] h-[153px]" />
      <img src={simg} alt="bg" className="absolute top-0 left-18 w-[685px] h-[961px]" />

      <div className="container mx-auto flex justify-center items-center">
        <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-6 md:p-12 z-10">

          <h2 className="text-[28px] font-medium text-center mb-6">
            Create your account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* LEFT */}
              <div>
                {/* Name */}
                <div className="mb-4">
                  <label className="font-semibold mb-1 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border rounded-md"
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="font-semibold mb-1 block">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border rounded-md"
                      disabled={isLoading}
                    />
                    <div className="absolute right-3 top-4 text-gray-400">
                      <Mail size={18} />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="font-semibold mb-1 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border rounded-md"
                      disabled={isLoading}
                    />
                    <div
                      className="absolute right-3 top-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <p className="text-sm">I agree to Terms & Conditions</p>
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <div className="flex items-center gap-4 pb-6">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span>OR</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <div className="space-y-4">
                  {[{ img: google, name: "Google" }, { img: apple, name: "Apple" }, { img: facebook, name: "Facebook" }].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleSocialLogin(item.name)}
                      className="w-full flex items-center justify-center py-3 border rounded-md"
                      disabled={isLoading}
                    >
                      <img src={item.img} className="w-5 h-5 mr-2" />
                      Continue with {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C8A8E9] py-3 rounded-md font-semibold disabled:opacity-50"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            {/* Login */}
            <div className="mt-4 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/auth/login-page" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;