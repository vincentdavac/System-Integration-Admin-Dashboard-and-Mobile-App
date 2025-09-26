import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';

interface UpdateLoanApprovalProps {
  onClose: () => void;
}

export default function UpdateLoanApproval({
  onClose,
}: UpdateLoanApprovalProps) {
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
            LOAN APPROVAL
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Loan Id</p>
              <p className="font-semibold text-sm">17582502088249</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-semibold text-sm">vincent123@gmail.com</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-sm">
                Lastname, Fistname Middle I.
              </p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Contact No</p>
              <p className="font-semibold text-sm">09123456789</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500">Home Address</p>
              <p className="font-semibold text-sm">
                Block 12 Lot Caloocan City
              </p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="font-semibold text-sm text-yellow-700">1.3 %</p>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Monthly Payment</p>
              <p className="font-semibold text-sm">₱ 1926.67</p>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Application Date </p>
              <p className="font-semibold text-sm">September 24, 2025 </p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6">
            Approval Information
          </h3>

          {/* Additional Info Section */}
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
              <p className="text-sm text-gray-500">Remarks</p>
              <textarea
                className="mt-1 w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                rows={3}
                placeholder="Enter remarks..."
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
