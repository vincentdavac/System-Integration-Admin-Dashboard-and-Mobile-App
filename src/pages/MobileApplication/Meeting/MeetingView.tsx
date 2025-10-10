import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';
interface MeetingDetail {
  id: number;
  meetingId: string;
  relationId: string;
  meetingDate: string;
  meetingTime: string;
  location: string;
  participants: string;
  notes: string;
  status: string;
  relationInformation: {
    reportedPersonId: number;
    reportedPerson: string;
    caseType: string;
    caseTitle: string;
    details: string;
    reportedById: number;
    reportedBy: string;
    dateReported: string;
    status: string;
    resolution: string | null;
    disciplinaryLevel: string;
    handledBy: string | null;
    dateResolved: string | null;
    remarks: string | null;
  };
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

const MobileMeetingView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { token } = useContext(AppContext)!;
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Meeting ID not provided');
      setLoading(false);
      return;
    }

    const fetchMeetingDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/relation-meetings/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        const data = await res.json();

        if (res.ok) {
          setMeeting(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch meeting details');
        }
      } catch (err) {
        console.error('Error fetching meeting details:', err);
        setError('An error occurred while fetching meeting details');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetail();
  }, [id, token]);

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'scheduled':
        return 'text-white';
      case 'completed':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      case 'under investigation':
        return 'text-orange-600';
      case 'resolved':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meeting details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !meeting) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <div className="w-full h-[150px] relative">
          <img
            src="/ucc_background/ucc_green_background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-700/60"></div>
          <div className="absolute top-4 left-4 flex items-center text-white">
            <button
              onClick={() => navigate('/mobile/meeting-history')}
              className="mr-2"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold">Meeting Details</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              ⚠️ {error || 'Meeting not found'}
            </p>
            <button
              onClick={() => navigate('/mobile/meeting-history')}
              className="bg-[#2D3F99] text-white px-6 py-2 rounded-md"
            >
              Back to Meeting History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button
            onClick={() => navigate('/mobile/meeting-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">MEETING INFORMATION</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-14 w-full text-center">
          <p
            className={`text-base font-semibold capitalize ${getStatusColor(
              meeting.status,
            )}`}
          >
            {meeting.status}
          </p>
          <p className="text-sm text-white opacity-90 -mt-1">Meeting Status</p>
        </div>

        {/* Date & Meeting ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> {meeting.meetingDate}
          </p>
          <p>
            <span className="font-semibold">Meeting ID:</span>{' '}
            {meeting.meetingId}
          </p>
        </div>
      </div>

      {/* Scrollable Form Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="mt-4 px-4 pb-10 h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {/* Case Information */}
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Case Information
          </h2>

          {/* Case Status */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Case Status
            </label>
            <input
              type="text"
              value={meeting.relationInformation.status}
              readOnly
              className={`w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 capitalize font-semibold ${getStatusColor(
                meeting.relationInformation.status,
              )}`}
            />
          </div>

          {/* Reported Person */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Reported Person
            </label>
            <input
              type="text"
              value={meeting.relationInformation.reportedPerson}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Reported By */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Reported By
            </label>
            <input
              type="text"
              value={meeting.relationInformation.reportedBy}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Case Type */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Case Type
            </label>
            <input
              type="text"
              value={meeting.relationInformation.caseType}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 capitalize"
            />
          </div>

          {/* Case Title */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Case Title
            </label>
            <input
              type="text"
              value={meeting.relationInformation.caseTitle}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Details */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Case Details
            </label>
            <textarea
              readOnly
              value={meeting.relationInformation.details}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
              rows={4}
            ></textarea>
          </div>

          {/* Date Reported */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Date Reported
            </label>
            <input
              type="text"
              value={meeting.relationInformation.dateReported}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Disciplinary Level */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">
              Disciplinary Level
            </label>
            <input
              type="text"
              value={meeting.relationInformation.disciplinaryLevel}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 capitalize"
            />
          </div>

          {/* Relations Meeting Section */}
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Meeting Details
          </h2>

          {/* Meeting Date */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Meeting Date
            </label>
            <input
              type="text"
              value={meeting.meetingDate}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Meeting Time */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Meeting Time
            </label>
            <input
              type="text"
              value={meeting.meetingTime}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={meeting.location}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Participants */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Participants
            </label>
            <input
              type="text"
              value={meeting.participants}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">
              Meeting Notes
            </label>
            <textarea
              readOnly
              value={meeting.notes}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
              rows={3}
            ></textarea>
          </div>

          {/* Additional Information (if available) */}
          {(meeting.relationInformation.resolution ||
            meeting.relationInformation.remarks) && (
            <>
              <h2 className="text-base font-semibold text-gray-800 mb-3">
                Additional Information
              </h2>

              {meeting.relationInformation.resolution &&
                meeting.relationInformation.resolution.trim() !== '' && (
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">
                      Resolution
                    </label>
                    <textarea
                      readOnly
                      value={meeting.relationInformation.resolution}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
                      rows={3}
                    ></textarea>
                  </div>
                )}

              {meeting.relationInformation.dateResolved &&
                meeting.relationInformation.dateResolved.trim() !== '' && (
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">
                      Date Resolved
                    </label>
                    <input
                      type="text"
                      value={meeting.relationInformation.dateResolved}
                      readOnly
                      className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
                    />
                  </div>
                )}

              {meeting.relationInformation.remarks &&
                meeting.relationInformation.remarks.trim() !== '' && (
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">
                      Remarks
                    </label>
                    <textarea
                      readOnly
                      value={meeting.relationInformation.remarks}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
                      rows={2}
                    ></textarea>
                  </div>
                )}
            </>
          )}

          {/* Metadata */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Record Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              <div>
                <p className="font-semibold">Created:</p>
                <p>{meeting.createdDate}</p>
                <p>{meeting.createdTime}</p>
              </div>
              <div>
                <p className="font-semibold">Last Updated:</p>
                <p>{meeting.updatedDate}</p>
                <p>{meeting.updatedTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Space */}
      <div className="h-15"></div>
    </div>
  );
};

export default MobileMeetingView;
