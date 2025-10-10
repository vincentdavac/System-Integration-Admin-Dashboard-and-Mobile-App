import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';
interface LeaveRequest {
  id: number;
  leaveId: string;
  reason: string;
  startDate: string;
  endDate: string;
  durationDays: string;
  status: string;
  remarks: string | null;
  createdDate: string;
  createdTime: string;
  leaveTypeInformation: {
    id: number;
    name: string;
    description: string;
  };
}

const MobileLeaveRequest = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext)!;
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [filteredLeaves, setFilteredLeaves] = useState<LeaveRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leave requests
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/my-leave-requests`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setLeaves(data.data || []);
          setFilteredLeaves(data.data || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch leave requests.');
        }
      } catch (err) {
        console.error('Error fetching leave requests:', err);
        setError('An error occurred while fetching leave requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [token]);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLeaves(leaves);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = leaves.filter((leave) =>
      [
        leave.leaveId,
        leave.reason,
        leave.leaveTypeInformation?.name,
        leave.status,
        leave.startDate,
        leave.endDate,
      ].some((field) => field?.toLowerCase().includes(query)),
    );

    setFilteredLeaves(filtered);
  }, [searchQuery, leaves]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col overflow-hidden">
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
          <h1 className="text-lg font-semibold">LEAVE</h1>
        </div>

        {/* Apply Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate('/mobile/leave-apply')}
            className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
          >
            Apply
          </button>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search leave no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Leave Request
        </h2>

        {/* Loading & Error States */}
        {loading && <p className="text-gray-600 text-sm">Loading leaves...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Leave Cards */}
        <div className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-2 rounded-md">
          {filteredLeaves.length === 0 && !loading && (
            <p className="text-gray-500 text-lm ">No leave requests found.</p>
          )}

          {filteredLeaves.map((leave) => (
            <div
              key={leave.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Type + Button */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {leave.leaveTypeInformation?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{' '}
                    <span
                      className={`font-semibold ${
                        leave.status === 'approved'
                          ? 'text-green-600'
                          : leave.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/mobile/leave-view/${leave.id}`)}
                  className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                >
                  View Now
                </button>
              </div>

              {/* Date + Leave ID */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <p>
                  <span className="font-semibold">Date:</span>{' '}
                  {leave.createdDate}
                </p>
                <p>
                  <span className="font-semibold">Leave ID:</span>{' '}
                  {leave.leaveId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra bottom space */}
      <div className="h-10"></div>
    </div>
  );
};

export default MobileLeaveRequest;
