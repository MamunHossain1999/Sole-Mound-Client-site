import React from "react";
import profile from "../assets/browshistory/card2 (1).png"; 

const Shape = () => {
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center">
      <div className="w-full max-w-6xl flex relative overflow-hidden rounded-xl shadow-lg">
        {/* Left Side */}
        <div className="w-1/2 bg-[#f4f4f4] text-black p-10 relative z-10">
          <h3 className="text-xl">Hi, I am</h3>
          <h1 className="text-4xl font-bold mt-2">Tomasz Gajda</h1>
          <p className="text-gray-700 mt-1">Front-end Developer / UI Designer</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white p-2 rounded-full">@</button>
            <button className="bg-black text-white p-2 rounded-full">G</button>
            <button className="bg-black text-white p-2 rounded-full">in</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-black relative flex items-end justify-center">
          <img
            src={profile}
            alt="Profile"
            className="h-[90%] object-contain z-20"
          />
        </div>

        {/* Diagonal Shape Overlay */}
        <div className="absolute inset-0 z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              fill="#f4f4f4"
              points="0,0 55,0 45,100 0,100"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Shape;
