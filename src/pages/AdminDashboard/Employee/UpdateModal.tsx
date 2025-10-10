import { RefreshCw } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { useState } from 'react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../config/api';
interface UpdateModalPropos {
  onClose: () => void;
  employee: {
    id: number;
    fullName: string;
    email: string;
    employeeNo: string;
  };

  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchEmployees: () => Promise<void>; // 🟢 Add this
}

const UpdateModal = ({
  onClose,
  employee,
  alertsRef,
  refetchEmployees,
}: UpdateModalPropos) => {
  const [formData, setFormData] = useState({
    hrm_password: '',
    hrm_password_confirmation: '',
  });

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await fetch(
      `${API_BASE_URL}/api/update-account/${employee.employeeNo}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(formData),
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
        data.message || 'Account Updated successfully',
      );

      // 🟢 Refetch parent employee list
      await refetchEmployees();

      // Close modal after success
      onClose();
    } else if (data.message) {
      // Any other message → treat as error
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Account Updated Successfully');
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
            UPDATE EMPLOYEE PASSWORD
          </h3>

          {/* Display the passed ID and details */}
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Employee No:</strong> {employee.employeeNo}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Full Name:</strong> {employee.fullName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {employee.email}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Password
              </p>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hrm_password: e.target.value,
                  })
                }
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Re-type Password
              </p>
              <input
                type="password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hrm_password_confirmation: e.target.value,
                  })
                }
                placeholder="Re Type Password"
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              />
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-500"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
