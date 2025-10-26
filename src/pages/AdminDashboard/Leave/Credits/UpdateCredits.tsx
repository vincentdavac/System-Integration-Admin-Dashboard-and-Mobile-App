import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/new_icon.svg';
import { useContext, useState } from 'react';
import { AppContext } from '../../../../context/AppContext';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../../config/api';
interface UpdateCreditsProps {
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

export default function UpdateCreditsModal({
  onClose,
  CreditsData,
  refetchCredits,
  alertsRef,
}: UpdateCreditsProps) {
  const { token } = useContext(AppContext)!;

  const [credits, setCredits] = useState(CreditsData.totalCredits || 0);

  async function handleSubmit(e: any) {
    e.preventDefault();

    await new Promise((r) => setTimeout(r, 50)); // Wait 50ms

    const form = e.target;
    const addedCredits = form.credits.value; // Get latest select value directly

    console.log(addedCredits);

    const payload = {
      total_credits: credits,
    };

    const res = await fetch(
      `${API_BASE_URL}/api/update-credits/${CreditsData.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json', // ✅ Correct for JSON
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload), // ✅ Send as JSON
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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2D3F99] text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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

        <form onSubmit={handleSubmit}>
          {/* Body (scrollable) */}
          <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
            <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center border-gray-300 dark:border-gray-600">
              UPDATE EMPLOYEE CREDITS
            </h3>

            {/* Case Information Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Employee No.
                </p>
                <p className="font-semibold text-sm">
                  {CreditsData.user.employeeNo}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Employee Name
                </p>
                <p className="font-semibold text-sm">{CreditsData.user.name}</p>
              </div>

              <div className=" bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="font-semibold text-sm">
                  {CreditsData.user.email}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 mb-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Employee Credits
                </label>
                <input
                  name="credits"
                  type="number"
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="Enter credits"
                  defaultValue={CreditsData.totalCredits}
                  className="mt-1 block w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>
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
  );
}
