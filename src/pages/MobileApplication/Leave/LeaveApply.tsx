import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileLeaveApply = () => {
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
          <button onClick={() => navigate('/mobile/leave')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Apply Leave</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-6 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Leave Request Information
        </h2>

        {/* Leave Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Leave Type</label>
          <select className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none">
            <option>Choose...</option>
            <option>Vacation Leave</option>
            <option>Sick Leave</option>
            <option>Maternity Leave</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">From</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
            />
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Reason</label>
          <textarea
            placeholder="Reason"
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Upload */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Upload</label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[#2D3F99] text-white py-2 rounded-md font-medium text-sm">
          Submit
        </button>
      </div>

      {/* Extra bottom space */}
      <div className="h-10"></div>
    </div>
  );
};

export default MobileLeaveApply;
