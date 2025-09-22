import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const ArchiveLeaveType = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showRecover, setShowRecover] = useState(false);
  const itemsPerPage = 10;

  // Sample Archived Leave Type Data
  const archivedTypes = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    accountNo: `ARCH-2022-${i + 100}`,
    createdAt: `2025-09-${(i % 30) + 1}`,
    name: `Archived Type ${i + 1}`,
    description: `Archived description ${i + 1}`,
    status: "Archived",
  }));

  // Filtered results
  const filteredTypes = archivedTypes.filter(
    (t) =>
      t.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTypes = filteredTypes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Breadcrumb pageName="Archive Leave Type" />

      {/* Search bar */}
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
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 text-center">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Account No.</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
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
                    <td className="px-6 py-3">{highlightMatch(t.accountNo)}</td>
                    <td className="px-6 py-3">{t.createdAt}</td>
                    <td className="px-6 py-3">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{highlightMatch(t.name)}</td>
                    <td className="px-6 py-3">{highlightMatch(t.description)}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => setShowRecover(true)}
                        className="bg-[#EB1D25] hover:bg-[#c5161e] text-white px-3 py-1 rounded"
                      >
                        Recover
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
                  ? "bg-blue-500 text-white px-3 py-1 rounded"
                  : "px-3 py-1 border rounded"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div
              className="text-white px-4 py-2 flex justify-between items-center rounded-t-lg"
              style={{ backgroundColor: "#EB1D25" }}
            >
              <h3 className="font-semibold">Recover Leave Type</h3>
              <button onClick={() => setShowRecover(false)}>✖</button>
            </div>
            <div className="p-4">
              <p>Do you want to recover this account?</p>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowRecover(false)}
                >
                  No
                </button>
                <button className="bg-[#EB1D25] text-white px-3 py-1 rounded">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArchiveLeaveType;
