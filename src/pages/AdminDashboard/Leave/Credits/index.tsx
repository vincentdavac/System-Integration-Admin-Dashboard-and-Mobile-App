import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { Archive, CalendarPlus2, ClipboardPen, Search } from 'lucide-react';
import AddCreditsModal from './AddCredits';
import UpdateCreditsModal from './UpdateCredits';
import ArchiveCreditsModal from './ArchiveCredits';

const Credits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [pointsToAdd, setPointsToAdd] = useState('');
  const [updateAdjustment, setUpdateAdjustment] = useState('');
  const [updateRemarks, setUpdateRemarks] = useState('');
  const [addRemarks, setAddRemarks] = useState('');

  const itemsPerPage = 10;

  // Sample Credits Data
  const credits = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        accountNo: `202200${i + 41}`,
        fullName: `Employee ${i + 1}`,
        year: 2025,
        earned: Math.floor(Math.random() * 20),
        used: Math.floor(Math.random() * 10),
        remaining: Math.floor(Math.random() * 20),
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
        <span key={i} className="bg-yellow-200 dark:bg-yellow-700">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      <Breadcrumb pageName="Leave Credits" />

      {/* Search Bar */}
      <div className="mt-4 mb-4 flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by Account No. or Full Name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-4 py-2 shadow-sm 
              focus:ring focus:ring-blue-200 
              bg-white text-gray-800 
              dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 
              dark:placeholder-gray-400 dark:focus:ring-blue-500"
          />
          <Search className="text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-100 text-center">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Employee No.</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Year</th>
                <th className="px-6 py-3">Remaining</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCredits.length > 0 ? (
                paginatedCredits.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setPointsToAdd('');
                          setAddRemarks('');
                          setShowAdd(true);
                        }}
                        className="ml-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        <CalendarPlus2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setUpdateAdjustment('');
                          setUpdateRemarks('');
                          setShowUpdate(true);
                        }}
                        className="bg-[#2D3F99] hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        <ClipboardPen size={18} />
                      </button>
                      <button
                        onClick={() => setShowArchive(true)}
                        className="text-white px-4 py-2 rounded bg-red-600 hover:bg-red-500"
                      >
                        <Archive size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
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
                  : 'px-3 py-1 border border-gray-300 dark:border-gray-700 rounded dark:text-gray-200'
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

      {/* Modals */}
      {showAdd && <AddCreditsModal onClose={() => setShowAdd(false)} />}
      {showUpdate && (
        <UpdateCreditsModal onClose={() => setShowUpdate(false)} />
      )}
      {showArchive && (
        <ArchiveCreditsModal onClose={() => setShowArchive(false)} />
      )}
    </>
  );
};

export default Credits;
