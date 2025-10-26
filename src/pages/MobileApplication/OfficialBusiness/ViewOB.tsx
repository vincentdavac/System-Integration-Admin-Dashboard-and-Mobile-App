import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface OfficialBusiness {
  id: string;
  obId: string;
  userId: string;
  purpose: string;
  destination: string;
  dateStart: string;
  dateEnd: string;
  timeOut: string;
  timeIn: string;
  status: string;
  approverId: string;
  remarks: string;
  attachment: string;
  employeeInformation: {
    id: string;
    fullName: string;
    email: string;
    studentNo: string;
    department: string;
    position: string;
  };
  approverInformation: {
    id: string;
    fullName: string;
    email: string;
    position: string;
  };
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

const MobileOfficialBusinessView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AppContext)!;

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [officialBusiness, setOfficialBusiness] =
    useState<OfficialBusiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch OB by ID
  useEffect(() => {
    const fetchOfficialBusiness = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/official-business/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok && data.data) {
          setOfficialBusiness(data.data);
          setError(null);
        } else {
          setError(
            data.message || 'Failed to fetch official business request.',
          );
        }
      } catch (err) {
        console.error('Error fetching official business:', err);
        setError('An error occurred while fetching official business data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOfficialBusiness();
  }, [id, token]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  if (!officialBusiness) return null;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* ✅ Header Section */}
      <div className="w-full h-[170px] relative">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button
            onClick={() => navigate('/mobile/ob-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">OFFICIAL BUSINESS</h1>
        </div>

        {/* Status */}
        <div className="absolute top-16 w-full text-center">
          <p
            className={`text-base font-semibold capitalize ${
              officialBusiness.status === 'approved'
                ? 'text-green-300'
                : officialBusiness.status === 'rejected'
                ? 'text-red-300'
                : 'text-yellow-200'
            }`}
          >
            {officialBusiness.status}
          </p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & OB ID */}
        <div className="absolute bottom-4 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span>{' '}
            {officialBusiness.createdDate}
          </p>
          <p>
            <span className="font-semibold">OB ID:</span>{' '}
            {officialBusiness.obId}
          </p>
        </div>
      </div>

      {/* ✅ OB Details */}
      <div className="mt-6 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Official Business Information
        </h2>

        {/* Purpose */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Purpose</label>
          <textarea
            value={officialBusiness.purpose}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          />
        </div>

        {/* Destination */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            value={officialBusiness.destination}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">From</label>
            <input
              type="text"
              value={officialBusiness.dateStart}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="text"
              value={officialBusiness.dateEnd}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Time In / Out */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Time Out</label>
            <input
              type="text"
              value={officialBusiness.timeOut || 'N/A'}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Time In</label>
            <input
              type="text"
              value={officialBusiness.timeIn || 'N/A'}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Attachment */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Attachment</label>

          {officialBusiness.attachment ? (
            <>
              <div
                onClick={() => setIsPreviewOpen(true)}
                className="block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
              >
                <p className="text-blue-600 underline text-sm text-center">
                  View Attachment
                </p>
              </div>

              {isPreviewOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  <div
                    className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={officialBusiness.attachment}
                      alt="Attachment"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <input
              type="text"
              value="No file uploaded"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          )}
        </div>

        {/* ✅ HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          HR Information
        </h2>

        {/* Approved By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Approved by
          </label>
          <input
            type="text"
            value={officialBusiness.approverInformation?.fullName || 'Pending'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Remarks</label>
          <textarea
            readOnly
            value={officialBusiness.remarks || 'N/A'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          />
        </div>

        {/* Date Approved */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Date Approved
          </label>
          <input
            type="text"
            value={officialBusiness.updatedDate || 'Pending'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      <div className="h-12"></div>
    </div>
  );
};

export default MobileOfficialBusinessView;
