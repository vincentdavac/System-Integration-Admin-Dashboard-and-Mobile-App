import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';

interface UpdateLeaveRequestModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function UpdateLeaveRequestModal({
  onClose,
  isOpen,
}: UpdateLeaveRequestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2D3F99] text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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
            LEAVE REQUEST APPROVAL
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Employee No.</p>
              <p className="font-semibold text-sm">2025-0001</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Employee Name</p>
              <p className="font-semibold text-sm">Davac, Vincent Ahron M.</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold text-sm">IT Department</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-semibold text-sm">Developer</p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6">
            LEAVE INFORMATION
          </h3>

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-semibold text-sm">Sept 26, 2025</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-semibold text-sm">Sept 26, 2025</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Day/s</p>
              <p className="font-semibold text-sm">5</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Leave Type</p>
              <p className="font-semibold text-sm">Vacation Leave</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500">Reason</p>
              <p className="font-semibold text-sm">Be on time</p>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-500">Attachment:</p>
              <a target="_blank" rel="noopener noreferrer">
                <img
                  alt="Attached Document"
                  className="w-40 h-40 object-cover border rounded-lg shadow-sm cursor-pointer hover:opacity-90"
                />
              </a>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6">
            APPROVAL INFORMATION
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Status</label>
              <select
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                defaultValue="Update Status"
              >
                <option value="pending" className="text-yellow-700">
                  Pending
                </option>
                <option value="approved" className="text-green-700">
                  Approved
                </option>
                <option value="rejected" className="text-red-700">
                  Rejected
                </option>
              </select>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm col-span-2">
              <label className="text-sm text-gray-500 block mb-1">
                Remarks
              </label>
              <textarea
                placeholder="Leave Request Remarks"
                className="w-full p-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end space-x-2">
          <button className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-500">
            <ClipboardPen size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
