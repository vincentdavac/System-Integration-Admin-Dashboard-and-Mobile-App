import { CheckCircle } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';

interface ActivateModalProps {
  onClose: () => void;
}

const ActivateModal = ({ onClose }: ActivateModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center border-gray-300 dark:border-gray-600">
            ACTIVATE EMPLOYEE ACCOUNT
          </h3>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Password
            </p>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Re-type Password
            </p>
            <input
              type="password"
              placeholder="Re Type Password"
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
          <button className="text-white px-4 py-2 rounded bg-green-600 hover:bg-green-500">
            <CheckCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateModal;
