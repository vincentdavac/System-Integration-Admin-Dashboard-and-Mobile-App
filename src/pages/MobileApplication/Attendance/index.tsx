import { useContext, useEffect, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

// 🧩 Define the shape of an attendance record
interface AttendanceRecord {
  id: number;
  student_no: string;
  student_name: string;
  section: string;
  time_in: string;
  time_out: string;
  rendered_hours: string;
  createdDate: string;
  createdTime: string;
}

const MobileAttendanceHistory = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [filtered, setFiltered] = useState<AttendanceRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch attendance records for the logged-in user
  useEffect(() => {
    if (!user?.employeeNo) return;

    const fetchAttendanceRecords = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/attendance-records/user/${user.employeeNo}`,
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
        console.log('Attendance Records:', data);

        if (!res.ok) {
          console.error('Failed to fetch attendance:', data.message);
          return;
        }

        setAttendance(data?.data || []);
        setFiltered(data?.data || []);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, [user?.employeeNo]);

  // ✅ Search filter by createdDate
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(attendance);
      return;
    }

    const query = search.toLowerCase();
    const filteredData = attendance.filter((record) =>
      record.createdDate.toLowerCase().includes(query),
    );
    setFiltered(filteredData);
  }, [search, attendance]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Header Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back Button + Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">ATTENDANCE</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Date (e.g. September 29, 2025)"
              className="w-full outline-none text-sm text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Attendance History
        </h2>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading attendance records...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-lm">No attendance found.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pb-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                <p className="text-xl font-bold text-gray-900 mb-1">
                  Total Hour/s: {item.rendered_hours}
                </p>
                <p className="text-sm text-gray-600">
                  Time In: {item.time_in} &nbsp;&nbsp; Time Out: {item.time_out}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                  <p>
                    <span className="font-semibold">Date:</span>{' '}
                    {item.createdDate}
                  </p>
                  <p>
                    <span className="font-semibold">Section:</span>{' '}
                    {item.section}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extra bottom space */}
      <div className="h-14"></div>
    </div>
  );
};

export default MobileAttendanceHistory;
