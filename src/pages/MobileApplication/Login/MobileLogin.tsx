import React from "react";

const MobileLogin = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center relative shadow-lg overflow-hidden">

      {/* Background Image (Top Half) */}
      <div className="w-full h-1/2 relative">
        <img
          src="/ucc_background/ucc_green_background.png" // 🔹 background image path
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Green overlay */}
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            University of Caloocan City
          </h1>
          <p className="text-sm sm:text-base">
            Human Resource Management System
          </p>
        </div>
      </div>

      {/* Overlapping Logo */}
      <div className="relative -mt-12 z-10">
        <img
          src="/icons/ucc_logo.png" // 🔹 logo path
          alt="Logo"
          className="w-24 h-24 sm:w-28 sm:h-28"
        />
      </div>

      {/* Login Form */}
      <div className="w-4/5 max-w-sm mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="yourname@email.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="********"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-6"
        />

        <button className="w-full py-2 bg-[#122979] text-white rounded-md font-medium hover:bg-[#0f1f5c] transition">
          Submit
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-500 text-center px-2">
        Powered by: <br />
        BS in Information Technology 4C
      </div>
    </div>
  );
};

export default MobileLogin;
