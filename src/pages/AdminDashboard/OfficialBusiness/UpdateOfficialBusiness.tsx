import { useContext, useState } from 'react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';
import UCCLogo from '/icons/new_icon.svg';

interface OfficialBusinessProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchOofficialBusiness: () => Promise<void>;
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

const UpdateOfficialBusiness = ({
  onClose,
  alertsRef,
  refetchOofficialBusiness,
  obData,
}: OfficialBusinessProps) => {
  const { user, token } = useContext(AppContext)!;

  const [formData, setFormData] = useState({
    approver_id: user?.id,
    remarks: obData.remarks || '',
    status: obData.status || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/official-business/${obData.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.errors) {
        Object.values(data.errors).forEach((messages) =>
          (messages as string[]).forEach(
            (msg) => alertsRef.current?.addAlert('error', msg),
          ),
        );
      } else if (
        data.message &&
        data.message.toLowerCase().includes('success')
      ) {
        alertsRef.current?.addAlert('success', data.message);
        await refetchOofficialBusiness();
        onClose();
      } else {
        alertsRef.current?.addAlert(
          'success',
          'Official business updated successfully.',
        );
        await refetchOofficialBusiness();
        onClose();
      }
    } catch (error) {
      alertsRef.current?.addAlert(
        'error',
        'Failed to update official business.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10 shadow">
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

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200"
        >
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
            UPDATE OFFICIAL BUSINESS
          </h3>

          {/* Read-only Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Official Business ID
              </p>
              <p className="font-semibold text-sm">{obData.obId}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employee Name
              </p>
              <p className="font-semibold text-sm">
                {obData.employeeInformation.fullName}
              </p>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow col-span-2">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Remarks
              </label>
              <textarea
                name="remarks"
                rows={3}
                placeholder="Enter remarks..."
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              ></textarea>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow col-span-2">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              >
                <option value="">Select Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md text-sm font-medium shadow-md ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Updating...' : 'Update Official Business'}
            </button>
          </div>

          {/* Attachment Preview */}
          {obData.attachment && (
            <div className="mt-10 bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Attachment
              </p>
              <button
                type="button"
                onClick={() => setIsAttachmentModalOpen(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View Attachment
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Attachment Modal */}
      {isAttachmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl relative">
            <button
              onClick={() => setIsAttachmentModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✖
            </button>

            <div className="px-5 py-3 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Attachment Preview
              </h2>
            </div>

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
  );
};

export default UpdateOfficialBusiness;
