import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const Actions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  // Form States
  const [meetingId, setMeetingId] = useState("");
  const [actionType, setActionType] = useState("");
  const [description, setDescription] = useState("");

  const itemsPerPage = 10;

  // Sample Meeting Data
  const meetings = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    accountNo: `ACCT-${2000 + i}`,
    date: `2025-09-${(i % 30) + 1}`,
    caseId: `CASE-${1000 + i}`,
    actionType: "Verbal Warning",
    description: `Sample description for case ${1000 + i}`,
    handledBy: `Admin ${i + 1}`,
  }));

  // Filtered results
  const filteredMeetings = meetings.filter((m) =>
    m.caseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Breadcrumb pageName="Actions" />

      {/* Search bar and Add button */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-4 mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by Case ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
        <button
          onClick={() => {
            setMeetingId("");
            setActionType("");
            setDescription("");
            setShowAdd(true);
          }}
          className="bg-[#54B847] hover:bg-[#44973A] text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 text-center">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Account No.</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Case ID</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Handled By</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeetings.length > 0 ? (
                paginatedMeetings.map((m, index) => (
                  <tr
                    key={m.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{m.accountNo}</td>
                    <td className="px-6 py-3">{m.date}</td>
                    <td className="px-6 py-3">{m.caseId}</td>
                    <td className="px-6 py-3">{m.actionType}</td>
                    <td className="px-6 py-3">{m.description}</td>
                    <td className="px-6 py-3">{m.handledBy}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRow(m);
                          setShowView(true);
                        }}
                        className="bg-[#2D3F99] hover:bg-[#24327A] text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRow(m);
                          setMeetingId(m.caseId);
                          setActionType(m.actionType);
                          setDescription(m.description);
                          setShowUpdate(true);
                        }}
                        className="bg-[#2D3F99] hover:bg-[#24327A] text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
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

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#54B847] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Add Case Action</h3>
              <button onClick={() => setShowAdd(false)}>✖</button>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="search"
                placeholder="Search Case ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">None</option>
                <option value="Verbal Warning">Verbal Warning</option>
                <option value="Written Warning">Written Warning</option>
                <option value="Final Warning">Final Warning</option>
                <option value="Suspension">Suspension</option>
                <option value="Termination">Termination</option>
              </select>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
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
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showView && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">View Case Action</h3>
              <button onClick={() => setShowView(false)}>✖</button>
            </div>
            <div className="p-4 space-y-3">
              <p>
                <strong>Case ID:</strong> {selectedRow.caseId}
              </p>
              <p>
                <strong>Action Type:</strong> {selectedRow.actionType}
              </p>
              <p>
                <strong>Description:</strong> {selectedRow.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Update Case Action</h3>
              <button onClick={() => setShowUpdate(false)}>✖</button>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Case ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">None</option>
                <option value="Verbal Warning">Verbal Warning</option>
                <option value="Written Warning">Written Warning</option>
                <option value="Final Warning">Final Warning</option>
                <option value="Suspension">Suspension</option>
                <option value="Termination">Termination</option>
              </select>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full border p-2 rounded resize-none"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#2D3F99] text-white px-3 py-1 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Actions;
