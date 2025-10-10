import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../../context/AppContext';
import { useContext, useState } from 'react';

interface UpdateLeaveRequestModalProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchLeaveRequest: () => Promise<void>;
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

export default function UpdateLeaveRequestModal({
  onClose,
  isOpen,
  refetchLeaveRequest,
  LeaveRequest,
  alertsRef,
}: UpdateLeaveRequestModalProps) {
  if (!isOpen) return null;
  const { user, token } = useContext(AppContext)!;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const approver_id = user?.id;
  const [status, setStatus] = useState(LeaveRequest.status || 'pending');
  const [remarks, setRemarks] = useState(LeaveRequest.remarks || ' ');

  async function handleSubmit(e: any) {
    e.preventDefault();

    await new Promise((r) => setTimeout(r, 50)); // Wait 50ms
    console.log(approver_id, status, remarks);

    const form = e.target;
    const selectedStatus = form.status.value; // Get latest select value directly
    const remarksValue = form.remarks.value;

    console.log(approver_id, selectedStatus, remarksValue);

    const payload = {
      approver_id: approver_id,
      status: selectedStatus,
      remarks: remarksValue,
    };

    const res = await fetch(`/api/leave-requests/${LeaveRequest.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json', // ✅ Correct for JSON
      },
      body: JSON.stringify(payload), // ✅ Send as JSON
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      // Handle validation errors
      Object.values(data.errors).forEach((messages) => {
        (messages as string[]).forEach((msg) => {
          alertsRef.current?.addAlert('error', msg);
        });
      });
    } else if (data.status && data.status.toLowerCase().includes('success')) {
      // ✅ Backend explicitly says success
      alertsRef.current?.addAlert(
        'success',
        data.message || 'Meeting Created Successfully',
      );
      await refetchLeaveRequest();
      onClose();
    } else if (data.message) {
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Meeting Created Successfully');
      // 🟢 Refetch parent employee list
      await refetchLeaveRequest();
      // Close modal after success
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center border-gray-300 dark:border-gray-600">
            LEAVE REQUEST APPROVAL
          </h3>

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

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6 border-gray-300 dark:border-gray-600">
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

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6 border-gray-300 dark:border-gray-600">
            APPROVAL INFORMATION
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </label>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-100"
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option
                    value="approved"
                    className="text-green-600 dark:text-green-500"
                  >
                    Approved
                  </option>
                  <option
                    value="rejected"
                    className="text-red-600 dark:text-red-500"
                  >
                    Rejected
                  </option>
                </select>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm col-span-2">
                <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Leave Request Remarks"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-100"
                  rows={3}
                />
              </div>

              {/* Footer */}
              <div className="border-t border-gray-300 dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
                <button
                  type="submit"
                  className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-500"
                >
                  <ClipboardPen size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
