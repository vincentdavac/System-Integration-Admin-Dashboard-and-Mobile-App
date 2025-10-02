import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileMeetingView = () => {
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
          <button
            onClick={() => navigate('/mobile/meeting-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Relations Meeting</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-14 w-full text-center">
          <p className="text-base font-semibold text-white">Open</p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Case ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> September 14, 2025
          </p>
          <p>
            <span className="font-semibold">Case ID:</span> 2022041
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-10">
        {/* Meeting Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Meeting Information
        </h2>

        {/* Employee Involve */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Employee Involve
          </label>
          <input
            type="text"
            value="Lourine Ashanti Puno"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Case Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Type</label>
          <input
            type="text"
            value="Complaint"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Case Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Title</label>
          <input
            type="text"
            value="Title of Complaint"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Details</label>
          <textarea
            readOnly
            value="Details of Complaint"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* Relations Meeting Section */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Relations Meeting
        </h2>

        {/* Meeting Date */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Meeting Date
          </label>
          <input
            type="text"
            value="September 15, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Meeting Time */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Meeting Time
          </label>
          <input
            type="text"
            value="10:00 AM"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value="Caloocan City"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Participants */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Participants
          </label>
          <input
            type="text"
            value="Guidance Office"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Notes</label>
          <textarea
            readOnly
            value="Notes in the meetings"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>
      </div>

      {/* Bottom Space */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobileMeetingView;
