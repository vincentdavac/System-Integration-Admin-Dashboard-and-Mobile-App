import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { Archive, CalendarPlus2, ClipboardPen, Search } from 'lucide-react';
import AddLeaveTypesModal from './AddLeaveType';
import UpdateLeaveTypesModal from './UpdateLeaveType';
import ArchiveLeaveTypeModal from './ArchiveLeaveType';
import { AppContext } from '../../../../context/AppContext';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';

interface LeaveType {
  id: string;
  name: string;
  description: string;
  isArchive: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const Type = ({ alertsRef }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [leavetype, setLeaveType] = useState<LeaveType[]>([]);

  const { user, token } = useContext(AppContext)!;

  const itemsPerPage = 10;

  const fetchLeaveRequest = async () => {
    try {
      const response = await fetch(`/api/leave-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        setLeaveType(res.data);
      } else {
        console.error('Failed to fetch employees:', res);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchLeaveRequest();
  }, [user, token]);

  // Filtered results
  const filteredTypes = leavetype.filter(
    (t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.createdTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.updatedTime.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTypes = filteredTypes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      <Breadcrumb pageName="Leave Types" />

      {/* Search bar and Add Leave button */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-4 mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by account no. or name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-4 py-2 shadow-sm 
              focus:ring focus:ring-blue-200 
              bg-white text-gray-800 
              dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 
              dark:placeholder-gray-400 dark:focus:ring-blue-500"
          />
          <Search className="text-gray-600 dark:text-gray-300" />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="ml-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          <CalendarPlus2 size={18} />
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-100 text-center">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTypes.length > 0 ? (
                paginatedTypes.map((t, index) => (
                  <tr
                    key={t.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{t.name}</td>
                    <td className="px-6 py-3">{t.description}</td>
                    <td className="px-6 py-3">{t.createdDate}</td>
                    <td className="px-6 py-3">{t.createdTime}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setShowUpdate(true);
                          setSelectedRow(t);
                        }}
                        className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-600"
                      >
                        <ClipboardPen size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setShowArchive(true);
                          setSelectedRow(t);
                        }}
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
                    colSpan={5}
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

      {/* Pagination */}
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
                  : 'px-3 py-1 border border-gray-300 dark:border-gray-700 rounded dark:text-gray-200'
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

      {/* Modals */}
      {showAdd && (
        <AddLeaveTypesModal
          onClose={() => setShowAdd(false)}
          alertsRef={alertsRef}
          refetchLeaveType={fetchLeaveRequest}
        />
      )}

      {showUpdate && (
        <UpdateLeaveTypesModal
          onClose={() => setShowUpdate(false)}
          alertsRef={alertsRef}
          refetchLeaveType={fetchLeaveRequest}
          LeaveType={selectedRow}
        />
      )}

      {showArchive && (
        <ArchiveLeaveTypeModal
          onClose={() => setShowArchive(false)}
          alertsRef={alertsRef}
          refetchLeaveType={fetchLeaveRequest}
          LeaveType={selectedRow}
        />
      )}
    </>
  );
};

export default Type;
