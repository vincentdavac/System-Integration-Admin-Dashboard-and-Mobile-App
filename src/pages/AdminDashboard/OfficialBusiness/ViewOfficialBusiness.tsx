import UCCLogo from '/icons/new_icon.svg';
import { useState } from 'react';

interface ViewOfficialBusinessProps {
  onClose: () => void;
  obData: {
    id: string;
    obId: string;
    userId: string;
    purpose: string;
    destination: string;
    dateStart: string;
    dateEnd: string;
    timeOut: string;
    timeIn: string;
    status: string;
    approverId: string;
    remarks: string;
    attachment: string;
    employeeInformation: {
      id: string;
      fullName: string;
      email: string;
      studentNo: string;
      department: string;
      position: string;
    };
    approverInformation: {
      id: string;
      fullName: string;
      email: string;
      position: string;
    };
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

const ViewOfficialBusiness = ({
  onClose,
  obData,
}: ViewOfficialBusinessProps) => {
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'rejected':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'cancelled':
        return 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10 shadow">
          <div className="flex items-center gap-3">
            <img src={UCCLogo} alt="Logo" width={55} className="drop-shadow" />
            <div className="leading-tight">
              <h1 className="font-bold text-sm text-white">
                TrueTeam Solutions
              </h1>
              <p className="text-xs text-white">South Campus</p>
            </div>
          </div>
          <button
            className="text-white text-2xl font-bold hover:text-gray-200"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
            OFFICIAL BUSINESS INFORMATION
          </h3>

          {/* Official Business Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Official Business ID
              </p>
              <p className="font-semibold text-sm">{obData.obId}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee No.
              </p>
              <p className="font-semibold text-sm">
                {obData.employeeInformation.studentNo}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee Name
              </p>
              <p className="font-semibold text-sm">
                {obData.employeeInformation.fullName}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-semibold text-sm">
                {obData.employeeInformation.email}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Department
              </p>
              <p className="font-semibold text-sm">
                {obData.employeeInformation.department}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Position
              </p>
              <p className="font-semibold text-sm">
                {obData.employeeInformation.position}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Purpose
              </p>
              <p className="font-semibold text-sm">{obData.purpose}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Destination
              </p>
              <p className="font-semibold text-sm">{obData.destination}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date Start
              </p>
              <p className="font-semibold text-sm">{obData.dateStart}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date End
              </p>
              <p className="font-semibold text-sm">{obData.dateEnd}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Time Out
              </p>
              <p className="font-semibold text-sm">{obData.timeOut || 'N/A'}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Time In
              </p>
              <p className="font-semibold text-sm">{obData.timeIn || 'N/A'}</p>
            </div>
          </div>

          {/* Approval Info */}
          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6 dark:border-gray-700">
            APPROVAL INFORMATION
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Approver
              </p>
              <p className="font-semibold text-sm">
                {obData.approverInformation?.fullName || 'No approver assigned'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className={getStatusClasses(obData.status)}>{obData.status}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remarks
              </p>
              <p className="font-semibold text-sm">
                {obData.remarks || 'No remarks provided.'}
              </p>
            </div>
          </div>

          {/* Attachment Section */}
          {obData.attachment && (
            <div className="mt-10 bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Attachment
              </p>
              <button
                onClick={() => setIsAttachmentModalOpen(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View Attachment
              </button>
            </div>
          )}

          {/* ✅ Attachment Modal */}
          {isAttachmentModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsAttachmentModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                  ✖
                </button>

                {/* Header */}
                <div className="px-5 py-3 border-b dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Attachment Preview
                  </h2>
                </div>

                {/* File Preview */}
                <div className="p-4">
                  {obData.attachment.endsWith('.pdf') ? (
                    <iframe
                      src={obData.attachment}
                      title="Attachment Preview"
                      className="w-full h-[70vh] rounded-md border dark:border-gray-700"
                    ></iframe>
                  ) : (
                    <img
                      src={obData.attachment}
                      alt="Attachment"
                      className="w-full max-h-[70vh] object-contain rounded-md shadow"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOfficialBusiness;
