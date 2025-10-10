import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../../config/api';
interface LoanData {
  id: number;
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
  employmentLength: string;
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
  assignedAdmin: string;
  remarks: string;
  hrApprovalDate: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

const MobileLoanRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get loan ID from URL
  const [loan, setLoan] = useState<LoanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLoanData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/loan-record/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const data = await res.json();

        if (res.ok) {
          setLoan(data.data);
        } else {
          console.error('Error fetching loan record:', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading loan details...
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loan record not found.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/loan')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">LOAN REQUEST</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-14 w-full text-center">
          <p className="text-base font-semibold text-white">
            {loan.applicationStatus || 'N/A'}
          </p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Loan ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span>{' '}
            {loan.createdDate || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Loan ID:</span>{' '}
            {loan.loanID || 'N/A'}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-6">
        {/* Loan Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Loan Information
        </h2>

        {/* Loan Type & Loan Amount */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Loan Type
            </label>
            <input
              type="text"
              value={loan.loanPurpose || ''}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Loan Amount
            </label>
            <input
              type="text"
              value={`₱ ${Number(loan.loanAmount).toLocaleString()}`}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Approved Amount & Interest Rate */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Approved Amount
            </label>
            <input
              type="text"
              value={`₱ ${Number(loan.loanAmount).toLocaleString()}`}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Interest Rate
            </label>
            <input
              type="text"
              value={`${loan.interestRate}%`}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Loan Term & Application Date */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Loan Term
            </label>
            <input
              type="text"
              value={`${loan.loanTerm} Months`}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Application Date
            </label>
            <input
              type="text"
              value={loan.createdDate || ''}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Human Resource Information
        </h2>

        {/* Validated By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Validated by
          </label>
          <input
            type="text"
            value={loan.assignedHR || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Remarks</label>
          <textarea
            readOnly
            value={loan.remarks || ''}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Date Approved */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Date Approved
          </label>
          <input
            type="text"
            value={loan.hrApprovalDate || ''}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Slightly smaller extra bottom space */}
      <div className="h-4"></div>
    </div>
  );
};

export default MobileLoanRequest;
