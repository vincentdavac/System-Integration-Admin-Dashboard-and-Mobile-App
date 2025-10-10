import { ArrowLeft, Search } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface PayrollRecord {
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

const MobilePayrollHistory = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;

  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const fetchPayrolls = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/payrolls/user/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );

        const data = await res.json();

        if (res.ok && data?.data) {
          setPayrolls(data.data);
        } else {
          console.error('Failed to fetch payrolls:', data.message);
        }
      } catch (error) {
        console.error('Error fetching payroll records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, [user?.id, token]);

  const filteredPayrolls = payrolls.filter((payroll) => {
    // Flatten all searchable values, including nested userInformation
    const valuesToSearch = [
      payroll.id,
      payroll.userInformation?.employeeNo,
      payroll.userInformation?.name,
      payroll.userInformation?.email,
      payroll.cutoffStart,
      payroll.cutoffEnd,
      payroll.grossSalary,
      payroll.totalDeductions,
      payroll.netSalary,
      payroll.salaryDate,
      payroll.releaseDate,
      payroll.totalHours,
      payroll.regularHours,
      payroll.overtimeHours,
      payroll.createdDate,
      payroll.updatedDate,
    ]
      .filter(Boolean) // remove undefined/null
      .join(' ') // combine into one string for easier search
      .toLowerCase();

    return valuesToSearch.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Header Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back Button + Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Payroll</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search payroll (e.g. October)"
              className="w-full outline-none text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Payroll History
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 mt-6">
            Loading payroll records...
          </p>
        ) : filteredPayrolls.length === 0 ? (
          <p className=" text-gray-500 text-lm">No payroll records found.</p>
        ) : (
          <div className="space-y-4">
            {filteredPayrolls.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {item.netSalary}
                    </p>
                    <p className="text-sm text-gray-600">
                      Employee No. {item.userInformation?.employeeNo || 'N/A'}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/mobile/payroll-view/${item.id}`)}
                    className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                  >
                    View Now
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                  <p>
                    <span className="font-semibold">Date:</span>{' '}
                    {item.salaryDate || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Cutoff End:</span>{' '}
                    {item.cutoffEnd || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extra bottom space */}
      <div className="h-14"></div>
    </div>
  );
};

export default MobilePayrollHistory;
