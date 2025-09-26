import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { ArchiveRestore } from 'lucide-react';
import CreditsRecoverModal from './CreditsRecover';

const ArchiveCredits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRecover, setShowRecover] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const itemsPerPage = 10;

  // Sample Archived Credits Data
  const credits = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        accountNo: `ARCH-20220${i + 41}`,
        fullName: `Employee ${i + 1}`,
        year: 2025,
        earned: Math.floor(Math.random() * 20),
        used: Math.floor(Math.random() * 10),
        remaining: Math.floor(Math.random() * 20),
        status: 'Archived',
      })),
    [],
  );

  // Filter table
  const filteredCredits = credits.filter(
    (c) =>
      c.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredCredits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCredits = filteredCredits.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Highlight search
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
      <Breadcrumb pageName="Archive Credits" />

      {/* Search Bar */}
      <div className="mt-4 mb-4 flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by Account No. or Full Name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[950px] text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">Employee No.</th>
                <th className="px-6 py-3 text-center">Full Name</th>
                <th className="px-6 py-3 text-center">Year</th>
                <th className="px-6 py-3 text-center">Remaining</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCredits.length > 0 ? (
                paginatedCredits.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(row.accountNo)}
                    </td>
                    <td className="px-6 py-3">
                      {highlightMatch(row.fullName)}
                    </td>
                    <td className="px-6 py-3">{row.year}</td>
                    <td className="px-6 py-3">{row.remaining}</td>

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
                    colSpan={9}
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Recover Modal */}
      {showRecover && (
        <CreditsRecoverModal onClose={() => setShowRecover(false)} />
      )}
    </>
  );
};

export default ArchiveCredits;
