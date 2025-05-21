import React, { useState } from "react";
import bgImg from "../../assets/signUpbgImg/Screenshot_2.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import bangladesh from "../../assets/sellerCountry img/bangladesh.png";
import uk from "../../assets/sellerCountry img/uk.png";
import japan from "../../assets/sellerCountry img/Japan.png";

const SellerSignUp = () => {
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
    // Submit logic here
    console.log("Form Data Submitted:", formData);
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="w-full min-h-screen flex relative ">
      <img
        src={bgImg}
        className="absolute object-cover w-full"
        alt="background img"
      />
      <form
        onSubmit={handleSubmit}
        className="w-8/12 mx-auto px-36 py-22 mt-12 bg-white shadow rounded-md z-10 justify-end"
      >
    <div className="container mx-auto rounded-lg pr-22">
        {/* country select */}
        <div className=" mb-4 relative flex items-center justify-end">
          <label className="w-[150px] text-[#919191] font-normal text-sm">
            Country / Region:
          </label>

          <div className="relative  ">
            <div className="w-2xl flex items-center gap-2 border border-[#E2E3E8] px-3 pr-10 py-1 rounded">
              <img
                src={
                  formData.country === "United Kingdom"
                    ? uk
                    : formData.country === "Japan"
                    ? japan
                    : bangladesh
                }
                alt="flag"
                className="w-10 h-10"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-transparent text-[#000000E0] font-normal pl-3 text-sm focus:outline-none appearance-none"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Japan">Japan</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>

              <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00000040]  cursor-pointer" />
            </div>
          </div>
        </div>

        {/* trade role select */}
        <div className="mb-4 flex items-center justify-end gap-4">
          <label className="block mb-1 font-normal text-[#919191] text-sm">
            Please select trade role:
          </label>
          <div className="w-2xl flex text-[#000000E0] font-normal text-sm gap-4 items-center">
            <label className=" flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  name="tradeRole"
                  value="buyer"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                </div>
              </div>
              Buyer
            </label>

            <label className=" flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  name="tradeRole"
                  value="buyer"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                </div>
              </div>
              Seller
            </label>

            <label className=" flex items-center gap-2">
              <div className="relative">
                <input
                  type="radio"
                  name="tradeRole"
                  value="buyer"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#C8A8E9] peer-checked:border-[#C8A8E9] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                </div>
              </div>
              Both
            </label>
          </div>
        </div>

        {/* email*/}
        <div className="mb-4 flex items-center justify-end gap-4">
          <label
            htmlFor="email"
            className="block text-sm text-[#919191] font-normal mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email will be set as account name"
            value={formData.email}
            onChange={handleChange}
            className="w-2xl border border-[#E2E3E8] px-3 pr-10 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
            required
          />
        </div>

        {/* //password */}
        <div className="mb-4 flex items-center justify-end gap-4">
          <label
            htmlFor="password"
            className="block text-sm text-[#919191] font-normal mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Set the login password"
            value={formData.password}
            onChange={handleChange}
            className="w-2xl border border-[#E2E3E8] px-3 pr-10 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
            required
          />
        </div>

        {/* confirm password */}
        <div className="mb-4 flex items-center justify-end gap-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-[#919191] font-normal mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Enter your login password again"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-2xl border border-[#E2E3E8] px-3 pr-10 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
            required
          />
        </div>

        {/* company name*/}
        <div className="mb-4 flex items-center justify-end gap-4">
          <label
            htmlFor="companyName"
            className="block text-sm text-[#919191] font-normal mb-1"
          >
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="Enter your company name here"
            value={formData.companyName}
            onChange={handleChange}
            className="w-2xl border border-[#E2E3E8] px-3 pr-10 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
          />
        </div>

        {/* full name */}
        <div className=" flex justify-end gap-4 items-center mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm  text-[#919191] font-normal "
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-[20.5rem] border border-[#E2E3E8] px-3 pr-10 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
          />

          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-[20.5rem]  border border-[#E2E3E8] px-3 pr-10 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
          />
        </div>

        {/* phone number */}
        <div className="flex gap-4 mb-4 items-center justify-end">
          <label
            htmlFor="firstName"
            className="block text-sm text-[#919191] font-normal "
          >
            Tel:
          </label>
          <input
            name="phoneCountry"
            type="telephone"
            value={formData.phoneCountry}
            onChange={handleChange}
            className="w-1/8 border border-[#E2E3E8] px-3 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
          />
          -
          <input
            name="phoneArea"
            type="text"
            placeholder="area"
            value={formData.phoneArea}
            onChange={handleChange}
            className="w-1/7 border border-[#E2E3E8] px-3  py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
          />
          -
          <input
            name="phoneNumber"
            type="text"
            placeholder="phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-[34%] border border-[#E2E3E8] px-3 py-3 text-[#000000E0] appearance-none font-normal text-sm rounded focus:border-[#E2E3E8] focus:outline-none"
          />
        </div>

        {/* term and condition  */}
        <div className="flex gap-4 mb-4 items-center justify-end ">
          <label className="flex items-start gap-4 text-sm relative">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="peer h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 appearance-none border-[#C8A8E9]  rounded checked:bg-purple-600 checked:border-transparent"
            />
            <span className="pointer-events-none absolute left-[5px] top-0.5 text-white text-xs font-bold peer-checked:block hidden">
              ✓
            </span>
          </label>
          <span className="text-[#919191] font-normal w-2xl text-sm">
            I agree to the{" "}
            <Link to="/membership-agreement">
              <span className="text-[#A8537B]">Free Membership Agreement,</span>
            </Link>
            <Link to="/terms-and-conditions">
              <span className="text-[#A8537B]">Terms of Use</span>
            </Link>
            , and{" "}
            <Link to="/privacy-policy">
              <span className="text-[#A8537B]">Privacy Policy</span>
            </Link>{" "}
            of Sole Mound. I also agree to receive more information about its
            products and servies.
          </span>
        </div>

        <div className="flex justify-end mt-18">
          <button
            type="submit"
            className="w-2xl bg-[#C8A8E9] hover:bg-purple-300 text-sm font-medium text-[#1F1F1F] py-3 px-4 rounded"
          >
            Create an account
          </button>
        </div>
     </div>   
      </form>
    </div>
  );
};

export default SellerSignUp;
