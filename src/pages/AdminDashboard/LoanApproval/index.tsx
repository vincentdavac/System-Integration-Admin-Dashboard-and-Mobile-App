import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Eye, ClipboardPen, Search } from 'lucide-react';
import ViewLoanApproval from './ViewLoanApproval';
import UpdateLoanApproval from './UpdateLoanApproval';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';

interface Loan {
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
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const LoanApproval = ({ alertsRef }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showView, setShowView] = useState(false); // <-- View Modal

  const { user, token } = useContext(AppContext)!;

  const [selectedRow, setSelectedRow] = useState<any>(null);

  const itemsPerPage = 10;

  // Sample loan data
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = async () => {
    try {
      const response = await fetch(`/api/loan-records`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        setLoans(res.data);
      } else {
        console.error('Failed to fetch employees:', res);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchLoans();
  }, [user, token]);

  // Filter table
  const filteredLoans = loans.filter(
    (loan) =>
      loan.studentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.createdDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.accountId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Status color
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'rejected':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'cancelled':
        return 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium';
    }
  };

  return (
    <>
      <Breadcrumb pageName="Loan Approvals" />

      {/* Search Bar */}
      <div className="mt-4 mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search application"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm 
               focus:ring focus:ring-blue-200 
               bg-white text-gray-800 
               dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 
               dark:placeholder-gray-400 dark:focus:ring-blue-500"
        />
        <Search className="text-gray-600 dark:text-gray-300" />
      </div>
      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-gray-700 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">Employee No.</th>
                <th className="px-6 py-3 text-center">Application No.</th>
                <th className="px-6 py-3 text-center">Loan Id</th>
                <th className="px-6 py-3 text-center">Full Name</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLoans.length > 0 ? (
                paginatedLoans.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 text-center dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{row.studentNo}</td>
                    <td className="px-6 py-3">{row.applicationId}</td>
                    <td className="px-6 py-3">{row.loanID}</td>
                    <td className="px-6 py-3">{row.fullName}</td>

                    <td className="px-6 py-3">
                      <span className={getStatusClasses(row.applicationStatus)}>
                        {row.applicationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-3">{row.createdDate}</td>

                    <td className="px-6 py-3 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowView(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="bg-[#2D3F99] hover:bg-blue-600 px-4 py-2 rounded text-white"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowUpdate(true);
                        }}
                      >
                        <ClipboardPen size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-3 text-center text-gray-500 italic dark:text-gray-400"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showView && (
        <ViewLoanApproval
          onClose={() => setShowView(false)}
          Loan={selectedRow}
        />
      )}
      {showUpdate && (
        <UpdateLoanApproval
          onClose={() => setShowUpdate(false)}
          alertsRef={alertsRef}
          refetchLoans={fetchLoans}
          Loan={selectedRow}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? 'bg-blue-500 text-white px-3 py-1 rounded'
                  : 'px-3 py-1 border dark:border-gray-600 dark:text-gray-100 rounded'
              }
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default LoanApproval;
