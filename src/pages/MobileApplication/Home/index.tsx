import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MobileHome = () => {
  const { user, token } = useContext(AppContext)!;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  // Update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date: September 14, 2025
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time: 4:45 PM
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

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
          <p>Good Morning,</p>
          <p className="font-bold">{user?.fullName}</p>
          <p>Employee No: {user?.employeeNo} </p>
        </div>

        {/* Profile (aligned with Home) */}
        <div className="absolute top-6 right-2">
          <img
            src={`https://fjp.ucc.bsit4c.com/${user?.image}`}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
          />
        </div>

        {/* 🔹 Date and Time Card */}
        <div className="absolute inset-x-0 top-28 flex flex-col items-center">
          <button className="absolute bottom-16 right-20 px-7 py-0 bg-[#122979] text-white rounded-md text-[9px] font-normal z-10 mb-5">
            Today
          </button>
          <div className="backdrop-blur-md bg-green-700/40 h-24 text-white w-11/12 max-w-md rounded-2xl shadow-lg p-6 text-center border border-white/20">
            <p className="text-2xl font-semibold">{formattedDate}</p>
            <p className="text-xl mt-2">{formattedTime}</p>
          </div>
        </div>
      </div>

      {/* 🔹 Vacation Leave Credits (floating above background) */}
      <div className="absolute mt-5 mb-5 top-50 left-1/2 transform -translate-x-1/2 bg-white w-11/12 max-w-sm rounded-lg shadow p-2 z-10 h-30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-medium">Leave Credits</p>
            <p className="text-[20px] font-bold">Points: 10.00</p>
          </div>
          <img
            src="/mobile-icons/credits.png"
            alt="Credits"
            className="w-18 h-18 mr-2"
          />
        </div>
        <button
          onClick={() => navigate('/mobile/credits')}
          className="mt-2 w-full py-1 bg-green-700 text-white rounded-md text-[15px]"
        >
          View Credits
        </button>
      </div>

      {/* 🔹 Sections */}
      <div className="w-11/12 max-w-sm mt-13 space-y-6 flex-1">
        {/* Payroll */}
        <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
          <div>
            <p className="font-bold text-sm">PAYROLL</p>
            <p className="text-xs mt-1">Update: 2</p>
          </div>
          <img
            src="/mobile-icons/payroll.png"
            alt="Payroll"
            className="w-18 h-18 mr-2"
          />

          {/* View Button (mas maliit, mas dikit) */}
          <button
            onClick={() => navigate('/mobile/payroll-history')}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs"
          >
            View
          </button>
        </div>

        {/* Attendance */}
        <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
          <div>
            <p className="font-bold text-sm">ATTENDANCE</p>
            <p className="text-xs mt-1">Update: 5</p>
          </div>
          <img
            src="/mobile-icons/attendance.png"
            alt="Attendance"
            className="w-18 h-18 mr-2"
          />

          <button
            onClick={() => navigate('/mobile/attendance-history')}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs"
          >
            View
          </button>
        </div>

        {/* Meeting */}
        <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
          <div>
            <p className="font-bold text-sm">MEETING</p>
            <p className="text-xs mt-1">Update: 1</p>
          </div>
          <img
            src="/mobile-icons/meeting.png"
            alt="Meeting"
            className="w-18 h-18 mr-2"
          />

          <button
            onClick={() => navigate('/mobile/meeting-history')}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs"
          >
            View
          </button>
        </div>

        {/* Actions */}
        <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
          <div>
            <p className="font-bold text-sm">ACTIONS</p>
            <p className="text-xs mt-1">Update: 3</p>
          </div>
          <img
            src="/mobile-icons/actions.png"
            alt="Actions"
            className="w-18 h-18 mr-2"
          />

          <button
            onClick={() => navigate('/mobile/actions-history')}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-[#122979] rounded-md text-xs"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
