import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../../config/api';

interface PayrollData {
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
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

const MobilePayrollView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [payroll, setPayroll] = useState<PayrollData | null>(null);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/payrolls/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const result = await response.json();
        console.log('Fetched Payroll:', result);
        setPayroll(result.data);
      } catch (error) {
        console.error('Error fetching payroll:', error);
      }
    };

    fetchPayroll();
  }, [id]);

  if (!payroll) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading payroll details...</p>
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
          <button
            onClick={() => navigate('/mobile/payroll-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">View Payroll</h1>
        </div>

        {/* Date & Employee Info */}
        <div className="absolute bottom-3 left-4 text-white text-sm space-y-1">
          <p>
            <span className="font-semibold">Date:</span> {payroll.createdDate}
          </p>
          <p>
            <span className="font-semibold">Full Name:</span>{' '}
            {payroll.userInformation.name}
          </p>
          <p>
            <span className="font-semibold">Employee No.:</span>{' '}
            {payroll.userInformation.employeeNo}
          </p>
        </div>
      </div>

      {/* Payroll Info Section */}
      <div className="mt-4 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Payroll Information
        </h2>

        {[
          { label: 'Cutoff Start', value: payroll.cutoffStart || '—' },
          { label: 'Cutoff End', value: payroll.cutoffEnd || '—' },
          { label: 'Gross Salary', value: payroll.grossSalary },
          { label: 'Total Deductions', value: payroll.totalDeductions },
          { label: 'Net Salary', value: payroll.netSalary },
          { label: 'Salary Date', value: payroll.salaryDate },
          { label: 'Release Date', value: payroll.releaseDate },
          { label: 'Total Hours', value: payroll.totalHours },
          { label: 'Regular Hours', value: payroll.regularHours },
          { label: 'Overtime Hours', value: payroll.overtimeHours },
          { label: 'Created Date', value: payroll.createdDate },
          { label: 'Created Time', value: payroll.createdTime },
          { label: 'Updated Date', value: payroll.updatedDate },
          { label: 'Updated Time', value: payroll.updatedTime },
        ].map((item, index) => (
          <div key={index} className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">
              {item.label}
            </label>
            <input
              type="text"
              value={item.value}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        ))}

        {/* Employee Info (extra section) */}
        <div className="mt-6 mb-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Employee Information
          </h3>
          <div className="border border-gray-200 rounded-md p-3 text-sm bg-gray-50">
            <p>
              <span className="font-semibold">Name:</span>{' '}
              {payroll.userInformation.name}
            </p>
            <p>
              <span className="font-semibold">Employee No.:</span>{' '}
              {payroll.userInformation.employeeNo}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{' '}
              {payroll.userInformation.email}
            </p>
          </div>
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default MobilePayrollView;
