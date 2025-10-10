import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';
interface UpdateLoanApprovalProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchLoans: () => Promise<void>;
  Loan: {
    id: string;
    studentNo: string;
    applicationId: string;
    loanID: string;
    accountId: string;
    fullName: string;
    email: string;
    contactNumber: string;
    address: string;
    city: string;
    province: string;
    zipCode: string;
    employmentStatus: string;
    employerName: string;
    annualIncome: string;
    housingPayment: string;
    loanAmount: string;
    loanPurpose: string;
    loanTerm: string;
    interestRate: string;
    interest: string;
    monthlyPaymentNoInterest: string;
    monthlyPayment: string;
    applicationStatus: string;
    assignedHR: string;
    remarks: string;
    hrApprovalDate: string;
    createdDate: string;
    createdTime: string;
  };
}

export default function UpdateLoanApproval({
  onClose,
  alertsRef,
  refetchLoans,
  Loan,
}: UpdateLoanApprovalProps) {
  const { user, token } = useContext(AppContext)!;

  const [formData, setFormData] = useState({
    application_status: '',
    assigned_hr: user?.fullName || '',
    remarks: '',
  });

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await fetch(
      `${API_BASE_URL}/api/loan-approval/update-status/${Loan.id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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
      await refetchLoans();

      // Close modal after success
      onClose();
    } else if (data.message) {
      // Any other message → treat as error
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Account Activated Successfully');
      // 🟢 Refetch parent employee list
      await refetchLoans();
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
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center border-gray-300 dark:border-gray-700">
            LOAN APPROVAL
          </h3>

          {/* Case Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loan Id
              </p>
              <p className="font-semibold text-sm">{Loan.loanID}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="font-semibold text-sm">{Loan.email}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="font-semibold text-sm">{Loan.fullName}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Contact No
              </p>
              <p className="font-semibold text-sm">{Loan.contactNumber}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm ">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Home Address
              </p>
              <p className="font-semibold text-sm">
                {Loan.address}, {Loan.city}, {Loan.province}, {Loan.zipCode}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Interest Rate
              </p>
              <p className="font-semibold text-sm text-white-700 dark:text-white-400">
                {Loan.interestRate} %
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Monthly Payment
              </p>
              <p className="font-semibold text-sm">₱ {Loan.monthlyPayment}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Application Date{' '}
              </p>
              <p className="font-semibold text-sm">{Loan.createdDate} </p>
            </div>
          </div>

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6 border-gray-300 dark:border-gray-600">
            Approval Information
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Additional Info Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </label>
                <select
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      application_status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md p-2 border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold bg-white dark:bg-gray-900 dark:text-gray-100"
                  defaultValue="Update Status"
                >
                  <option value="pending" className="text-yellow-600">
                    Pending
                  </option>
                  <option value="approved" className="text-green-600">
                    Approved
                  </option>
                  <option value="rejected" className="text-red-600">
                    Rejected
                  </option>
                </select>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Remarks
                </p>
                <textarea
                  className="mt-1 w-full rounded-md p-2 border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold bg-white dark:bg-gray-900 dark:text-gray-100"
                  rows={3}
                  placeholder="Enter remarks..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      remarks: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-500">
                <ClipboardPen size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
