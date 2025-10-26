import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface Meeting {
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
    caseType: string;
    caseTitle: string;
    details: string;
    status: string;
    reportedById: number;
    reportedBy: string;
    reportedPersonId: number;
    reportedPerson: string;
    dateReported: string;
    disciplinaryLevel: string;
    resolution: string | null;
    dateResolved: string | null;
    remarks: string | null;
  };
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

const MobileMeetingHistory = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user?.id) {
      setError('User not found');
      setLoading(false);
      return;
    }

    const fetchMeetings = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/relation-meetings/my-meetings/${user.id}`,
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
          setMeetings(data.data || []);
          setFilteredMeetings(data.data || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch meetings');
        }
      } catch (err) {
        console.error('Error fetching meetings:', err);
        setError('An error occurred while fetching meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [user?.id, token]);

  // Search filter function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMeetings(meetings);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = meetings.filter((meeting) => {
      const searchableFields = [
        meeting.meetingId,
        meeting.relationId,
        meeting.meetingDate,
        meeting.meetingTime,
        meeting.location,
        meeting.participants,
        meeting.status,
        meeting.notes,
        meeting.relationInformation?.caseType,
        meeting.relationInformation?.caseTitle,
        meeting.relationInformation?.details,
        meeting.relationInformation?.status,
        meeting.relationInformation?.reportedBy,
        meeting.relationInformation?.reportedPerson,
        meeting.relationInformation?.disciplinaryLevel,
        meeting.relationInformation?.resolution,
        meeting.relationInformation?.remarks,
      ];

      return searchableFields.some(
        (field) => field?.toLowerCase().includes(query),
      );
    });

    setFilteredMeetings(filtered);
  }, [searchQuery, meetings]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in progress':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Green Background Section - Fixed */}
      <div className="w-full h-[150px] relative flex-shrink-0">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back Button + Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">MEETING</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%] z-10">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search meeting..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full outline-none text-sm text-gray-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Area with Fixed Height */}
      <div className="flex-1 flex flex-col mt-12 px-4 overflow-hidden">
        {/* Meeting History Title - Fixed */}
        <div className="flex-shrink-0 mb-3">
          <h2 className="text-base font-semibold text-gray-800">
            Meeting History
            {searchQuery && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredMeetings.length} result
                {filteredMeetings.length !== 1 ? 's' : ''})
              </span>
            )}
          </h2>
        </div>

        {/* Scrollable Cards Container */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading meetings...</p>
              </div>
            </div>
          ) : error ? (
            // Error State
            <div className="flex justify-center items-center h-full"></div>
          ) : filteredMeetings.length === 0 ? (
            // Empty State
            <div className="flex   h-full">
              <div className="">
                <p className="text-gray-600 mb-2">
                  {searchQuery
                    ? `No meetings found for "${searchQuery}"`
                    : 'No meetings found'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-sm text-blue-600 underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Meeting Cards
            <div className="space-y-4 mb-17">
              {filteredMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  {/* Case Type + Button */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 mr-2">
                      <p className="text-lg font-semibold text-gray-800 capitalize">
                        {meeting.relationInformation.caseType}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(
                            meeting.status,
                          )}`}
                        >
                          {meeting.status}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(
                            meeting.relationInformation.status,
                          )}`}
                        >
                          {meeting.relationInformation.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/mobile/meeting-view/${meeting.id}`)
                      }
                      className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md hover:bg-[#1f2d6b] transition-colors flex-shrink-0"
                    >
                      View
                    </button>
                  </div>

                  {/* Date, Time & Meeting ID */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
                    <div>
                      <p className="mb-1">
                        <span className="font-semibold">Date:</span>{' '}
                        {meeting.meetingDate}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span>{' '}
                        {meeting.meetingTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>
                        <span className="font-semibold">Meeting ID:</span>
                      </p>
                      <p className="text-blue-600">{meeting.meetingId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMeetingHistory;
