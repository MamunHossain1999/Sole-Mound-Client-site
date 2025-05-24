import React, { useState } from "react";
import dotdot from "../../assets/signUpbgImg/dotdot.png";
import simg from "../../assets/signUpbgImg/simg.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import bangladesh from "../../assets/sellerCountry img/bangladesh.png";
import uk from "../../assets/sellerCountry img/uk.png";
import japan from "../../assets/sellerCountry img/Japan.png";
import toast from "daisyui/components/toast";

const SellerSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "United Kingdom",
    tradeRole: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    firstName: "",
    lastName: "",
    phoneCountry: "1",
    phoneArea: "",
    phoneNumber: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.agree) {
    toast.error("You must agree to the terms and conditions.");
    return;
  }

  console.log("Form Data Submitted:", formData);
  toast.success("Form submitted successfully!");
  navigate("/auth/seller-login-page");
};

  return (
    <div className="w-full flex relative mx-auto min-h-screen bg-gradient-to-b from-[#FAE6F0] to-b-[#FDF6FA] bg-white">
      <img src={dotdot} alt="bg" className="absolute bottom-40 right-64 w-[153px] h-[153px] " />
      <img src={simg} alt="bg" className="absolute top-0 left-18 w-[685px] h-[961px] " />

     <div className="flex  mx-auto ">
         <form
        onSubmit={handleSubmit}
        className="w-full md:w-8/12 mx-auto px-6 flex justify-center mt-12 bg-white shadow rounded-md z-10 relative"
      >
        <div className="w-full mx-auto space-y-5 py-10 ">
          {/* Country select */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 ">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Country / Region:
            </label>
            <div className="relative w-full md:w-3/5 flex items-center gap-2 border border-[#E2E3E8] px-3 py-2 md:py-0.5 rounded">
              <img
                src={
                  formData.country === "United Kingdom"
                    ? uk
                    : formData.country === "Japan"
                    ? japan
                    : bangladesh
                }
                alt="flag"
                className="w-6 h-6 md:w-10 md:h-10"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-[#000000E0] focus:outline-none appearance-none pl-2"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Japan">Japan</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
              <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00000040]" />
            </div>
          </div>

          {/* Trade role */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right ">
              Please select trade role:
            </label>
            <div className="w-full md:w-3/5 flex flex-wrap gap-4 text-sm text-[#000000E0]">
              {["Buyer", "Seller", "Both"].map((role) => (
                <label key={role} className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="radio"
                      name="tradeRole"
                      value={role.toLowerCase()}
                      onChange={handleChange}
                      className="peer hidden"
                    />
                    <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9]               transition-colors">
                    <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                  </div>
                  </div>
                  {role}
                </label>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email will be set as account name"
              className="w-full md:w-3/5 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Set the login password"
              className="w-full md:w-3/5 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Confirm Password 
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your login password again"
              className="w-full md:w-3/5 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              required
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name here"
              className="w-full md:w-3/5 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Full Name
            </label>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/5">
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full md:w-1/2 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              />
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full md:w-1/2 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
              Tel:
            </label>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-3/5">
              <input
                name="phoneCountry"
                type="text"
                value={formData.phoneCountry}
                onChange={handleChange}
                className="w-full md:w-1/6 border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              />
              <input
                name="phoneArea"
                type="text"
                value={formData.phoneArea}
                onChange={handleChange}
                placeholder="Area"
                className="w-full md:w-1/4  border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              />
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full md:w-2/3  border border-[#E2E3E8] px-3 py-3 text-sm rounded-md text-[#505050] focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <label className=" gap-3 text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right mt-1">
                <div className="relative">
                    <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 cursor-pointer appearance-none border-[#C8A8E9]  rounded checked:bg-[#C8A8E9] checked:border-transparent"
                    />
                    <span className="pointer-events-none absolute left-1.5 md:left-52.5 top-[2px] text-white text-xs font-bold peer-checked:block hidden">
                    ✓
                    </span>
                </div>
            </label>


            <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/5">
              <p>
                I agree to the{" "}
              <Link to="/membership-agreement" className="text-[#A8537B]">Free Membership Agreement</Link>,{" "}
              <Link to="/terms-and-conditions" className="text-[#A8537B]">Terms of Use</Link>, and{" "}
              <Link to="/privacy-policy" className="text-[#A8537B]">Privacy Policy</Link> of Sole Mound.
              I also agree to receive more information about its products and services.
              </p>
            </div>
          </div>
         

          {/* Submit */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-18 md:gap-4">
            <label className="text-sm text-[#919191] w-full md:w-[14rem] text-left md:text-right">
             
            </label>
            <button
                type="submit"
                className="w-full md:w-3/5 px-3 bg-[#C8A8E9] hover:bg-purple-300 text-sm font-medium text-[#1F1F1F] py-3 rounded"
            >
                Create an account
            </button>
          </div>
        </div>
      </form>
     </div>
    </div>
  );
};

export default SellerSignUp;
