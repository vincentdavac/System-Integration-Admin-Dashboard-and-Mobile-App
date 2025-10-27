import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Eye, ClipboardPen, Search, Printer } from 'lucide-react';
import ViewCertifications from './ViewCertifications';
import UpdateCertifications from './UpdateCertifications';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface Certifications {
  id: string;
  coeId: string;
  userId: string;
  purpose: string;
  employmentStatus: string;
  inclusiveDates: string;
  remarks: string;
  status: string;
  issuedDate: string;
  attachment: string;
  pdfFile: string;
  employeeInformation: {
    userId: string;
    fullName: string;
    email: string;
    studentNo: string;
    department: string;
  };
  approverInformation: {
    userId: string;
    fullName: string;
    email: string;
  };
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const Certification = ({ alertsRef }: Props) => {
  const { user, token } = useContext(AppContext)!;
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<Certifications | null>(null);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const itemsPerPage = 10;

  const fetchCertifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/coe`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        setCertifications(res.data);
      } else {
        console.error('Failed to fetch certifications:', res);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };

  useEffect(() => {
    if (user?.id && token) fetchCertifications();
  }, [user, token]);

  // ✅ Filter
  const filtered = certifications.filter(
    (cert) =>
      cert.employeeInformation.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cert.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.employmentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.coeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.inclusiveDates.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'rejected':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium';
      case 'completed':
        return 'bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium';
    }
  };

  return (
    <>
      <Breadcrumb pageName="Certifications" />

      {/* 🔍 Search Bar */}
      <div className="mt-4 mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search certifications"
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
      <div className="overflow-x-auto border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-gray-700 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0 z-0">
              <tr>
                <th className="px-6 py-3 text-center">No.</th>
                <th className="px-6 py-3 text-center">COE ID</th>
                <th className="px-6 py-3 text-center">Employee</th>
                <th className="px-6 py-3 text-center">Employment Status</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Date Requested</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 text-center dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{row.coeId}</td>
                    <td className="px-6 py-3">
                      {row.employeeInformation.fullName}
                    </td>
                    <td className="px-6 py-3">{row.employmentStatus}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(row.status)}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{row.createdDate || 'N/A'}</td>

                    <td className="px-6 py-3 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white shadow"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowView(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="px-4 py-2 rounded text-white shadow bg-[#2D3F99] hover:bg-blue-600"
                        onClick={() => {
                          setSelectedRow(row);
                          setShowUpdate(true);
                        }}
                      >
                        <ClipboardPen size={18} />
                      </button>

                      <button
                        className={`ml-2 px-4 py-2 rounded text-white shadow ${
                          row.status === 'approved'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={row.status !== 'approved'}
                        onClick={async () => {
                          if (row.status === 'approved') {
                            try {
                              const response = await fetch(
                                `${API_BASE_URL}/api/coe/${row.id}/generate-pdf`,
                                {
                                  method: 'GET',
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: 'application/pdf',
                                  },
                                },
                              );

                              if (!response.ok) {
                                throw new Error('Failed to generate PDF');
                              }

                              // Convert to Blob so we can display the PDF properly
                              const blob = await response.blob();
                              const url = URL.createObjectURL(blob);

                              // Open PDF in new tab
                              window.open(url, '_blank');
                            } catch (error) {
                              console.error('Error generating PDF:', error);
                              alertsRef.current?.addAlert(
                                'error',
                                'Failed to generate PDF',
                              );
                            }
                          }
                        }}
                      >
                        <Printer size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-3 text-center text-gray-500 italic dark:text-gray-400"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🪟 Modals */}
      {showView && selectedRow && (
        <ViewCertifications
          onClose={() => setShowView(false)}
          certifications={selectedRow}
        />
      )}
      {showUpdate && selectedRow && (
        <UpdateCertifications
          onClose={() => setShowUpdate(false)}
          alertsRef={alertsRef}
          refetchCertifications={fetchCertifications}
          certifications={selectedRow}
        />
      )}

      {/* 🔢 Pagination Controls */}
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

export default Certification;
