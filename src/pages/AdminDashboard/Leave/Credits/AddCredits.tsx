import { CalendarPlus2 } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
interface AddCreditsProps {
  onClose: () => void;
}

export default function AddCreditsModal({ onClose }: AddCreditsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-yellow-500 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
          <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
            ADD EMPLOYEE CREDITS
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee No.
              </p>
              <p className="font-semibold text-sm">2025-0001</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee Name
              </p>
              <p className="font-semibold text-sm">Vincent Ahron M. Davac</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Employee Credits
              </label>
              <input
                type="number"
                placeholder="Enter credits"
                className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
          <button className="text-white px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500">
            <CalendarPlus2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
