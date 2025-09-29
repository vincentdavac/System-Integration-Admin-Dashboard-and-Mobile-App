import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';

interface UpdateMeetingProps {
  onClose: () => void;
}

export default function UpdateMeetingModal({ onClose }: UpdateMeetingProps) {
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
            UPDATE EMPLOYEE MEETING
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Meeting ID</label>
              <select
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                defaultValue="Select case ID"
              >
                <option value="pending">MET-2025-001</option>
                <option value="approved">2025-002</option>
                <option value="rejected">2025-003</option>
              </select>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Relation Status</label>
              <select
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                defaultValue="Select Meeting ID"
              >
                <option value="open">Open</option>
                <option value="resolve">Resolve</option>
                <option value="dismissed">Dismissed</option>
                <option value="under_investigation">Under Investigation</option>
              </select>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Case ID</label>
              <select
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                defaultValue="Select case ID"
              >
                <option value="pending">REL-2025-001</option>
                <option value="approved">2025-002</option>
                <option value="rejected">2025-003</option>
              </select>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Schedule Date</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
              />
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Schedule Time</label>
              <select
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                defaultValue=""
              >
                <option value="" disabled>
                  Select time
                </option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">Meeting Location</label>
              <input
                type="text"
                placeholder="Enter meeting location"
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
              />
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label className="text-sm text-gray-500">
                Meeting Participants
              </label>
              <input
                type="text"
                placeholder="Enter meeting participants"
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
              />
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm col-span-2">
              <label className="text-sm text-gray-500">Notes</label>
              <textarea
                placeholder="Enter notes here..."
                rows={4}
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
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
