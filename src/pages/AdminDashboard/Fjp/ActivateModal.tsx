import { CheckCircle } from 'lucide-react';
import UCCLogo from '/icons/new_icon.svg';
import { useState } from 'react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../config/api';

interface ActivateModalProps {
  onClose: () => void;
  employee: {
    id: number;
    fullName: string;
    email: string;
    employeeNo: string;
    contactNumber: string;
    createdDate: string;
    image: string;
  };
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchEmployees: () => Promise<void>;
}

const ActivateModal = ({
  onClose,
  employee,
  alertsRef,
  refetchEmployees,
}: ActivateModalProps) => {
  const [formData, setFormData] = useState({
    hrm_password: '',
    hrm_password_confirmation: '',
    employment_type: '',
    department: '',
    position: '',
  });

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await fetch(
      `${API_BASE_URL}/api/activate-account/${employee.id}`,
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
        data.message || 'Account activated successfully',
      );

      // 🟢 Refetch parent employee list
      await refetchEmployees();

      // Close modal after success
      onClose();
    } else if (data.message) {
      // Any other message → treat as error
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Account Activated Successfully');
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
            EMPLOYEE INFORMATION
          </h3>

          <div className="bg-white mb-5 dark:bg-gray-900 p-6 border dark:border-gray-700  shadow-sm flex justify-center">
            <img
              src={`https://fjp.ucc.bsit4c.com/${employee.image}`}
              alt="Profile"
              className="w-32 h-32  object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee No.
              </p>
              <p className="font-semibold text-sm">{employee.employeeNo}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="font-semibold text-sm">{employee.fullName}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Section
              </p>
              <p className="font-semibold text-sm">Section C</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="font-semibold text-sm">{employee.email}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Contact Number
              </p>
              <p className="font-semibold text-sm">{employee.contactNumber}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Account Created
              </p>
              <p className="font-semibold text-sm text-white-700 dark:text-white-400">
                {employee.createdDate}
              </p>
            </div>
          </div>

          <h3 className="text-2xl mt-5 font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
            ACTIVATE ACCOUNT
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Employment Type */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Employment Type
              </p>
              <select
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employment_type: e.target.value,
                  })
                }
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              >
                <option value="">Select Employment Type</option>
                <option value="Part-Time Teaching">Part-Time Teaching</option>
                <option value="Regular Employment">Regular Employment</option>
                <option value="Probationary Employment">
                  Probationary Employment
                </option>
              </select>
            </div>

            {/* Department */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Department
              </p>
              <select
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              >
                <option value="">Select Department</option>
                <option value="Department of Computer Science">
                  Department of Computer Science
                </option>
                <option value="Department of Information Technology">
                  Department of Information Technology
                </option>
                <option value="Department of Information Systems">
                  Department of Information Systems
                </option>
                <option value="Department of Entertainment and Multimedia Computing">
                  Department of Entertainment and Multimedia Computing
                </option>
              </select>
            </div>

            {/* Position */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Position
              </p>
              <select
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: e.target.value,
                  })
                }
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              >
                <option value="">Select Position</option>
                <option value="Instructor">Instructor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
                <option value="Dean">Dean</option>
                <option value="Program Coordinator">Program Coordinator</option>
                <option value="HR Manager">HR Manager</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Password
              </p>
              <input
                type="password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hrm_password: e.target.value,
                  })
                }
                placeholder="Enter Password"
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              />
            </div>

            {/* Confirm Password */}
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
                placeholder="Re-type Password"
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-gray-100 p-2 mb-3 rounded"
              />
            </div>

            {/* Submit Button */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded bg-green-600 hover:bg-green-500"
              >
                <CheckCircle size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivateModal;
