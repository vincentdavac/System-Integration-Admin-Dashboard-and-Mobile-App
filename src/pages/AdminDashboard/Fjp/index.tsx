import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import ActivateModal from './ActivateModal';
import { CheckCircle, RefreshCw, Search, XCircle } from 'lucide-react';
import { AppContext } from '../../../context/AppContext';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';

interface EmployeeProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const ArchiveEmployee = ({ alertsRef }: EmployeeProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActivate, setShowActivate] = useState(false);

  const itemsPerPage = 10;
  const [employees, setEmployees] = useState<any[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const { user, token } = useContext(AppContext)!;

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`/api/fjp-employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok && data.data) {
        setEmployees(data.data);
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

  // 🔍 Search (match full name or email)
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Status badge
  const getStatusClasses = (isHired: boolean) =>
    isHired
      ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium';

  // Highlight search
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      <Breadcrumb pageName="Employee" />

      {/* 🔍 Search Bar */}
      <div className="mt-4 mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
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

      {/* 🧾 Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-200 text-center">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Employee No</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Section</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Created Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">
                      {highlightMatch(emp.employeeNo)}
                    </td>
                    <td className="px-6 py-3">
                      <img
                        src={`https://fjp.ucc.bsit4c.com/${emp?.image}`}
                        alt="Profile"
                        className="w-10 h-10 border-white shadow-lg"
                      />
                    </td>

                    <td className="px-6 py-3">{emp.section}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(emp.hrmIsActive)}>
                        {emp.hrmIsActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {highlightMatch(emp.fullName)}
                    </td>
                    <td className="px-6 py-3">{highlightMatch(emp.email)}</td>
                    <td className="px-6 py-3">{emp.createdDate}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setShowActivate(true);
                          setSelectedEmployee(emp);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                      >
                        <CheckCircle size={18} />
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

      {/* ⚙️ MODALS */}
      {showActivate && (
        <ActivateModal
          alertsRef={alertsRef}
          onClose={() => setShowActivate(false)}
          employee={selectedEmployee}
          refetchEmployees={fetchEmployees}
        />
      )}

      {/* 📄 Pagination */}
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
                  : 'px-3 py-1 border rounded'
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

export default ArchiveEmployee;
