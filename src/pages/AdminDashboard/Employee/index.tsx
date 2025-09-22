import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showActivate, setShowActivate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const itemsPerPage = 10;

  // Sample Employees Data
  const employees = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    accountNo: `20220${i + 41}`,
    date: `0${(i % 9) + 1} Apr 2020`,
    status: i % 2 === 0 ? "Active" : "Inactive",
    name:
      i % 2 === 0
        ? `Employee ${i + 1} Active`
        : `Employee ${i + 1} Inactive`,
    email: `employee${i + 1}@email.com`,
  }));

  // Filtered results
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Status color classes
  const getStatusClasses = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium";

  // Highlight search matches
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
      <Breadcrumb pageName="Employee" />

      {/* Search Bar */}
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
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
                <th className="px-6 py-3">Account No</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(emp.accountNo)}</td>
                    <td className="px-6 py-3">{emp.date}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(emp.status)}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{highlightMatch(emp.name)}</td>
                    <td className="px-6 py-3">{highlightMatch(emp.email)}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => setShowActivate(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Activate
                      </button>
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

      {/* Activate Modal */}
      {showActivate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Activate Account</h3>
              <button onClick={() => setShowActivate(false)}>✖</button>
            </div>
            <div className="p-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="password"
                placeholder="Re-Enter Password"
                className="w-full border p-2 mb-3 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowActivate(false)}
                >
                  Cancel
                </button>
                <button className="bg-green-600 text-white px-3 py-1 rounded">
                  Confirm
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
             <div className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Update Password</h3>
              <button onClick={() => setShowUpdate(false)}>✖</button>
            </div>
            <div className="p-4">
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="password"
                placeholder="Re-Enter New Password"
                className="w-full border p-2 mb-3 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowUpdate(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#2D3F99] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
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
            <div className="bg-[#EB1D25] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold">Archive Account</h3>
              <button onClick={() => setShowArchive(false)}>✖</button>
            </div>
            <div className="p-4">
              <p>Do you want to archive this account?</p>
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

export default Employee;
