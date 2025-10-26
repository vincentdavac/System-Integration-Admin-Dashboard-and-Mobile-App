import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface EmployeeCertification {
  id: number;
  coeId: string;
  purpose: string;
  userId: string;
  employmentStatus: string;
  inclusiveDates: string;
  remarks: string;
  status: string;
  issuedDate: string;
  attachment: string;
  pdfFile: string;
  employeeInformation: {
    fullName: string;
    email: string;
    studentNo: string;
    department: string;
  };
  approverInformation: {
    fullName: string;
    email: string;
  };
  createdDate: string;
  updatedDate: string;
}

const EmployeeCertication = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext)!;
  const [coe, setCoe] = useState<EmployeeCertification[]>([]);
  const [filteredCoe, setFilteredCoe] = useState<EmployeeCertification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leave requests
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/my-coe`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCoe(data.data || []);
          setFilteredCoe(data.data || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch leave requests.');
        }
      } catch (err) {
        console.error('Error fetching leave requests:', err);
        setError('An error occurred while fetching leave requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [token]);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCoe(coe);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = coe.filter((request) =>
      [
        request.coeId,
        request.purpose,
        request.employmentStatus,
        request.inclusiveDates,
        request.issuedDate,
        request.employeeInformation.fullName,
        request.createdDate,
      ].some((field) => field?.toLowerCase().includes(query)),
    );

    setFilteredCoe(filtered);
  }, [searchQuery, coe]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Green Background Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <h1 className="text-lg font-semibold">CERTIFICATE OF EMPLOYMENT</h1>
        </div>

        {/* Apply Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate('/mobile/coe-request')}
            className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
          >
            Request
          </button>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search leave no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Certificate of Employment Request
        </h2>

        {/* Loading & Error States */}
        {loading && (
          <p className="text-gray-600 text-sm">Loading Certifications...</p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Leave Cards */}
        <div className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-2 rounded-md">
          {filteredCoe.length === 0 && !loading && (
            <p className="text-gray-500 text-lm ">No leave requests found.</p>
          )}

          {filteredCoe.map((request) => (
            <div
              key={request.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Type + Button */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {request.purpose || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{' '}
                    <span
                      className={`font-semibold ${
                        request.status === 'approved'
                          ? 'text-green-600'
                          : request.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {request.status}
                    </span>
                  </p>
                </div>
                <button
                  onClick={async () => {
                    if (request.status === 'approved') {
                      try {
                        const res = await fetch(
                          `${API_BASE_URL}/api/coe/${request.id}/generate-pdf`,
                          {
                            method: 'GET',
                            headers: {
                              Authorization: `Bearer ${token}`,
                              Accept: 'application/pdf',
                            },
                          },
                        );

                        if (!res.ok) {
                          throw new Error('Failed to generate PDF');
                        }

                        // Convert response to blob and trigger download
                        const blob = await res.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `COE_${request.coeId}.pdf`;
                        a.click();
                        window.URL.revokeObjectURL(url);
                      } catch (error) {
                        console.error('Error generating PDF:', error);
                        alert('Failed to generate PDF. Please try again.');
                      }
                    }
                  }}
                  disabled={request.status === 'pending'}
                  className={`text-sm px-4 py-1 rounded-md font-medium transition-all ${
                    request.status === 'pending'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#2D3F99] hover:bg-[#1f2f70] text-white'
                  }`}
                >
                  Generate PDF
                </button>
              </div>

              {/* Date + Leave ID */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <p>
                  <span className="font-semibold">Date:</span>{' '}
                  {request.createdDate}
                </p>
                <p>
                  <span className="font-semibold">Coe ID:</span> {request.coeId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra bottom space */}
      <div className="h-10"></div>
    </div>
  );
};

export default EmployeeCertication;
