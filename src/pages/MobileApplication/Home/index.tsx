import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MobileHome = () => {
  const { user, token } = useContext(AppContext)!;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [leaveCredits, setLeaveCredits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/mobile/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications/user/${user.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
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
        const res = await fetch(`/api/credits/${user.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
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
          HOME
        </div>

        {/* Header Info (below Home) */}
        <div className="absolute mb-2 top-14 left-2 text-white text-[12px] sm:text-sm leading-snug">
          <p>Good Day,</p>
          <p className="font-bold text-[13px] sm:text-base">{user?.fullName}</p>
          <p>Employee No: {user?.employeeNo}</p>
        </div>

        {/* Profile and Notification Icon (aligned with Home) */}
        <div className="absolute top-6 right-2 flex items-center gap-3">
          {/* Notification Icon */}
          <button
            onClick={() => navigate('/mobile/notifications')}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
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
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          </button>

          {/* User Profile Image */}
          <img
            src={`https://fjp.ucc.bsit4c.com/${user?.image}`}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
          />
        </div>

        {/* 🔹 Smaller Date and Time Card */}
        <div className="absolute inset-x-0 top-28 flex flex-col items-center">
          <button
            disabled
            className="absolute bottom-13 right-16 px-4 py-[2px] bg-[#122979] text-white rounded-md text-[8px] font-medium z-10 mb-3"
          >
            Today
          </button>
          <div className="backdrop-blur-md bg-green-700/40 h-20 text-white w-10/12 max-w-sm rounded-xl shadow-md p-4 text-center border border-white/20">
            <p className="text-lg font-semibold">{formattedDate}</p>
            <p className="text-sm mt-1">{formattedTime}</p>
          </div>
        </div>
      </div>

      {/* 🔹 Vacation Leave Credits (floating above background) */}
      <div className="absolute  mb-5 top-50 left-1/2 transform -translate-x-1/2 bg-white w-11/12 max-w-sm rounded-lg shadow p-2 z-10 h-30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-medium">Leave Credits</p>
            <p className="text-[20px] font-bold">
              Points: {leaveCredits !== null ? leaveCredits.toFixed(2) : '—'}
            </p>
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
      <div className="w-11/12 max-w-sm mt-9 flex-1 h-[600px] overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg p-2">
        {/* Payroll */}
        <div className="bg-green-700 rounded-lg shadow flex items-center justify-between p-3 h-24 text-white relative pb-4">
          <div>
            <p className="font-bold text-sm">PAYROLL</p>
            {/* <p className="text-xs mt-1">Update: 0</p> */}
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
            {/* <p className="text-xs mt-1">Update: 5</p> */}
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
            {/* <p className="text-xs mt-1">Update: 1</p> */}
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
            <p className="font-bold text-lm">ACTIONS</p>
            {/* <p className="text-xs mt-1">Update: 3</p> */}
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
