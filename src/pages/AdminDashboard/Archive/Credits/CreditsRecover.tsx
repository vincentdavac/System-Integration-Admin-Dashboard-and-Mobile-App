import { ArchiveRestore } from 'lucide-react';
import UCCLogo from '/icons/new_icon.svg';
import { AppContext } from '../../../../context/AppContext';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { useContext } from 'react';
import API_BASE_URL from '../../../../config/api';

interface ArchiveCreditsProps {
  onClose: () => void;
  refetchCredits: () => Promise<void>;
  alertsRef: React.RefObject<AlertsContainerRef>;
  CreditsData: {
    id: string;
    user: {
      id: string;
      employeeNo: string;
      name: string;
      email: string;
    };
    totalCredits: string;
    isArchive: string;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

export default function CreditsRecoverModal({
  onClose,
  alertsRef,
  refetchCredits,
  CreditsData,
}: ArchiveCreditsProps) {
  const { token } = useContext(AppContext)!;

  async function handleSubmit(e: any) {
    e.preventDefault();

    await new Promise((r) => setTimeout(r, 50)); // Wait 50ms

    const res = await fetch(
      `${API_BASE_URL}/api/credits/${CreditsData.id}/unarchive`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json', // ✅ Correct for JSON
          'Access-Control-Allow-Origin': '*',
        },
      },
    );

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
      await refetchCredits();
      onClose();
    } else if (data.message) {
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Meeting Created Successfully');
      // 🟢 Refetch parent employee list
      await refetchCredits();
      // Close modal after success
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <img
                src={UCCLogo}
                alt="Logo"
                width={55}
                className="drop-shadow"
              />
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
            <p className="text-lg font-bold pb-2 text-center">
              Do you want to restore employee credits with Employee no:{' '}
              {CreditsData?.user?.employeeNo ?? 'N/A'}?
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
            <button className="text-white px-4 py-2 rounded bg-green-600 hover:bg-green-500">
              <ArchiveRestore size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
