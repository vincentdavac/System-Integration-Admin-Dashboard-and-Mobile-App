import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const Request = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showView, setShowView] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const itemsPerPage = 10;

  // Sample Leave Requests Data
  const initialLeaveRequests = [
    {
      id: 1,
      accountNo: "20220041",
      name: "Lourine Ashanti Puno",
      department: "IT",
      position: "Developer",
      date: "2025-09-15",
      startDate: "2025-01-13",
      endDate: "2025-01-17",
      totalDays: 3,
      leaveType: "Sick Leave",
      reason: "Medical Appointment",
      email: "davacvincent@gmail.com",
      status: "Pending",
      reviewedBy: "Ahron Vincent Davac",
      approvalDate: "2025-09-14",
      remarks: "Approved with Pay",
      attachment: "",
    },
    {
      id: 2,
      accountNo: "20220042",
      name: "Maria Cruz",
      department: "HR",
      position: "Coordinator",
      date: "2025-09-15",
      startDate: "2025-02-24",
      endDate: "2025-02-25",
      totalDays: 2,
      leaveType: "Emergency Leave",
      reason: "Family Emergency",
      email: "cruzmaria@gmail.com",
      status: "Approved",
      reviewedBy: "Ahron Vincent Davac",
      approvalDate: "2025-09-14",
      remarks: "Approved without Pay",
      attachment: "",
    },
    {
      id: 3,
      accountNo: "20220043",
      name: "John Paul Santos",
      department: "Finance",
      position: "Analyst",
      date: "2025-09-15",
      startDate: "2025-03-10",
      endDate: "2025-03-14",
      totalDays: 5,
      leaveType: "Vacation Leave",
      reason: "Vacation",
      email: "santosjohnpaul@gmail.com",
      status: "Declined",
      reviewedBy: "Ahron Vincent Davac",
      approvalDate: "2025-09-14",
      remarks: "Not allowed due to workload",
      attachment: "",
    },
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 4,
      accountNo: `202200${i + 44}`,
      name: `User ${i}`,
      department: "IT",
      position: "Staff",
      date: "2025-09-15",
      startDate: "2025-04-01",
      endDate: "2025-04-05",
      totalDays: 5,
      leaveType: i % 2 === 0 ? "Vacation Leave" : "Sick Leave",
      reason: "Personal",
      email: `user${i}@gmail.com`,
      status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Approved" : "Declined",
      reviewedBy: "System Admin",
      approvalDate: "2025-09-14",
      remarks: "Auto generated",
      attachment: "",
    })),
  ];

  const [leaveRequestsData, setLeaveRequestsData] = useState(initialLeaveRequests);

  // Filtered results
  const filteredRequests = leaveRequestsData.filter(
    (req) =>
      req.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Status badge (for table only)
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium";
      case "Declined":
        return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  // Highlight search matches
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

  // Save changes handler
  const handleSaveChanges = () => {
    if (!selectedRow) return;

    const updatedData = leaveRequestsData.map((req) =>
      req.id === selectedRow.id ? selectedRow : req
    );
    setLeaveRequestsData(updatedData);
    setShowView(false);
    alert("Changes saved successfully!");
  };

  return (
    <>
      <Breadcrumb pageName="Leave Requests" />

      {/* Search Bar */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by account no. or email..."
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
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((req, index) => (
                  <tr
                    key={req.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(req.accountNo)}</td>
                    <td className="px-6 py-3">{req.date}</td>
                    <td className="px-6 py-3">{req.startDate}</td>
                    <td className="px-6 py-3">{req.endDate}</td>
                    <td className="px-6 py-3">{highlightMatch(req.email)}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(req.status)}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        className="rounded-md bg-[#2D3F99] px-4 py-2 text-white hover:bg-[#24327A]"
                        onClick={() => {
                          setSelectedRow(req);
                          setShowView(true);
                        }}
                      >
                        View Request
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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
              <h3 className="font-semibold">View Leave Request</h3>
              <button
                onClick={() => setShowView(false)}
                className="text-white text-lg font-bold"
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex-1 overflow-y-auto space-y-2">
              <h3 className="font-bold border-b pb-1 mb-2">Employee Information</h3>
              <p><strong>Employee ID:</strong> {selectedRow.accountNo}</p>
              <p><strong>Name:</strong> {selectedRow.name}</p>
              <p><strong>Department:</strong> {selectedRow.department}</p>
              <p><strong>Position:</strong> {selectedRow.position}</p>
              <p><strong>Attachment:</strong> {selectedRow.attachment || "—"}</p>

              <h3 className="font-bold border-b pb-1 mt-4 mb-2">Leave Request Information</h3>
              <p><strong>Leave Type:</strong> {selectedRow.leaveType}</p>
              <p><strong>Start Date:</strong> {selectedRow.startDate}</p>
              <p><strong>End Date:</strong> {selectedRow.endDate}</p>
              <p><strong>Total Days:</strong> {selectedRow.totalDays}</p>
              <p><strong>Reason:</strong> {selectedRow.reason}</p>

              <h3 className="font-bold border-b pb-1 mt-4 mb-2">HR/Admin Information</h3>
              <p>
                <strong>Status:</strong>{" "}
                <select
                  value={selectedRow.status}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, status: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                  <option value="Pending">Pending</option>
                </select>
              </p>
              <p><strong>Reviewed By:</strong> {selectedRow.reviewedBy}</p>
              <p><strong>Approval Date:</strong> {selectedRow.approvalDate}</p>

              <div className="mt-2">
                <p><strong>Remarks:</strong></p>
                <textarea
                  value={selectedRow.remarks}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, remarks: e.target.value })
                  }
                  className="border border-gray-300 rounded px-3 py-2 text-sm w-full h-20 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Enter remarks here..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-end space-x-2 sticky bottom-0 bg-white z-10">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowView(false)}
              >
                Close
              </button>
              <button
                className="text-white px-4 py-2 rounded hover:bg-[#24327A]"
                style={{ backgroundColor: "#2D3F99" }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
