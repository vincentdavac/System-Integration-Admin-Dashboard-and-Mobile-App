import { ArchiveRestore } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../../context/AppContext';
import { useContext } from 'react';

interface LeaveTypeRecoverProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchLeaveType: () => Promise<void>;
  LeaveType: {
    id: string;
    name: string;
    description: string;
    isArchive: string;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

export default function LeaveTypeRecoverModal({
  onClose,
  alertsRef,
  refetchLeaveType,
  LeaveType,
}: LeaveTypeRecoverProps) {
  const { token } = useContext(AppContext)!;

  async function handleSubmit(e: any) {
    e.preventDefault();

    await new Promise((r) => setTimeout(r, 50)); // Wait 50ms

    const res = await fetch(`/api/leave-types/${LeaveType.id}/unarchive`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json', // ✅ Correct for JSON
      },
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
      await refetchLeaveType();
      onClose();
    } else if (data.message) {
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Meeting Created Successfully');
      // 🟢 Refetch parent employee list
      await refetchLeaveType();
      // Close modal after success
      onClose();
    }
  }

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

        <form onSubmit={handleSubmit}>
          {/* Body (scrollable) */}
          <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
            <p className="text-lg font-bold pb-2 text-center">
              Do you want to restore this leave type {LeaveType.name} ?
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded bg-green-600 hover:bg-green-500"
            >
              <ArchiveRestore size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
