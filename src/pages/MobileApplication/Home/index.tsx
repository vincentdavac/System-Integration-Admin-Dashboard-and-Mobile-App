import React from "react";

const MobileHome = () => {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col items-center relative overflow-hidden">
      <div className="w-full h-1/3 relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-700/60"></div>

     {/* Home Title */}
<div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-base sm:text-lg font-bold">
  Home
</div>

{/* Header Info (below Home) */}
<div className="absolute top-14 left-2 text-white text-[10px] sm:text-xs leading-tight">
  <p>Good morning,</p>
  <p className="font-bold">Vincent Davac</p>
  <p>Account No: 2022041</p>
</div>

{/* Profile (aligned with Home) */}
<div className="absolute top-6 right-2">
  <img
    src="/icons/profile.png"
    alt="User Profile"
    className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
  />
</div>

        {/* 🔹 Date and Time Card */}
        <div className="absolute inset-x-0 top-28 flex flex-col items-center">
          <button className="absolute bottom-16 right-20 px-7 py-0 bg-[#122979] text-white rounded-md text-[9px] font-normal">
            Today
          </button>
          <div className="bg-green-700 h-18 text-white w-11/12 max-w-md rounded-lg shadow p-4 text-center">
            <p className="text-sm font-semibold">September 14, 2025</p>
            <p className="text-[11px] mt-0.9">Time: 4:45PM</p>
          </div>
        </div>
      </div>

    {/* 🔹 Vacation Leave Credits (floating above background) */}
    <div className="absolute top-50 left-1/2 transform -translate-x-1/2 bg-white w-11/12 max-w-sm rounded-lg shadow p-2 z-10 h-30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium">Vacation Leave Credits</p>
          <p className="text-base font-bold">Points: 10.00</p>
        </div>
        <img src="/icons/credits.png" alt="Credits" className="w-8 h-8" />
      </div>
      <button className="mt-2 w-full py-1 bg-green-700 text-white rounded-md text-[10px]">
    View Credits
  </button>
</div>

{/* 🔹 Sections */}
<div className="w-11/12 max-w-sm mt-10 space-y-6 flex-1">
  {/* Payroll */}
  <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
    <div>
      <p className="font-bold text-sm">PAYROLL</p>
      <p className="text-xs mt-1">Update: 2</p>
    </div>
    <img src="/icons/payroll.png" alt="Payroll" className="w-10 h-10" />

    {/* View Button (mas maliit, mas dikit) */}
    <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs">
      View
    </button>
  </div>

  {/* Attendance */}
  <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
    <div>
      <p className="font-bold text-sm">ATTENDANCE</p>
      <p className="text-xs mt-1">Update: 5</p>
    </div>
    <img src="/icons/attendance.png" alt="Attendance" className="w-10 h-10" />

    <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs">
      View
    </button>
  </div>

  {/* Meeting */}
  <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
    <div>
      <p className="font-bold text-sm">MEETING</p>
      <p className="text-xs mt-1">Update: 1</p>
    </div>
    <img src="/icons/meeting.png" alt="Meeting" className="w-10 h-10" />

    <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs">
      View
    </button>
  </div>

  {/* Actions */}
  <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
    <div>
      <p className="font-bold text-sm">ACTIONS</p>
      <p className="text-xs mt-1">Update: 3</p>
    </div>
    <img src="/icons/actions.png" alt="Actions" className="w-10 h-10" />

    <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs">
      View
    </button>
  </div>
</div>

      {/* Footer */}
      <div className="text-[9px] text-gray-500 text-center pb-1">
        Powered by: BS in Information Technology 4C
      </div>
    </div>
  );
};

export default MobileHome;
