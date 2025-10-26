import UCCLogo from '/icons/new_icon.svg';

interface ViewMeetingModalProps {
  onClose: () => void;
  Meeting: {
    id: number;
    meetingId: string;
    relationId: string;
    meetingDate: string;
    meetingTime: string;
    location: string;
    participants: string;
    notes: string;
    status: string;
    createdDate: string;
    relationInformation: {
      reportedPerson: string;
      caseType: string;
      caseTitle: string;
      details: string;
      reportedBy: string;
      dateReported: string;
      status: string;
      resolution: string;
      disciplinaryLevel: string;
      handledBy: string;
      dateResolved: string;
      remarks: string;
    };
  };
}

const getStatusClassesRelations = (status: string) => {
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

export default function ViewMeetingModal({
  onClose,
  Meeting,
}: ViewMeetingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src={UCCLogo} alt="Logo" width={55} className="drop-shadow" />
            <div className="leading-tight">
              <h1 className="font-bold text-sm text-white">
                TrueTeam Solutions
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
            EMPLOYEE MEETING SCHEDULE
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case No.
              </p>
              <p className="font-semibold text-sm">{Meeting.relationId}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case Type
              </p>
              <p className="font-semibold text-sm">
                {Meeting.relationInformation.caseType}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Person Involved
              </p>
              <p className="font-semibold text-sm">
                {' '}
                {Meeting.relationInformation.reportedPerson}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reported By
              </p>
              <p className="font-semibold text-sm">
                {' '}
                {Meeting.relationInformation.reportedBy}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case Title
              </p>
              <p className="font-semibold text-sm">
                {' '}
                {Meeting.relationInformation.caseTitle}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p
                className={getStatusClassesRelations(
                  Meeting.relationInformation.status,
                )}
              >
                {Meeting.relationInformation.status}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Details
              </p>
              <p className="font-semibold text-sm">
                {' '}
                {Meeting.relationInformation.details}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date Reported
              </p>
              <p className="font-semibold text-sm">
                {' '}
                {Meeting.relationInformation.dateReported}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b dark:border-gray-700 pb-2 mt-10 mb-6">
            MEETING INFORMATION
          </h3>

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Meeting ID
              </p>
              <p className="font-semibold text-sm">{Meeting.meetingId}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Schedule Date
              </p>
              <p className="font-semibold text-sm">{Meeting.meetingDate}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Schedule Time
              </p>
              <p className="font-semibold text-sm">{Meeting.meetingTime}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Meeting Location
              </p>
              <p className="font-semibold text-sm">{Meeting.location}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
              <p className="font-semibold text-sm">{Meeting.notes}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-semibold text-sm">{Meeting.createdDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
