import UCCLogo from '/icons/ucc_logo.png';

interface ViewAttendanceProps {
  onClose: () => void;
}

export default function ViewPayroll({ onClose }: ViewAttendanceProps) {
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
            EMPLOYEE ATTENDANCE
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee No.
              </p>
              <p className="font-semibold text-sm">20220041</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="font-semibold text-sm">Davac, Vincent Ahron M.</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Time In
              </p>
              <p className="font-semibold text-sm">8:00AM</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Time Out
              </p>
              <p className="font-semibold text-sm">5:00PM</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Branch</p>
              <p className="font-semibold text-sm">BSIT - 4C</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Hour/s
              </p>
              <p className="font-semibold text-sm">8 Hour/s</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-semibold text-sm">September 27, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
