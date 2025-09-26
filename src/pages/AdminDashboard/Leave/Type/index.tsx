import React, { useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { Archive, CalendarPlus2, ClipboardPen } from 'lucide-react';
import AddLeaveTypesModal from './AddLeaveType';
import UpdateLeaveTypesModal from './UpdateLeaveType';
import ArchiveLeaveTypeModal from './ArchiveLeaveType';

const Type = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [leaveTypeName, setLeaveTypeName] = useState('');
  const [leaveDescription, setLeaveDescription] = useState('');
  const [leavePaid, setLeavePaid] = useState(false);
  const itemsPerPage = 10;

  // Sample Type Data
  const types = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    accountNo: `202200${i + 44}`,
    createdAt: `2025-09-${(i % 30) + 1}`,
    name: `Type ${i + 1}`,
    description: `Description ${i + 1}`,
    payable: i % 2 === 0,
  }));

  // Filtered results
  const filteredTypes = types.filter(
    (t) =>
      t.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTypes = filteredTypes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusClasses = (payable: any) =>
    payable
      ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium';

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
      <Breadcrumb pageName="Leave Types" />

      {/* Search bar and Add Leave button */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-4 mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by account no. or name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
        <button
          onClick={() => setShowAdd(true)}
          className="ml-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 p-2 rounded "
        >
          <CalendarPlus2 size={18} />
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 text-center">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Created At</th>

                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTypes.length > 0 ? (
                paginatedTypes.map((t, index) => (
                  <tr
                    key={t.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(t.name)}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(t.description)}
                    </td>

                    <td className="px-6 py-3">{t.createdAt}</td>

                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => setShowUpdate(true)}
                        className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-600"
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

      {showAdd && <AddLeaveTypesModal onClose={() => setShowAdd(false)} />}

      {showUpdate && (
        <UpdateLeaveTypesModal onClose={() => setShowUpdate(false)} />
      )}

      {showArchive && (
        <ArchiveLeaveTypeModal onClose={() => setShowArchive(false)} />
      )}
    </>
  );
};

export default Type;
