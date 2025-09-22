import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const Relations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showView, setShowView] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const itemsPerPage = 10;

  // Sample Case Data
  const initialCases = [
    {
      id: 1,
      accountNo: "20220041",
      personInvolved: "Lourine Ashanti Puno",
      caseType: "Dispute",
      caseTitle: "Work Schedule Conflict",
      description: "Employee reported a conflict in work schedule",
      reportedBy: "Ahron Vincent Davac",
      dateReported: "2025-09-15",
      status: "Open",
      resolution: "",
      disciplinaryLevel: "",
      handledBy: "",
      dateResolved: "",
      remarks: "",
    },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 2,
      accountNo: `202200${i + 42}`,
      personInvolved: `User ${i}`,
      caseType: "Dispute",
      caseTitle: `Case ${i}`,
      description: "Reported issue description",
      reportedBy: `Reporter ${i}`,
      dateReported: "2025-09-15",
      status: "Open",
      resolution: "",
      disciplinaryLevel: "",
      handledBy: "",
      dateResolved: "",
      remarks: "",
    })),
  ];

  const [casesData, setCasesData] = useState(initialCases);

  // Filtered results
  const filteredCases = casesData.filter(
    (c) =>
      c.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.personInvolved.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  // Highlight search matches
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Breadcrumb pageName="Relations / Cases" />

      {/* Search Bar */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by account no. or person involved..."
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
          <table className="w-full min-w-[900px] text-center text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Account No.</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Case Type</th>
                <th className="px-6 py-3">Person Involved</th>
                <th className="px-6 py-3">Reported By</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCases.length > 0 ? (
                paginatedCases.map((c, index) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50 text-center">
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(c.accountNo)}</td>
                    <td className="px-6 py-3">{c.dateReported}</td>
                    <td className="px-6 py-3">{c.caseType}</td>
                    <td className="px-6 py-3">{c.personInvolved}</td>
                    <td className="px-6 py-3">{c.reportedBy}</td>
                    <td className="px-6 py-3">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        className="rounded-md bg-[#2D3F99] px-4 py-2 text-white hover:bg-[#24327A]"
                        onClick={() => {
                          setSelectedRow(c);
                          setShowView(true);
                        }}
                      >
                        View
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

      {/* Pagination Controls */}
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

      {/* View Modal */}
      {showView && selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">

            {/* Header */}
            <div className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
              <h3 className="font-semibold">View Case</h3>
              <button onClick={() => setShowView(false)} className="text-white text-lg font-bold">
                ✖
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex-1 overflow-y-auto space-y-2">
              <h3 className="font-bold border-b pb-1 mb-2">Case Information</h3>
              <p><strong>Person Involved:</strong> {selectedRow.personInvolved}</p>
              <p><strong>Case Type:</strong> {selectedRow.caseType}</p>
              <p><strong>Case Title:</strong> {selectedRow.caseTitle}</p>
              <p><strong>Details:</strong> {selectedRow.description}</p>
              <p><strong>Reported By:</strong> {selectedRow.reportedBy}</p>
              <p><strong>Date Reported:</strong> {selectedRow.dateReported}</p>
              <p><strong>Status:</strong> {selectedRow.status}</p>

              <hr className="my-2" />

              <p><strong>Resolution:</strong> {selectedRow.resolution || "------"}</p>
              <p><strong>Disciplinary Level:</strong> {selectedRow.disciplinaryLevel || "------"}</p>
              <p><strong>Handled By:</strong> {selectedRow.handledBy || "------"}</p>
              <p><strong>Date Resolved:</strong> {selectedRow.dateResolved || "------"}</p>
              <p><strong>Remarks:</strong> {selectedRow.remarks || "------"}</p>
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-end space-x-2 sticky bottom-0 bg-white z-10">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowView(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Relations;
