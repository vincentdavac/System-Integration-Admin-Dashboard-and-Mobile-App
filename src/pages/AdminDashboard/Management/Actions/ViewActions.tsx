import UCCLogo from '/icons/new_icon.svg';

interface ViewActionsModalProps {
  onClose: () => void;
  isOpen: boolean;
  Actions: {
    id: string;
    actionId: string;
    meetingId: string;
    actionType: string;
    description: string;
    meetingInformation: {
      meetingId: string;
      meetingDate: string;
      meetingTime: string;
      location: string;
      participants: string;
      notes: string;
      status: string;
      relation: {
        relationId: string;
        caseType: string;
        caseTitle: string;
        details: string;
        status: string;
        dateReported: string;
        reportedUser: {
          userId: string;
          fullName: string;
          email: string;
        };
        reportedBy: {
          userId: string;
          fullName: string;
          email: string;
        };
      };
    };
    handledByInformation: {
      userId: string;
      fullName: string;
      email: string;
    };
    createdDate: string;
    createdTime: string;
  };
}

export default function ViewActionsModal({
  onClose,
  isOpen,
  Actions,
}: ViewActionsModalProps) {
  if (!isOpen) return null;

  // Status color
  const getRelationsStatus = (status: string) => {
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
            EMPLOYEE RELATION INFORMATION
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case No.
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.relation.relationId}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Actions.meetingInformation.relation.caseType}
              </p>
              <p className="font-semibold text-sm">Dispute</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Person Involved
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation?.relation?.reportedUser?.fullName ??
                  'N/A'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reported By
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.relation.reportedBy.fullName ??
                  'N/A'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Case Title
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.relation.caseTitle}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p
                className={getRelationsStatus(
                  Actions.meetingInformation.relation.status,
                )}
              >
                {Actions.meetingInformation.relation.status}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Details
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.relation.details}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date Reported
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.relation.dateReported}
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
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.meetingId}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Schedule Date
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.meetingDate}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Schedule Time
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.meetingTime}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Meeting Location
              </p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.location}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
              <p className="font-semibold text-sm">
                {Actions.meetingInformation.notes}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Scheduled By
              </p>
              <p className="font-semibold text-sm">
                {Actions.handledByInformation.fullName}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b dark:border-gray-700 pb-2 mt-10 mb-6">
            ACTION INFORMATION
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Action ID
              </p>
              <p className="font-semibold text-sm">{Actions.actionId}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Action Type
              </p>
              <p className="font-semibold text-sm">{Actions.actionType}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
                Description
              </label>
              <textarea
                disabled
                value={Actions.description}
                className="w-full p-2 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                rows={3}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Facilitator
              </p>
              <p className="font-semibold text-sm">
                {Actions.handledByInformation.fullName}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Action Date
              </p>
              <p className="font-semibold text-sm">{Actions.createdDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
