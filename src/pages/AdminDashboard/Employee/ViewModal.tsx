import { Printer, RefreshCw } from 'lucide-react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../config/api';
import UCCLogo from '/icons/new_icon.svg';

interface ViewProps {
  onClose: () => void;
  employee: {
    id: number;
    fullName: string;
    email: string;
    employeeNo: string;
    contactNumber: string;
    createdDate: string;
    image: string;
    section: string;
    employmentType: string;
    department: string;
    hourlyRate: string;
    position: string;
    employeeCredits: {
      totalCredits: string;
    };
  };

  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchEmployees: () => Promise<void>; // 🟢 Add this
}

const ViewModal = ({
  onClose,
  employee,
  alertsRef,
  refetchEmployees,
}: ViewProps) => {
  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/employee/${employee.id}/print-resume`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/pdf', // Request PDF format
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );

      // Check if the response is OK
      if (!res.ok) {
        const errText = await res.text();
        alertsRef.current?.addAlert(
          'error',
          `Failed to generate PDF: ${errText}`,
        );
        return;
      }

      // Convert response to blob (PDF file)
      const blob = await res.blob();

      // Create a temporary file URL for the PDF
      const fileURL = window.URL.createObjectURL(blob);

      // Option 1: Open PDF in new tab
      window.open(fileURL);

      // Option 2 (optional): Trigger automatic download
      // const link = document.createElement('a');
      // link.href = fileURL;
      // link.download = `${employee.first_name}_information.pdf`;
      // link.click();

      alertsRef.current?.addAlert(
        'success',
        'Employee information PDF generated successfully!',
      );

      // Optional: Refresh data
      await refetchEmployees();
      onClose();
    } catch (err: any) {
      alertsRef.current?.addAlert(
        'error',
        `Error generating PDF: ${err.message}`,
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-green-700 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Employment Type
              </p>
              <p className="font-semibold text-sm">{employee.employmentType}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Department
              </p>
              <p className="font-semibold text-sm">{employee.department}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Position
              </p>
              <p className="font-semibold text-sm">{employee.position}</p>
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

          <form onSubmit={handleSubmit}>
            {/* Footer */}
            <div className="border-t mt-5 dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded bg-green-700 hover:bg-green-600"
              >
                <Printer size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
