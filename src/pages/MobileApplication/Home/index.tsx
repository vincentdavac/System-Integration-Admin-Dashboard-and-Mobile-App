import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../config/api';

const MobileHome = () => {
  const { user, token } = useContext(AppContext)!;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [leaveCredits, setLeaveCredits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate(`/mobile/login`);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/notifications/user/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );
        const data = await res.json();

        if (res.ok && data?.data?.unread_summary) {
          const totalUnread = Object.values(data.data.unread_summary).reduce(
            (sum: number, val: any) => sum + (Number(val) || 0),
            0,
          );
          setUnreadCount(totalUnread);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  // 💳 Fetch User Leave Credits
  useEffect(() => {
    if (!user?.id) return;

    const fetchLeaveCredits = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/credits/${user.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        const data = await res.json();
        console.log('Credits:', data);

        if (!res.ok) {
          console.error('Failed to fetch leave credits:', data.message);
          return;
        }

        setLeaveCredits(data?.data?.totalCredits || 0);
      } catch (error) {
        console.error('Error fetching leave credits:', error);
      }
    };

    fetchLeaveCredits();
  }, [user?.id]);

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
      <div className="w-full min-h-[200px] sm:min-h-[240px] relative">
        {/* 🔹 Background Image */}
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-[220px] object-cover min-h-[220px] sm:min-h-[240px]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* 🔹 HOME Title */}
        <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base font-bold whitespace-nowrap">
          HOME
        </div>

        {/* 🔹 Header Info */}
        <div className="absolute top-9 sm:top-12 left-3 sm:left-4 text-white text-xs sm:text-sm leading-tight">
          <p>Good Day,</p>
          <p className="font-bold text-xs sm:text-sm">{user?.fullName}</p>
          <p className="text-[11px] sm:text-xs">
            Employee No: {user?.employeeNo}
          </p>
        </div>

        {/* 🔹 Profile + Notification Icons */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2 sm:gap-3">
          {/* Notification Icon */}
          <button
            onClick={() => navigate('/mobile/notifications')}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          </button>

          {/* User Profile Image */}
          <img
            src={`https://fjp.ucc.bsit4c.com/${user?.image}`}
            alt="User Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-md object-cover"
          />
        </div>

        {/* 🔹 Date and Time Card */}
        <div className="absolute inset-x-0 top-22 sm:top-20 flex flex-col items-center">
          <button
            disabled
            className="absolute -top-3 sm:-top-4 right-4 sm:right-6 px-2 sm:px-3 py-1 bg-[#122979] text-white rounded text-[10px] sm:text-xs font-medium z-10"
          >
            Today
          </button>
          <div className="backdrop-blur-md bg-green-700/40 h-14 sm:h-16 text-white w-11/12 max-w-xs sm:max-w-sm rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 text-center border border-white/20">
            <p className="text-sm sm:text-base font-semibold">
              {formattedDate}
            </p>
            <p className="text-xs sm:text-sm mt-0.5 sm:mt-1">{formattedTime}</p>
          </div>
        </div>

        {/* 🔹 Leave Credits Card */}
        <div
          className="absolute top-40 sm:top-24 left-1/2 transform -translate-x-1/2 
    bg-white w-11/12 max-w-xs sm:max-w-sm rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 z-10"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">Leave Credits</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                Points: {leaveCredits !== null ? leaveCredits.toFixed(2) : '—'}
              </p>
            </div>
            <img
              src="/mobile-icons/credits.svg"
              alt="Credits"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>

          <button
            onClick={() => navigate('/mobile/credits')}
            className="w-full py-2 bg-green-700 hover:bg-green-600 text-white font-medium rounded text-xs sm:text-sm transition-all"
          >
            View Credits
          </button>
        </div>
      </div>

      {/* 🔹 Sections */}
      <div className="w-11/12 max-w-sm mt-16 mb-14 flex-1 h-[650px] overflow-y-auto rounded-lg p-2">
        <div className="grid grid-cols-2 gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {/* Payroll */}
          <div className="bg-green-700 rounded-xl shadow-lg flex flex-col justify-between p-3 h-24 text-white transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">EMPLOYEE PAYROLL</p>
              <img
                src="/mobile-icons/payroll.svg"
                alt="Payroll"
                className="w-12 h-12"
              />
            </div>
            <button
              onClick={() => navigate('/mobile/payroll-history')}
              className="w-full py-1 bg-[#122979] rounded-md text-xs shadow-md hover:bg-[#0e1f5c] transition"
            >
              View
            </button>
          </div>

          {/* Attendance */}
          <div className="bg-green-700 rounded-xl shadow-lg flex flex-col justify-between p-3 h-24 text-white transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">DAILY ATTENDANCE</p>
              <img
                src="/mobile-icons/attendance.svg"
                alt="Attendance"
                className="w-12 h-12"
              />
            </div>
            <button
              onClick={() => navigate('/mobile/attendance-history')}
              className="w-full py-1 bg-[#122979] rounded-md text-xs shadow-md hover:bg-[#0e1f5c] transition"
            >
              View
            </button>
          </div>

          {/* Meeting */}
          <div className="bg-green-700 rounded-xl shadow-lg flex flex-col justify-between p-3 h-24 text-white transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">RELATION MEETING</p>
              <img
                src="/mobile-icons/meeting.svg"
                alt="Meeting"
                className="w-12 h-12"
              />
            </div>
            <button
              onClick={() => navigate('/mobile/meeting-history')}
              className="w-full py-1 bg-[#122979] rounded-md text-xs shadow-md hover:bg-[#0e1f5c] transition"
            >
              View
            </button>
          </div>

          {/* Actions */}
          <div className="bg-green-700 rounded-xl shadow-lg flex flex-col justify-between p-3 h-24 text-white transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">RELATION ACTION</p>
              <img
                src="/mobile-icons/actions.svg"
                alt="Actions"
                className="w-12 h-12"
              />
            </div>
            <button
              onClick={() => navigate('/mobile/actions-history')}
              className="w-full py-1 bg-[#122979] rounded-md text-xs shadow-md hover:bg-[#0e1f5c] transition"
            >
              View
            </button>
          </div>

          {/* COE */}
          <div className="bg-green-700 rounded-xl shadow-lg flex flex-col justify-between p-3 h-24 text-white transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">EMPLOYEE CERTIFICATION</p>
              <img
                src="/mobile-icons/coe.svg"
                alt="Actions"
                className="w-12 h-12"
              />
            </div>
            <button
              onClick={() => navigate('/mobile/coe-history')}
              className="w-full py-1 bg-[#122979] rounded-md text-xs shadow-md hover:bg-[#0e1f5c] transition"
            >
              View
            </button>
          </div>

          {/* OFFICIAL BUSINESS */}
          <div className="bg-green-700 rounded-xl shadow-lg flex flex-col justify-between p-3 h-24 text-white transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">OFFICIAL BUSINESS</p>
              <img
                src="/mobile-icons/official-business.svg"
                alt="Actions"
                className="w-12 h-12"
              />
            </div>
            <button
              onClick={() => navigate('/mobile/ob-history')}
              className="w-full py-1 bg-[#122979] rounded-md text-xs shadow-md hover:bg-[#0e1f5c] transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
