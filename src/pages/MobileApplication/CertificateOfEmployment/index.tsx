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

const EmployeeCertification = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext)!;
  const [coe, setCoe] = useState<EmployeeCertification[]>([]);
  const [filteredCoe, setFilteredCoe] = useState<EmployeeCertification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch COE requests
  useEffect(() => {
    const fetchCoe = async () => {
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
          setError(data.message || 'Failed to fetch certifications.');
        }
      } catch (err) {
        console.error('Error fetching COE requests:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoe();
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

  // Generate and show PDF in modal
  const handleViewPDF = async (request: EmployeeCertification) => {
    if (request.status !== 'approved') return;

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

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Download the PDF
  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `COE_Document.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        <div className="absolute top-4 left-4 flex items-center text-white">
          <h1 className="text-lg font-semibold">CERTIFICATION</h1>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate('/mobile/coe-request')}
            className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
          >
            Request
          </button>
        </div>

        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search COE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Certificate of Employment Requests
        </h2>

        {loading && <p className="text-gray-600 text-sm">Loading...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-2 rounded-md">
          {filteredCoe.length === 0 && !loading && (
            <p className="text-gray-500 text-sm">No requests found.</p>
          )}

          {filteredCoe.map((request) => (
            <div
              key={request.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
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
                  onClick={() => handleViewPDF(request)}
                  disabled={request.status === 'pending'}
                  className={`text-sm px-4 py-1 rounded-md font-medium transition-all ${
                    request.status === 'pending'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#2D3F99] hover:bg-[#1f2f70] text-white'
                  }`}
                >
                  View PDF
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <p>
                  <span className="font-semibold">Date:</span>{' '}
                  {request.createdDate}
                </p>
                <p>
                  <span className="font-semibold">COE ID:</span> {request.coeId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[95%] max-w-3xl overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-lg font-semibold">View Certificate</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-red-600 text-xl"
              >
                &times;
              </button>
            </div>

            <div className="h-[70vh]">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  title="PDF Viewer"
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Loading PDF...
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 p-3 border-t">
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Download
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCertification;
