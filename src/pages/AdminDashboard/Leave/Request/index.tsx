import React, { useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import ViewLeaveRequestModal from './ViewLeaveRequest';
import { ClipboardPen, Eye, Search } from 'lucide-react';
import UpdateLeaveRequestModal from './UpdateLeaveRequest';

const Request = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [selectedRow, setSelectedRow] = useState<any>(null);
  const itemsPerPage = 10;

  // Sample Leave Requests Data
  const initialLeaveRequests = [
    {
      id: 1,
      accountNo: '20220041',
      name: 'Lourine Ashanti Puno',
      department: 'IT',
      position: 'Developer',
      date: '2025-09-15',
      startDate: '2025-01-13',
      endDate: '2025-01-17',
      totalDays: 3,
      leaveType: 'Sick Leave',
      reason: 'Medical Appointment',
      email: 'davacvincent@gmail.com',
      status: 'Pending',
      reviewedBy: 'Ahron Vincent Davac',
      approvalDate: '2025-09-14',
      remarks: 'Approved with Pay',
      attachment: '',
    },
    {
      id: 2,
      accountNo: '20220042',
      name: 'Maria Cruz',
      department: 'HR',
      position: 'Coordinator',
      date: '2025-09-15',
      startDate: '2025-02-24',
      endDate: '2025-02-25',
      totalDays: 2,
      leaveType: 'Emergency Leave',
      reason: 'Family Emergency',
      email: 'cruzmaria@gmail.com',
      status: 'Approved',
      reviewedBy: 'Ahron Vincent Davac',
      approvalDate: '2025-09-14',
      remarks: 'Approved without Pay',
      attachment: '',
    },
    {
      id: 3,
      accountNo: '20220043',
      name: 'John Paul Santos',
      department: 'Finance',
      position: 'Analyst',
      date: '2025-09-15',
      startDate: '2025-03-10',
      endDate: '2025-03-14',
      totalDays: 5,
      leaveType: 'Vacation Leave',
      reason: 'Vacation',
      email: 'santosjohnpaul@gmail.com',
      status: 'Declined',
      reviewedBy: 'Ahron Vincent Davac',
      approvalDate: '2025-09-14',
      remarks: 'Not allowed due to workload',
      attachment: '',
    },
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 4,
      accountNo: `202200${i + 44}`,
      name: `User ${i}`,
      department: 'IT',
      position: 'Staff',
      date: '2025-09-15',
      startDate: '2025-04-01',
      endDate: '2025-04-05',
      totalDays: 5,
      leaveType: i % 2 === 0 ? 'Vacation Leave' : 'Sick Leave',
      reason: 'Personal',
      email: `user${i}@gmail.com`,
      status: i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Approved' : 'Declined',
      reviewedBy: 'System Admin',
      approvalDate: '2025-09-14',
      remarks: 'Auto generated',
      attachment: '',
    })),
  ];

  const [leaveRequestsData, setLeaveRequestsData] =
    useState(initialLeaveRequests);

  // Filtered results
  const filteredRequests = leaveRequestsData.filter(
    (req) =>
      req.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Status badge (unchanged as requested)
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'Declined':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium';
    }
  };

  // Highlight search matches
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 dark:bg-yellow-800">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // Save changes handler
  const handleSaveChanges = () => {
    if (!selectedRow) return;

    const updatedData = leaveRequestsData.map((req) =>
      req.id === selectedRow.id ? selectedRow : req,
    );
    setLeaveRequestsData(updatedData);
    setShowView(false);
    alert('Changes saved successfully!');
  };

  return (
    <>
      <Breadcrumb pageName="Leave Requests" />

      {/* Search Bar */}
      <div className="mt-4 mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by account no. or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm 
               focus:ring focus:ring-blue-200 
               bg-white text-gray-800 
               dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 
               dark:placeholder-gray-400 dark:focus:ring-blue-500"
        />

        <Search className="text-gray-600 dark:text-gray-300" />
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-gray-700 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">Account No.</th>
                <th className="px-6 py-3 text-center">Date</th>
                <th className="px-6 py-3 text-center">Start Date</th>
                <th className="px-6 py-3 text-center">End Date</th>
                <th className="px-6 py-3 text-center">Email Address</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((req, index) => (
                  <tr
                    key={req.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(req.accountNo)}
                    </td>
                    <td className="px-6 py-3">{req.date}</td>
                    <td className="px-6 py-3">{req.startDate}</td>
                    <td className="px-6 py-3">{req.endDate}</td>
                    <td className="px-6 py-3">{highlightMatch(req.email)}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(req.status)}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                          setSelectedRow(req);
                          setShowView(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                          setSelectedRow(req);
                          setShowUpdate(true);
                        }}
                      >
                        <ClipboardPen size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
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

      {/* Pagination Controls */}
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
                  : 'px-3 py-1 border dark:border-gray-600 dark:text-gray-100 rounded'
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

      <ViewLeaveRequestModal
        isOpen={showView}
        onClose={() => setShowView(false)}
      />

      <UpdateLeaveRequestModal
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
      />
    </>
  );
};

export default Request;
