import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const Type = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [leaveTypeName, setLeaveTypeName] = useState("");
  const [leaveDescription, setLeaveDescription] = useState("");
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
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTypes = filteredTypes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusClasses = (payable) =>
    payable
      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium";

  const highlightMatch = (text) => {
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
          className="bg-[#54B847] hover:bg-[#44973A] text-white px-4 py-2 rounded"
        >
          Add Leave Type
        </button>
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
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Payable</th>
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
                    <td className="px-6 py-3">{highlightMatch(t.name)}</td>
                    <td className="px-6 py-3">{highlightMatch(t.description)}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(t.payable)}>
                        {t.payable ? "Payable" : "Not Payable"}
                      </span>
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => setShowUpdate(true)}
                        className="bg-[#2D3F99] hover:bg-[#24327A] text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setShowArchive(true)}
                        className="bg-[#EB1D25] hover:bg-[#c5161e] text-white px-3 py-1 rounded"
                      >
                        Archive
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

      {/* Add Leave Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#54B847] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Add Leave Type</h3>
              <button onClick={() => setShowAdd(false)}>✖</button>
            </div>
            <div className="p-4 space-y-2">
              <input
                type="text"
                placeholder="Name"
                value={leaveTypeName}
                onChange={(e) => setLeaveTypeName(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={leaveDescription}
                onChange={(e) => setLeaveDescription(e.target.value)}
                rows={6} // slightly bigger
                className="w-full border p-2 rounded resize-none"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={leavePaid}
                  onChange={(e) => setLeavePaid(e.target.checked)}
                  id="paidLeave"
                  className="w-4 h-4"
                />
                <label htmlFor="paidLeave">Paid Leave</label>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#54B847] text-white px-3 py-1 rounded">
                  Create Leave Type
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Update Leave Type</h3>
              <button onClick={() => setShowUpdate(false)}>✖</button>
            </div>
            <div className="p-4 space-y-2">
              <input
                type="text"
                placeholder="Name"
                value={leaveTypeName}
                onChange={(e) => setLeaveTypeName(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={leaveDescription}
                onChange={(e) => setLeaveDescription(e.target.value)}
                rows={6} // slightly bigger
                className="w-full border p-2 rounded resize-none"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={leavePaid}
                  onChange={(e) => setLeavePaid(e.target.checked)}
                  id="paidLeaveUpdate"
                  className="w-4 h-4"
                />
                <label htmlFor="paidLeaveUpdate">Paid Leave</label>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Archive Modal */}
      {showArchive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div
              className="text-white px-4 py-2 flex justify-between items-center rounded-t-lg"
              style={{ backgroundColor: "#EB1D25" }}
            >
              <h3 className="font-semibold">Archive Leave Type</h3>
              <button onClick={() => setShowArchive(false)}>✖</button>
            </div>
            <div className="p-4">
              <p>Do you want to archive this leave type?</p>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowArchive(false)}
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

export default Type;
