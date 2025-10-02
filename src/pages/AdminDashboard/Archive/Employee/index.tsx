import React, { useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { ArchiveRestore } from 'lucide-react';
import EmployeeRecoverModal from './EmployeeRecover';

const ArchiveEmployee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRecover, setShowRecover] = useState(false);
  const itemsPerPage = 10;

  // Sample Employees Data (Archived)
  const employees = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    accountNo: `20230${i + 41}`,
    date: `0${(i % 9) + 1} May 2021`,
    status: 'Archived',
    name: `Archived Employee ${i + 1}`,
    email: `archived${i + 1}@email.com`,
  }));

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

  // Highlight search matches
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
      <Breadcrumb pageName="Archived Employee" />

      {/* Search Bar */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm 
                     focus:ring focus:ring-blue-200 
                     bg-white dark:bg-gray-900 
                     text-gray-700 dark:text-gray-100 
                     border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-100 text-center">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Employee No.</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(emp.accountNo)}
                    </td>
                    <td className="px-6 py-3">{highlightMatch(emp.name)}</td>
                    <td className="px-6 py-3">{highlightMatch(emp.email)}</td>
                    <td className="px-6 py-3">{emp.date}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => setShowRecover(true)}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                      >
                        <ArchiveRestore size={18} />
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
                  : 'px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 rounded'
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

      {/* Recover Modal */}
      {showRecover && (
        <EmployeeRecoverModal onClose={() => setShowRecover(false)} />
      )}
    </>
  );
};

export default ArchiveEmployee;
