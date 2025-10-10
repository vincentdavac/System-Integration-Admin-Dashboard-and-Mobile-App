import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface RelationAction {
  id: number;
  actionId: string;
  meetingId: string;
  actionType: string;
  description: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
  meetingInformation: {
    meetingId: string;
    meetingDate: string;
    meetingTime: string;
    location: string;
    participants: string;
    notes: string;
    status: string;
    relation: {
      relationId: string;
      caseType: string;
      caseTitle: string;
      details: string;
      status: string;
      dateReported: string;
      reportedUser: { fullName: string; email: string };
      reportedBy: { fullName: string; email: string };
    };
  };
  handledByInformation: { fullName: string; email: string };
}

const MobileActionsView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { token } = useContext(AppContext)!;
  const [action, setAction] = useState<RelationAction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/relation-actions/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setAction(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch relation action');
        }
      } catch (err) {
        console.error('Error fetching relation action:', err);
        setError('An error occurred while fetching relation action.');
      } finally {
        setLoading(false);
      }
    };

    fetchAction();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading relation action...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-200 px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!action) return null;

  const relation = action.meetingInformation?.relation;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col mb-5">
      {/* Green Header Section */}
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
            onClick={() => navigate('/mobile/actions-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">RELATION ACTION</h1>
        </div>

        {/* Date & Case Info */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span>{' '}
            {relation?.dateReported || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Reported by:</span>{' '}
            {relation?.reportedBy?.fullName || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Case ID:</span>{' '}
            {relation?.relationId || 'N/A'}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-10">
        {/* Meeting Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Meeting Information
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Employee Involved
          </label>
          <input
            type="text"
            value={relation?.reportedUser?.fullName || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Type</label>
          <input
            type="text"
            value={relation?.caseType || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Title</label>
          <input
            type="text"
            value={relation?.caseTitle || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Details</label>
          <textarea
            readOnly
            value={relation?.details || 'N/A'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Employee Relation Actions Section */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Employee Relation Actions
        </h2>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Action Type
            </label>
            <input
              type="text"
              value={action.actionType || 'N/A'}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value={action.createdDate || 'N/A'}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Handled By</label>
          <input
            type="text"
            value={action.handledByInformation?.fullName || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Descriptions
          </label>
          <textarea
            readOnly
            value={action.description || 'N/A'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default MobileActionsView;
