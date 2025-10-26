import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
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

const MobileActionsHistory = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;
  const [actions, setActions] = useState<RelationAction[]>([]);
  const [filteredActions, setFilteredActions] = useState<RelationAction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch actions
  useEffect(() => {
    if (!user?.id) {
      setError('User not found.');
      setLoading(false);
      return;
    }

    const fetchActions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/relation-actions/my-actions/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );

        const data = await res.json();
        if (res.ok) {
          setActions(data.data || []);
          setFilteredActions(data.data || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch actions');
        }
      } catch (err) {
        console.error('Error fetching actions:', err);
        setError('An error occurred while fetching actions.');
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, [user?.id, token]);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredActions(actions);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = actions.filter((a) =>
      [
        a.actionId,
        a.meetingId,
        a.actionType,
        a.description,
        a.meetingInformation?.meetingDate,
        a.meetingInformation?.relation?.caseTitle,
        a.meetingInformation?.relation?.caseType,
        a.meetingInformation?.relation?.reportedBy?.fullName,
        a.meetingInformation?.relation?.reportedUser?.fullName,
      ].some((field) => field?.toLowerCase().includes(query)),
    );

    setFilteredActions(filtered);
  }, [searchQuery, actions]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Green Header */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">ACTIONS</h1>
        </div>

        {/* Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Case or Date..."
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
          Relation Action History
        </h2>

        {/* Loading & Error States */}
        {loading && <p className="text-gray-600 text-sm">Loading actions...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Cards */}
        <div className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-2 rounded-md">
          {filteredActions.length === 0 && !loading && (
            <p className="text-gray-500 text-lm ">No actions found.</p>
          )}

          {filteredActions.map((action) => (
            <div
              key={action.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {action.meetingInformation?.relation?.caseTitle ||
                      'Untitled Case'}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    Type: {action.actionType || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {action.meetingInformation?.status || 'N/A'}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/mobile/actions-view/${action.id}`)}
                  className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                >
                  View Now
                </button>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <p>
                  <span className="font-semibold">Date:</span>{' '}
                  {action.createdDate}
                </p>
                <p>
                  <span className="font-semibold">Action ID:</span>{' '}
                  {action.actionId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-10"></div>
    </div>
  );
};

export default MobileActionsHistory;
