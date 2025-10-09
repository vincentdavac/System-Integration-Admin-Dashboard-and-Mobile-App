import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

interface LeaveRequest {
  id: number;
  leaveId: string;
  reason: string;
  startDate: string;
  endDate: string;
  durationDays: string;
  imageFile: string;
  status: string;
  remarks: string | null;
  createdDate: string;
  updatedDate: string;
  leaveTypeInformation: {
    name: string;
    description: string;
  };
  userInformation: {
    fullName: string;
    studentNo: string;
  };
  approverInformation: {
    fullName: string;
  } | null;
}

const MobileLeaveRequestView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get dynamic ID from URL
  const { token } = useContext(AppContext)!;

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [leave, setLeave] = useState<LeaveRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch specific leave request by ID
  useEffect(() => {
    const fetchLeaveRequest = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/leave-requests/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok && data.data) {
          setLeave(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch leave request.');
        }
      } catch (err) {
        console.error('Error fetching leave request:', err);
        setError('An error occurred while fetching leave request.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLeaveRequest();
  }, [id, token]);

  // ✅ Loading and error handling
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
  if (!leave) return null;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[170px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back + Title on left) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/leave')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">LEAVE REQUEST</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-16 w-full text-center">
          <p className="text-base font-semibold text-white capitalize">
            {leave.status || 'Pending'}
          </p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Leave ID */}
        <div className="absolute bottom-4 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> {leave.createdDate}
          </p>
          <p>
            <span className="font-semibold">Leave ID:</span> {leave.leaveId}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-6 px-4 pb-10">
        {/* Leave Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Leave Information
        </h2>

        {/* Leave Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Leave Type</label>
          <input
            type="text"
            value={leave.leaveTypeInformation?.name || ''}
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
              value={leave.startDate}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="text"
              value={leave.endDate}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Reason</label>
          <textarea
            readOnly
            value={leave.reason}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Uploaded Image */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Uploaded File
          </label>

          {leave.imageFile ? (
            <>
              {/* Image Thumbnail */}
              <div
                onClick={() => setIsPreviewOpen(true)}
                className="block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
              >
                <p className="text-blue-600 underline text-sm text-center">
                  View Uploaded Image
                </p>
              </div>

              {/* Image Preview Modal */}
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
                      src={leave.imageFile}
                      alt="Uploaded File"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <input
              type="text"
              value=" No file uploaded"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          )}
        </div>

        {/* HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Human Resource Information
        </h2>

        {/* Validated By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Validated by
          </label>
          <input
            type="text"
            value={leave.approverInformation?.fullName || 'Pending'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Remarks</label>
          <textarea
            readOnly
            value={leave.remarks || 'N/A'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Date Approved */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Date Approved
          </label>
          <input
            type="text"
            value={leave.updatedDate || 'Pending'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Extra bottom space */}
      <div className="h-12"></div>
    </div>
  );
};

export default MobileLeaveRequestView;
