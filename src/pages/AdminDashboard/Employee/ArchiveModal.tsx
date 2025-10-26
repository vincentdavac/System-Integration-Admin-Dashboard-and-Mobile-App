import { Archive } from 'lucide-react';
import UCCLogo from '/icons/new_icon.svg';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../config/api';
interface ArchiveModalProps {
  onClose: () => void;
  employee: {
    id: number;
    fullName: string;
    email: string;
    employeeNo: string;
  };
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchEmployees: () => Promise<void>;
}

const ArchiveModal = ({
  onClose,
  employee,
  alertsRef,
  refetchEmployees,
}: ArchiveModalProps) => {
  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await fetch(
      `${API_BASE_URL}/api/archive-account/${employee.employeeNo}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );

    const data = await res.json();

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
        data.message || 'Account Archived successfully',
      );

      // 🟢 Refetch parent employee list
      await refetchEmployees();

      // Close modal after success
      onClose();
    } else if (data.message) {
      // Any other message → treat as error
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Account Archived Successfully');
      // 🟢 Refetch parent employee list
      await refetchEmployees();

      // Close modal after success
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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
          <p className="text-1xl font-bold pb-2 text-center">
            Do you want to archive this account {employee.employeeNo} ?
          </p>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="text-white px-4 py-2 rounded bg-red-600 hover:bg-red-500"
            >
              <Archive size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;
