import React, { useState, useMemo } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const Credits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pointsToAdd, setPointsToAdd] = useState("");
  const [updateAdjustment, setUpdateAdjustment] = useState("");
  const [updateRemarks, setUpdateRemarks] = useState("");
  const [addRemarks, setAddRemarks] = useState("");

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
    []
  );

  // Filter table
  const filteredCredits = credits.filter(
    (c) =>
      c.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCredits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCredits = filteredCredits.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Highlight search
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <>
      <Breadcrumb pageName="Credits" />

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
          <table className="w-full min-w-[900px] text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">Account No.</th>
                <th className="px-6 py-3 text-center">Full Name</th>
                <th className="px-6 py-3 text-center">Year</th>
                <th className="px-6 py-3 text-center">Earned</th>
                <th className="px-6 py-3 text-center">Used</th>
                <th className="px-6 py-3 text-center">Remaining</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCredits.length > 0 ? (
                paginatedCredits.map((row, index) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 text-center">
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(row.accountNo)}</td>
                    <td className="px-6 py-3">{highlightMatch(row.fullName)}</td>
                    <td className="px-6 py-3">{row.year}</td>
                    <td className="px-6 py-3">{row.earned}</td>
                    <td className="px-6 py-3">{row.used}</td>
                    <td className="px-6 py-3">{row.remaining}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setPointsToAdd("");
                          setAddRemarks("");
                          setShowAdd(true);
                        }}
                        className="bg-[#54B847] text-white px-3 py-1 rounded hover:bg-[#44973A]"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setUpdateAdjustment("");
                          setUpdateRemarks("");
                          setShowUpdate(true);
                        }}
                        className="bg-[#2D3F99] text-white px-3 py-1 rounded hover:bg-[#24327A]"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setShowArchive(true)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-3 text-center text-gray-500 italic">
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add Modal */}
      {showAdd && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#54B847] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Add Points</h3>
              <button onClick={() => setShowAdd(false)}>✖</button>
            </div>
            <div className="p-4 space-y-2">
              <label className="block font-medium">Account No.</label>
              <input
                type="text"
                value={selectedRow.accountNo}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <label className="block font-medium">Points to Add</label>
              <input
                type="number"
                placeholder="Enter points"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block font-medium">Remarks</label>
              <textarea
                placeholder="Enter remarks"
                value={addRemarks}
                onChange={(e) => setAddRemarks(e.target.value)}
                rows={3}
                className="w-full border p-2 rounded resize-none"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#54B847] text-white px-3 py-1 rounded">
                  Add Points
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Update Points</h3>
              <button onClick={() => setShowUpdate(false)}>✖</button>
            </div>
            <div className="p-4 space-y-2">
              <label className="block font-medium">Account No.</label>
              <input
                type="text"
                value={selectedRow.accountNo}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <p>
                Current Points: <span className="font-medium">{selectedRow.remaining}</span>
              </p>
              <label className="block font-medium">Adjustment</label>
              <input
                type="number"
                placeholder="Adjustment"
                value={updateAdjustment}
                onChange={(e) => setUpdateAdjustment(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <p>
                New Points:{" "}
                <span className="font-medium">
                  {updateAdjustment
                    ? parseInt(selectedRow.remaining) + parseInt(updateAdjustment)
                    : selectedRow.remaining}
                </span>
              </p>
              <label className="block font-medium">Remarks</label>
              <textarea
                placeholder="Enter remarks"
                value={updateRemarks}
                onChange={(e) => setUpdateRemarks(e.target.value)}
                rows={3}
                className="w-full border p-2 rounded resize-none"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Archive Modal */}
      {showArchive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Archive Points</h3>
              <button onClick={() => setShowArchive(false)}>✖</button>
            </div>
            <div className="p-4">
              <p>Do you want to archive this record?</p>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowArchive(false)}
                >
                  No
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded">
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

export default Credits;
