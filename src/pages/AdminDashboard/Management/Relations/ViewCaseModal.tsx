import UCCLogo from '/icons/ucc_logo.png';

interface ViewCaseModalProps {
  onClose: () => void;
  Relations: {
    id: string;
    caseId: string;
    caseType: string;
    caseTitle: string;
    details: string;
    dateReported: string;
    status: string;
    resolution: string;
    disciplinaryLevel: string;
    dateResolved: string;
    remarks: string;
    createdDate: string;
    createdTime: string;
    reportedUser: {
      id: string;
      employeeNo: string;
      name: string;
      email: string;
    };
    reportedBy: {
      id: string;
      employeeNo: string;
      name: string;
      email: string;
    };
    handledBy: {
      id: string;
      employeeNo: string;
      name: string;
      email: string;
    };
  };
}

export default function ViewCaseModal({
  onClose,
  Relations,
}: ViewCaseModalProps) {
  // Status color
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'dismissed':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'under investigation':
        return 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'open':
      default:
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
    }
  };

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
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
            RELATION INFORMATION
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case No.
              </p>
              <p className="font-semibold text-sm">{Relations.caseId}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case Type
              </p>
              <p className="font-semibold text-sm">{Relations.caseType}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Person Involved
              </p>
              <p className="font-semibold text-sm">
                {Relations.reportedUser.name}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reported By
              </p>
              <p className="font-semibold text-sm">
                {Relations.reportedBy.name}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case Title
              </p>
              <p className="font-semibold text-sm">{Relations.caseTitle}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className={getStatusClasses(Relations.status)}>
                {Relations.status}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Details
              </p>
              <p className="font-semibold text-sm">{Relations.details}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date Reported
              </p>
              <p className="font-semibold text-sm">{Relations.createdDate}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6 dark:border-gray-700">
            Additional Information
          </h3>

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Resolution
              </p>
              <p className="font-semibold text-sm">
                {Relations?.resolution || 'pending'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Disciplinary Level
              </p>
              <p className="font-semibold text-sm">
                {Relations?.disciplinaryLevel || 'pending'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Handled By
              </p>
              <p className="font-semibold text-sm">
                {Relations?.handledBy.name || 'pending'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date Resolved
              </p>
              <p className="font-semibold text-sm">
                {Relations?.dateResolved || 'pending'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remarks
              </p>
              <p className="font-semibold text-sm">
                {Relations?.remarks || 'pending'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
