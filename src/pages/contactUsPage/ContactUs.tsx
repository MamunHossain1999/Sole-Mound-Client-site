import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import contactLogo from "../../assets/contactPage/Group 124 (1).png";
import { toast } from "react-toastify";

import { Mail, MapPin, Phone, Bell } from "lucide-react";

const iconMap = {
  Phone: <Phone className="h-5 w-5 text-pink-500" />,
  Mail: <Mail className="h-5 w-5 text-blue-500" />,
  MapPin: <MapPin className="h-5 w-5 text-yellow-500" />,
  Bell: <Bell className="h-5 w-5 " />,
};

const fetchContactData = async () => {
  const res = await axios.get("/contactData.json");
  return res.data;
};

const ContactUs = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["contactData"],
    queryFn: fetchContactData,
  });

  // send mail
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await axios.post("/api/contact", formData);
      if (res.status === 200) {
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FDF1F7] py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#101750]">Contact Us</h1>
          <div className="flex items-center text-sm mt-1">
            <a href="/" className="text-[#000000] text-base font-semibold">
              Home
            </a>
            <span className="mx-2 text-gray-400">{">"}</span>
            <a href="#" className="text-[#000000] text-base font-semibold">
              Pages
            </a>
            <span className="mx-2 text-gray-400">{">"}</span>
            <span className="text-[#FB2E86] text-base font-semibold">
              Contact Us{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Info About Us */}
            <div>
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
                {data.infoAboutUs.title}
              </h2>
              <p className="text-[#505050] text-base font-normal mb-6">
                {data.infoAboutUs.description}
              </p>
              <div className="flex space-x-4">
                {data?.infoAboutUs?.colors?.map((color, i) => (
                  <div
                    key={i}
                    className="w-[17px] h-[18px] rounded-full mt-2"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Get in Touch */}
            <div>
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
                {data.getInTouch.title}
              </h2>
              <p className="text-[#505050] font-semibold text-base mb-6">
                {data.getInTouch.description}
              </p>

              {/* send mail */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex gap-4 text-[#505050]">
                    <input
                      name="name"
                      placeholder={data.getInTouch.fields[0]}
                     className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    />
                    <input
                      name="email"
                      placeholder={data.getInTouch.fields[1]}
                      className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                    />
                  </div>
                  <input
                    name="subject"
                    placeholder={data.getInTouch.fields[2]}
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  />
                  <textarea
                    name="message"
                    placeholder={data.getInTouch.fields[3]}
                    className="w-full px-3 py-3 border cursor-pointer border-[#B6B7BC] rounded-md text-[#505050] text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#C8A8E9] hover:bg-purple-400 text-[#1F1F1F] px-6 py-2 rounded-md"
                  >
                    Send Mail
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            {/* Contact Way */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
                Contact Way
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.contactWays?.map((way, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className="p-2.5 rounded-full"
                      style={{ backgroundColor: way.bgColor }}
                    >
                      {iconMap[way.icon]}
                    </div>
                    <div>
                      {way?.lines?.map((line, i) => (
                        <p key={i} className="text-[#505050] text-base">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex py-6">
              <img
                src={contactLogo}
                alt="Contact"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
