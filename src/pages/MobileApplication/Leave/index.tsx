import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileLeaveRequest = () => {
  const navigate = useNavigate();

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
          {/* <button className="mr-2">
            <ArrowLeft size={24} />
          </button> */}
          <h1 className="text-lg font-semibold">Leave</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search leave no..."
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
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
      </div>

      {/* Content starts overlapping background */}
      <div className="mt-12 px-4 pb-10">
        {/* Leave Request Title */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Leave Request
        </h2>

        {/* Leave Request Cards */}
        <div className="space-y-4">
          {[
            { type: 'Vacation Leave', status: 'Pending Approval' },
            { type: 'Maternity Leave', status: 'Approved' },
            { type: 'Sick Leave', status: 'Cancelled' },
            { type: 'Vacation Leave', status: 'Pending Approval' },
          ].map((leave, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Type + Button */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {leave.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {leave.status}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/mobile/leave-view')}
                  className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                >
                  View Now
                </button>
              </div>

              {/* Date + Leave ID */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <p>
                  <span className="font-semibold">Date:</span> September 14,
                  2025
                </p>
                <p>
                  <span className="font-semibold">Leave ID:</span> 2022041
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
