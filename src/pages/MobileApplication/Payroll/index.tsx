import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobilePayrollHistory = () => {
  const navigate = useNavigate();

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
          <h1 className="text-lg font-semibold">Payroll</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Date"
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Payroll History
        </h2>

        {/* Payroll Cards */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    Net: 20,000.00
                  </p>
                  <p className="text-sm text-gray-600">Employee No. 20220041</p>
                </div>
                <button
                  onClick={() => navigate('/mobile/payroll-view')}
                  className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                >
                  View Now
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <p>
                  <span className="font-semibold">Date:</span> September 14,
                  2025
                </p>
                <p>
                  <span className="font-semibold">Cutoff End:</span> September
                  30, 2025
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* xtra bottom space */}
      <div className="h-14"></div>
    </div>
  );
};

export default MobilePayrollHistory;
