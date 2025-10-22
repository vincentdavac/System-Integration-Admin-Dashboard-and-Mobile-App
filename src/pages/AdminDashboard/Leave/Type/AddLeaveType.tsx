import { CalendarPlus2 } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../../context/AppContext';
import { useContext, useState } from 'react';
import API_BASE_URL from '../../../../config/api';

interface AddLeaveTypesProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchLeaveType: () => Promise<void>;
}

export default function AddLeaveTypesModal({
  onClose,
  alertsRef,
  refetchLeaveType,
}: AddLeaveTypesProps) {
  const { token } = useContext(AppContext)!;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [applicableDays, setApplicableDays] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    await new Promise((r) => setTimeout(r, 50)); // Wait 50ms

    const form = e.target;
    const Setname = form.name.value; // Get latest select value directly
    const Setdescription = form.description.value;
    const setApplicableDays = form.applicableDays.value;

    console.log(name, description, applicableDays);

    const payload = {
      name: Setname,
      description: Setdescription,
      applicable_days: setApplicableDays,
    };

    const res = await fetch(`${API_BASE_URL}/api/leave-types`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json', // ✅ Correct for JSON
        'Access-Control-Allow-Origin': '*',
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
        <div className="bg-yellow-500 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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
            <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
              ADD LEAVE TYPE
            </h3>

            {/* Case Information Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Leave Type
                </label>
                <input
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter leave type"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Applicable Days
                </label>
                <input
                  name="applicableDays"
                  type="number"
                  onChange={(e) => setApplicableDays(e.target.value)}
                  placeholder="Enter Applicable Days"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Description
                </label>
                <input
                  name="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500"
            >
              <CalendarPlus2 size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
