import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileLeaveRequestView = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[170px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back + Title on left) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/leave')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Leave Request</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-16 w-full text-center">
          <p className="text-base font-semibold text-white">Approved</p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Leave ID */}
        <div className="absolute bottom-4 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> September 14, 2025
          </p>
          <p>
            <span className="font-semibold">Leave ID:</span> 2022041
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-6 px-4 pb-10">
        {/* Leave Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Leave Information
        </h2>

        {/* Leave Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Leave Type</label>
          <input
            type="text"
            value="Vacation Leave"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">From</label>
            <input
              type="text"
              value="December 14, 2025"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="text"
              value="December 15, 2025"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Reason</label>
          <textarea
            readOnly
            value="Vacation Leave"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Upload */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Upload</label>
          <input
            type="text"
            value="images.png"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Human Resource Information
        </h2>

        {/* Validated By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Validated by
          </label>
          <input
            type="text"
            value="Vincent Ahron M. Davac"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Remarks</label>
          <textarea
            readOnly
            value="Passed"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Date Approved */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Date Approved
          </label>
          <input
            type="text"
            value="September 14, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Extra bottom space */}
      <div className="h-12"></div>
    </div>
  );
};

export default MobileLeaveRequestView;
