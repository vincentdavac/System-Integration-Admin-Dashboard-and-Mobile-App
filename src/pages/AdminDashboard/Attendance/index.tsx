import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Eye, Search } from 'lucide-react';
import ViewAttendance from './ViewAttendance';
import API_BASE_URL from '../../../config/api';
interface Attendance {
  id: string;
  student_no: string;
  student_name: string;
  section: string;
  time_in: string;
  time_out: string;
  rendered_hours: string;
  createdDate: string;
}
import { AppContext } from '../../../context/AppContext';

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showView, setShowView] = useState(false);
  const { user, token } = useContext(AppContext)!;

  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const itemsPerPage = 10;

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/attendance-records`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();

      if (response.ok && data.data) {
        setAttendance(data.data);
      } else {
        console.error('Failed to fetch employees:', data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchEmployees();
  }, [user, token]);

  const filteredLoans = attendance.filter(
    (attend) =>
      attend.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attend.student_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attend.createdDate.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      <Breadcrumb pageName="Attendance Monitoring" />

      {/* Search Bar */}
      <div className="mt-4 mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search application"
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

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-gray-700 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">Employee No.</th>
                <th className="px-6 py-3 text-center">Full Name</th>
                <th className="px-6 py-3 text-center">Section</th>
                <th className="px-6 py-3 text-center">Time In</th>
                <th className="px-6 py-3 text-center">Time Out</th>
                <th className="px-6 py-3 text-center">Created At</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLoans.length > 0 ? (
                paginatedLoans.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{row.student_no}</td>
                    <td className="px-6 py-3">{row.student_name}</td>
                    <td className="px-6 py-3">{row.section}</td>
                    <td className="px-6 py-3">{row.time_in}</td>
                    <td className="px-6 py-3">{row.time_out}</td>
                    <td className="px-6 py-3">{row.createdDate}</td>

                    <td className="px-6 py-3 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowView(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
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

      {/* Modal */}
      {showView && (
        <ViewAttendance
          onClose={() => setShowView(false)}
          Attendance={selectedRow}
        />
      )}

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
    </>
  );
};

export default Attendance;
