import React, { useState, useMemo } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

const LoanApproval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showView, setShowView] = useState(false); // <-- View Modal
  const [selectedRow, setSelectedRow] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [remarks, setRemarks] = useState("");

  const itemsPerPage = 10;

  // Sample loan data
  const [loans, setLoans] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      accountNo: `202200${i + 41}`,
      fullName: `Employee ${i + 1}`,
      loanType: "Personal Loan",
      loanAmount: 50000,
      approvedAmount: 0,
      interestRate: "5%",
      repaymentTerms: "12 months",
      applicationDate: "2025-09-15",
      status: "Pending",
      approverId: "",
      approvalDate: "",
    }))
  );

  // Filter table
  const filteredLoans = loans.filter(
    (l) =>
      l.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Status color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium";
      case "Rejected":
        return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium";
      case "Cancelled":
        return "bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  // Highlight search
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  // Save status update
  const handleSaveChanges = () => {
    if (!selectedRow) return;
    setLoans((prevLoans) =>
      prevLoans.map((l) =>
        l.id === selectedRow.id ? { ...l, status: statusUpdate } : l
      )
    );
    setShowUpdate(false);
  };

  return (
    <>
      <Breadcrumb pageName="Loan Approvals" />

      {/* Search Bar */}
      <div className="mt-4 mb-4">
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
                <th className="px-6 py-3 text-center">Loan Type</th>
                <th className="px-6 py-3 text-center">Date</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLoans.length > 0 ? (
                paginatedLoans.map((row, index) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 text-center">
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(row.accountNo)}</td>
                    <td className="px-6 py-3">{highlightMatch(row.fullName)}</td>
                    <td className="px-6 py-3">{row.loanType}</td>
                    <td className="px-6 py-3">{row.applicationDate}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(row.status)}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        className="bg-[#2D3F99] px-3 py-1 rounded hover:bg-[#2D3F99] text-white"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowView(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setStatusUpdate(row.status);
                          setRemarks("");
                          setShowUpdate(true);
                        }}
                        className="bg-[#2D3F99] text-white px-3 py-1 rounded hover:bg-[#2D3F99]"
                      >
                        Update
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

      {/* View Modal */}
      {showView && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Loan Details</h3>
              <button onClick={() => setShowView(false)}>✖</button>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <p><strong>Full Name:</strong> {selectedRow.fullName}</p>
              <p><strong>Loan Type:</strong> {selectedRow.loanType}</p>
              <p><strong>Loan Amount:</strong> {selectedRow.loanAmount}</p>
              <p><strong>Approved Amount:</strong> {selectedRow.approvedAmount}</p>
              <p><strong>Interest Rate:</strong> {selectedRow.interestRate}</p>
              <p><strong>Repayment Terms:</strong> {selectedRow.repaymentTerms}</p>
              <p><strong>Application Date:</strong> {selectedRow.applicationDate}</p>
              <p><strong>Status:</strong> {selectedRow.status}</p>
              <p><strong>Approver ID:</strong> {selectedRow.approverId || "—"}</p>
              <p><strong>Approval Date:</strong> {selectedRow.approvalDate || "—"}</p>
            </div>
            <div className="p-4 flex justify-end">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowView(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Update Loan Status</h3>
              <button onClick={() => setShowUpdate(false)}>✖</button>
            </div>
            <div className="p-4 space-y-2">
              <label className="block font-medium">Employee</label>
              <input
                type="text"
                value={selectedRow.fullName}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <label className="block font-medium">Status</label>
              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Cancelled</option>
              </select>
              <label className="block font-medium">Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="w-full border p-2 rounded resize-none"
                placeholder="Enter remarks..."
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#2D3F99] text-white px-3 py-1 rounded"
                  onClick={handleSaveChanges}
                >
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

export default LoanApproval;
