import { useState } from 'react';
import UCCLogo from '/icons/ucc_logo.png';

interface ViewLeaveRequestModalProps {
  onClose: () => void;
  isOpen: boolean;
  LeaveRequest: {
    id: string;
    leaveId: string;
    studentNo: string;
    userId: string;
    leaveTypeId: 1;
    reason: string;
    startDate: string;
    endDate: string;
    durationDays: string;
    imageFile: string;
    status: string;
    approverId: string;
    remarks: string;
    userInformation: {
      userId: string;
      fullName: string;
      email: string;
      studentNo: string;
    };
    approverInformation: {
      userId: string;
      fullName: string;
      email: string;
    };
    leaveTypeInformation: {
      id: string;
      name: string;
      description: string;
      isArchive: string;
    };
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

export default function ViewLeaveRequestModal({
  onClose,
  isOpen,
  LeaveRequest,
}: ViewLeaveRequestModalProps) {
  if (!isOpen) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status badge (unchanged as requested)
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'declined':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium line-block';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      default:
        return 'bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
            EMPLOYEE LEAVE REQUEST
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee No.
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.userInformation.studentNo}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee Name
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.userInformation.fullName}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.userInformation.email}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b dark:border-gray-700 pb-2 mt-10 mb-6">
            LEAVE INFORMATION
          </h3>

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start Date
              </p>
              <p className="font-semibold text-sm">{LeaveRequest.startDate}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                End Date
              </p>
              <p className="font-semibold text-sm">{LeaveRequest.endDate}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Day/s
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.durationDays}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Leave Type
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.leaveTypeInformation.name}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Reason</p>
              <p className="font-semibold text-sm">
                {' '}
                {LeaveRequest.leaveTypeInformation.description}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Attachment:
              </p>

              {/* Thumbnail */}
              <img
                src={LeaveRequest.imageFile}
                alt="Attached Document"
                onClick={() => setIsModalOpen(true)}
                className="w-40 h-40 object-cover border rounded-lg shadow-sm cursor-pointer hover:opacity-90"
              />

              {/* Modal */}
              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
                  onClick={() => setIsModalOpen(false)} // Close when clicking outside
                >
                  <div
                    className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex justify-center items-center overflow-hidden"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                  >
                    {/* Close button */}
                    <button
                      className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full px-3 py-1 hover:bg-opacity-90 text-lg font-bold"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ✕
                    </button>

                    {/* Large Image */}
                    <img
                      src={LeaveRequest.imageFile}
                      alt="Full View"
                      className="max-w-[95%] max-h-[85vh] object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold border-b dark:border-gray-700 pb-2 mt-10 mb-6">
            APPROVAL INFORMATION
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className={getStatusClasses(LeaveRequest.status)}>
                {LeaveRequest.status}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reviewed By
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.approverInformation.fullName}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Approval Date
              </p>
              <p className="font-semibold text-sm">
                {LeaveRequest.updatedDate}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
                Remarks
              </label>
              <textarea
                disabled
                defaultValue={LeaveRequest.remarks}
                value={LeaveRequest.remarks || 'No remarks provided.'}
                placeholder="Leave Request Remarks"
                className="w-full p-2 border dark:border-gray-700 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-200"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
