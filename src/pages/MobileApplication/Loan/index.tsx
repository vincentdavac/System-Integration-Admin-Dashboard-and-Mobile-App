import { ArrowLeft, Search } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface LoanRecord {
  id: number;
  loanID: string;
  loanAmount: string;
  createdDate: string;
  fullName: string;
  applicationStatus: string;
  borrowerName: string;
}

const MobileLoan = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;

  const [loans, setLoans] = useState<LoanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user?.employeeNo) return;

    const fetchLoans = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/loan-records/user/${user.employeeNo}`,
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
          setLoans(data.data);
        } else {
          console.error('Failed to fetch loans:', data.message);
        }
      } catch (error) {
        console.error('Error fetching loan records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user?.employeeNo]);

  const filteredLoans = loans.filter((loan) =>
    Object.values(loan).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

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
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">LOAN</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search loan id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Loan History
        </h2>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading loans...</p>
        ) : filteredLoans.length === 0 ? (
          <p className="text-gray-500 text-lm">No loan records found.</p>
        ) : (
          <div className="space-y-4">
            {filteredLoans.map((loan) => (
              <div
                key={loan.id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                {/* Amount + Button */}
                <div className="flex items-center justify-between mb-1">
                  <p className="text-2xl font-bold text-black">
                    ₱ {parseFloat(loan.loanAmount).toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/mobile/loan-view/${loan.id}`)}
                    className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                  >
                    View Now
                  </button>
                </div>
                <p className="text-sm text-gray-600 capitalize">
                  Status: {loan.applicationStatus}
                </p>

                {/* Date + Loan ID */}
                <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                  <p>
                    <span className="font-semibold">Date:</span>{' '}
                    {loan.createdDate}
                  </p>
                  <p>
                    <span className="font-semibold">Loan ID:</span>{' '}
                    {loan.loanID}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extra bottom space */}
      <div className="h-10"></div>
    </div>
  );
};

export default MobileLoan;
