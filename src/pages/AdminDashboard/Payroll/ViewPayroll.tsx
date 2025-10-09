import UCCLogo from '/icons/ucc_logo.png';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';

interface ViewPayrollProps {
  onClose: () => void;
  payroll: {
    id: number;
    userInformation: {
      userId: number;
      employeeNo: string;
      name: string;
      email: string;
    };
    cutoffStart: string;
    cutoffEnd: string;
    grossSalary: string;
    totalDeductions: string;
    netSalary: string;
    salaryDate: string;
    releaseDate: string;
    totalHours: string;
    regularHours: string;
    overtimeHours: string;
  };
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchPayroll: () => Promise<void>;
}

export default function ViewPayroll({ onClose, payroll }: ViewPayrollProps) {
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

        {/* Body */}
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
            EMPLOYEE PAYROLL DETAILS
          </h3>

          {/* Employee Info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <InfoCard
              label="Employee No."
              value={payroll.userInformation.employeeNo}
            />
            <InfoCard label="Full Name" value={payroll.userInformation.name} />
            <InfoCard label="Email" value={payroll.userInformation.email} />

            <InfoCard label="Salary Date" value={payroll.salaryDate} />
            <InfoCard label="Release Date" value={payroll.releaseDate} />
          </div>

          {/* Salary Info */}
          <h4 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-200">
            Salary Summary
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <InfoCard label="Gross Salary" value={payroll.grossSalary} />
            <InfoCard
              label="Total Deductions"
              value={payroll.totalDeductions}
            />
            <InfoCard label="Net Salary" value={payroll.netSalary} />
          </div>

          {/* Hours Info */}
          <h4 className="text-lg font-bold mt-6 mb-3 text-gray-700 dark:text-gray-200">
            Work Hours Summary
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <InfoCard label="Total Hours" value={`${payroll.totalHours} hrs`} />
            <InfoCard
              label="Regular Hours"
              value={`${payroll.regularHours} hrs`}
            />
            <InfoCard
              label="Overtime Hours"
              value={`${payroll.overtimeHours} hrs`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Reusable Info Card --- */
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
        {value || '—'}
      </p>
    </div>
  );
}
