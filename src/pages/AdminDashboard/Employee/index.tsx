import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import ActivateModal from './ActivateModal';
import UpdateModal from './UpdateModal';
import ArchiveModal from './ArchiveModal';
import { CheckCircle, RefreshCw, Search, XCircle } from 'lucide-react';

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActivate, setShowActivate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const itemsPerPage = 10;

  // Sample Employees Data
  const employees = [
    {
      id: 1,
      accountNo: 'EMP001',
      date: '2025-09-24',
      status: 'Active',
      name: 'Vincent Davac',
      email: 'vincentdavac@gmail.com',
    },
    {
      id: 2,
      accountNo: 'EMP002',
      date: '2025-09-20',
      status: 'Archived',
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
    },
  ];

  // Filtered results
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Status color classes
  const getStatusClasses = (status: string) =>
    status === 'Active'
      ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium';

  // Highlight search matches
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      <Breadcrumb pageName="Employee" />

      {/* Search Bar */}
      <div className="mt-4 mb-4 flex items-center gap-2 ">
        <input
          type="text"
          placeholder="Search"
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

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-200 text-center">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Account No</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(emp.accountNo)}
                    </td>
                    <td className="px-6 py-3">{emp.date}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(emp.status)}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{highlightMatch(emp.name)}</td>
                    <td className="px-6 py-3">{highlightMatch(emp.email)}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => setShowActivate(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => setShowUpdate(true)}
                        className="bg-[#2D3F99] hover:bg-[#24327A] text-white px-4 py-2 rounded"
                      >
                        <RefreshCw size={18} />
                      </button>
                      <button
                        onClick={() => setShowArchive(true)}
                        className="bg-[#EB1D25] hover:bg-[#c5161e] text-white px-4 py-2 rounded"
                      >
                        <XCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-3 text-center text-gray-500 italic"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {showActivate && <ActivateModal onClose={() => setShowActivate(false)} />}
      {showUpdate && <UpdateModal onClose={() => setShowUpdate(false)} />}
      {showArchive && <ArchiveModal onClose={() => setShowArchive(false)} />}

      {/* Pagination */}
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
                  : 'px-3 py-1 border rounded'
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

export default Employee;
