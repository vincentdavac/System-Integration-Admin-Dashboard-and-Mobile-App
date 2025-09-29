import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const MobileProfile = () => {
  const [showContact, setShowContact] = useState(false);
  const [showWork, setShowWork] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Profile Information</h1>
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-16 px-4">
        {/* Personal Information */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-4">
          <h2 className="font-semibold text-gray-700 mb-3">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              defaultValue="John"
              className="p-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              defaultValue="Smith"
              className="p-2 border rounded-md text-sm"
            />
            <input
              type="email"
              placeholder="Email Address"
              defaultValue="vincentadvac@gmail.com"
              className="p-2 border rounded-md text-sm col-span-2"
            />
            <input
              type="text"
              placeholder="Account No."
              defaultValue="20220041-5"
              className="p-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Date Created"
              defaultValue="September 14, 2025"
              className="p-2 border rounded-md text-sm"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowContact(!showContact)}
          >
            <h2 className="font-semibold text-gray-700">Contact Information</h2>
            <span>{showContact ? "−" : "+"}</span>
          </div>
          {showContact && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Mobile Number"
                defaultValue="+63 912 345 6789"
                className="p-2 border rounded-md text-sm col-span-2"
              />
              <input
                type="text"
                placeholder="Home Address"
                defaultValue="Quezon City, Metro Manila"
                className="p-2 border rounded-md text-sm col-span-2"
              />
              <input
                type="text"
                placeholder="Emergency Contact"
                defaultValue="Jane Doe"
                className="p-2 border rounded-md text-sm col-span-2"
              />
            </div>
          )}
        </div>

        {/* Work Information */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowWork(!showWork)}
          >
            <h2 className="font-semibold text-gray-700">Work Information</h2>
            <span>{showWork ? "−" : "+"}</span>
          </div>
          {showWork && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Employee ID"
                defaultValue="EMP-10023"
                className="p-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Department"
                defaultValue="Finance"
                className="p-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Position"
                defaultValue="Accountant"
                className="p-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Date Hired"
                defaultValue="January 10, 2020"
                className="p-2 border rounded-md text-sm"
              />
            </div>
          )}
        </div>

        {/* Password Reset */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">Password Reset</h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="password"
              placeholder="New password"
              className="p-2 border rounded-md text-sm"
            />
            <input
              type="password"
              placeholder="Re-type password"
              className="p-2 border rounded-md text-sm"
            />
          </div>
          <button className="w-full mt-4 bg-[#122979] text-white rounded-md py-2 text-sm">
            Password Reset
          </button>
        </div>

        {/* Logout button */}
        <button className="w-full bg-[#122979] text-white rounded-md py-2 text-sm">
          Logout Account
        </button>
      </div>

      {/* Bottom Space */}
      <div className="h-25"></div>
    </div>
  );
};

export default MobileProfile;
