import UCCLogo from '/icons/ucc_logo.png';

interface ViewLoanApprovalProps {
  onClose: () => void;
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

export default function ViewLoanApproval({
  onClose,
  Loan,
}: ViewLoanApprovalProps) {
  // Status color
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'rejected':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'cancelled':
        return 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium inline-block ';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
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

        {/* Body (scrollable) */}
        <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
          <h3 className="text-2xl font-bold border-b pb-2 mb-6 text-center dark:border-gray-700">
            EMPLOYEE LOAN
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

          <h3 className="text-xl font-bold border-b pb-2 mt-10 mb-6 dark:border-gray-700">
            Approval Information
          </h3>

          {/* Additional Info Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Approver
              </p>
              <p className="font-semibold text-sm">{Loan.assignedHR}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className={getStatusClasses(Loan.applicationStatus)}>
                {Loan.applicationStatus}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Approval Date
              </p>
              <p className="font-semibold text-sm">{Loan.hrApprovalDate}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remarks
              </p>
              <p className="font-semibold text-sm">
                {Loan.remarks || 'No remarks provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
