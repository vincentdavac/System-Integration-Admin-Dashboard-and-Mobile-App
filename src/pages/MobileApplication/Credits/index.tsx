import { ArrowLeft } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface Attendance {
  id: string;
  student_no: string;
  student_name: string;
  section: string;
  time_in: string;
  time_out: string;
  rendered_hours: string;
  createdDate: string;
  createdTime: string;
}

const MobileCredits = () => {
  const { user, token } = useContext(AppContext)!;
  const navigate = useNavigate();
  const [leaveCredits, setLeaveCredits] = useState<number | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

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

  useEffect(() => {
    if (!user?.id) return;

    const fetchLeaveCredits = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/attendance-records/user/${user.employeeNo}/${user.id}`,
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
        console.log('Credits:', data);

        if (!res.ok) {
          console.error('Failed to fetch attendance in credits:', data.message);
          return;
        }

        setAttendance(data?.data || 0);
      } catch (error) {
        console.error('Error fetching leave credits:', error);
      }
    };

    fetchLeaveCredits();
  }, [user?.id]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[180px] relative">
        <img
          src="/ucc_background/ucc_green_background.png" // ✅ background image path
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back Button + Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">LEAVE CREDITS</h1>
        </div>

        {/* Vacation Leave Credits Card */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 bg-white rounded-xl shadow-lg w-[85%] p-4 flex items-center justify-between">
          {/* Left Content */}
          <div className="text-left">
            <p className="text-sm text-gray-500">Leave Credits</p>
            <p className="text-2xl font-bold text-green-700">
              Points: {leaveCredits !== null ? leaveCredits.toFixed(2) : '—'}
            </p>
            <button className="mt-2 bg-green-700 text-white text-sm py-1 px-4 rounded-md">
              Current Credits
            </button>
          </div>

          {/* Right Side Placeholder for image */}
          <div className="w-20 h-20   flex items-center justify-center">
            {/* You can place an image here later */}
            <img
              src="/mobile-icons/credits.png"
              alt="Icon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Space under card */}
      <div className="mt-20 px-4 pb-10">
        {/* Table Title */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Credit History
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-2 px-2 text-left">No.</th>
                <th className="py-2 px-2 text-left">Time In</th>
                <th className="py-2 px-2 text-left">Time Out</th>
                <th className="py-2 px-2 text-left">Remdered Hours</th>
                <th className="py-2 px-2 text-left">Date</th>
              </tr>
            </thead>
            {attendance.length > 0 ? (
              attendance.map((emp, index) => (
                <tbody>
                  <tr key={emp.id || index} className="border-b">
                    <td className="py-2 px-2">{index + 1}</td>
                    <td className="py-2 px-2">{emp.time_in}</td>
                    <td className="py-2 px-2">{emp.time_out}</td>
                    <td className="py-2 px-2">{emp.rendered_hours}</td>
                    <td className="py-2 px-2">{emp.createdDate}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr className="border-b">
                <td
                  className="py-2 px-2 text-center"
                  colSpan={5} // adjust to match number of columns in your table
                >
                  No Credit records Found
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MobileCredits;
