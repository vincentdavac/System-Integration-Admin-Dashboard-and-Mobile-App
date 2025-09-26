import UCCLogo from '/icons/ucc_logo.png';

interface ViewMeetingModalProps {
  onClose: () => void;
}

export default function ViewMeetingModal({ onClose }: ViewMeetingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src={UCCLogo} alt="Logo" width={55} className="drop-shadow" />
            <div className="leading-tight">
              <h1 className="font-bold text-sm text-white">
                UNIVERSITY OF CALOOCAN CITY
              </h1>
              <p className="text-xs text-white">South Campus</p>
            </div>
          </div>
          <button className="text-white text-2xl font-bold" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 font-serif leading-relaxed text-gray-800">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center">
            EMPLOYEE MEETING SCHEDULE
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Case No.</p>
              <p className="font-semibold text-sm">2025-0001</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Case Type</p>
              <p className="font-semibold text-sm">Dispute</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Person Involved</p>
              <p className="font-semibold text-sm">Full Name Person Invoved</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Reported By</p>
              <p className="font-semibold text-sm">Reported By</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Case Title</p>
              <p className="font-semibold text-sm">Title</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-sm text-yellow-700">Open</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500">Details</p>
              <p className="font-semibold text-sm">Details</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Date Reported</p>
              <p className="font-semibold text-sm">Sept. 24, 2025</p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6">
            MEETING INFORMATION
          </h3>

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Case ID</p>
              <p className="font-semibold text-sm">2025-0001</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Schedule Date</p>
              <p className="font-semibold text-sm">Sept 26, 2025</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Schedule Time</p>
              <p className="font-semibold text-sm">8:00 AM</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Meeting Location</p>
              <p className="font-semibold text-sm">Caloocan City</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500">Notes</p>
              <p className="font-semibold text-sm">Be on time</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Scheduled By</p>
              <p className="font-semibold text-sm">Davac, Vincent Ahron</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Scheduled At</p>
              <p className="font-semibold text-sm">September 26, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
