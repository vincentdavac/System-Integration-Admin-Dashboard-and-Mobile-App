import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Eye, Search } from 'lucide-react';
import ViewPayroll from './ViewPayroll';

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showView, setShowView] = useState(false);

  type Loan = {
    id: number;
    accountNo: string;
    fullName: string;
    loanType: string;
    loanAmount: number;
    approvedAmount: number;
    interestRate: string;
    repaymentTerms: string;
    applicationDate: string;
    status: string;
    approverId: string;
    approvalDate: string;
  };

  const [selectedRow, setSelectedRow] = useState<Loan | null>(null);
  const [loans] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      accountNo: `202200${i + 41}`,
      fullName: `Employee ${i + 1}`,
      loanType: 'Personal Loan',
      loanAmount: 50000,
      approvedAmount: 0,
      interestRate: '5%',
      repaymentTerms: '12 months',
      applicationDate: '2025-09-15',
      status: 'Pending',
      approverId: '',
      approvalDate: '',
    })),
  );

  const itemsPerPage = 10;

  // Filter table
  const filteredLoans = loans.filter(
    (l) =>
      l.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Highlight search
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 dark:bg-yellow-600">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      <Breadcrumb pageName="Payroll Monitoring" />

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
          <table className="w-full min-w-[900px] text-left text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">Employee No.</th>
                <th className="px-6 py-3 text-center">Full Name</th>
                <th className="px-6 py-3 text-center">Cutoff Start</th>
                <th className="px-6 py-3 text-center">Cutoff End</th>
                <th className="px-6 py-3 text-center">Created At</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLoans.length > 0 ? (
                paginatedLoans.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(row.accountNo)}
                    </td>
                    <td className="px-6 py-3">
                      {highlightMatch(row.fullName)}
                    </td>
                    <td className="px-6 py-3">{row.applicationDate}</td>
                    <td className="px-6 py-3">{row.applicationDate}</td>
                    <td className="px-6 py-3">{row.applicationDate}</td>
                    <td className="px-6 py-3">
                      <button
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowView(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-3 text-center text-gray-500 dark:text-gray-400 italic"
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
      {showView && <ViewPayroll onClose={() => setShowView(false)} />}

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

export default Payroll;
