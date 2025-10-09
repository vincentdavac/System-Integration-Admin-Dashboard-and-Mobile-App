import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';

interface Relation {
  id: number;
  caseId: string;
  caseType: string;
  caseTitle: string;
  status: string;
  dateReported: string;
  reportedUser: {
    id: number;
    name: string;
    email: string;
  };
}

const MobileRelations = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;

  const [relations, setRelations] = useState<Relation[]>([]);
  const [filteredRelations, setFilteredRelations] = useState<Relation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch relations
  useEffect(() => {
    const fetchRelations = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/employee-relations/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setRelations(data.data || []);
          setFilteredRelations(data.data || []);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch relations.');
        }
      } catch (err) {
        console.error('Error fetching relations:', err);
        setError('An error occurred while fetching relations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelations();
  }, [user?.id, token]);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRelations(relations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = relations.filter((relation) =>
      [
        relation.caseId,
        relation.caseType,
        relation.caseTitle,
        relation.status,
        relation.dateReported,
        relation.reportedUser?.name,
      ].some((field) => field?.toLowerCase().includes(query)),
    );

    setFilteredRelations(filtered);
  }, [searchQuery, relations]);

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

        {/* Header (Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <h1 className="text-lg font-semibold">EMPLOYEE RELATIONS</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search case ID, type, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate('/mobile/relations-submit')}
            className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-12 px-4 pb-10 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Employee Relations Request History
        </h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading relations...</p>
        ) : error ? (
          <p className="text-sm ">{error}</p>
        ) : filteredRelations.length === 0 ? (
          <p className="text-sm text-gray-500">No relations found.</p>
        ) : (
          <div className="space-y-4">
            {filteredRelations.map((relation) => (
              <div
                key={relation.id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                {/* Case Info */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-lg font-semibold text-gray-800 capitalize">
                      {relation.caseType}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {relation.status}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/mobile/relations-view/${relation.id}`)
                    }
                    className="bg-[#2D3F99] text-white text-sm px-4 py-1 rounded-md"
                  >
                    View Now
                  </button>
                </div>

                {/* Date + Case ID */}
                <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                  <p>
                    <span className="font-semibold">Date:</span>{' '}
                    {relation.dateReported}
                  </p>
                  <p>
                    <span className="font-semibold">Case ID:</span>{' '}
                    {relation.caseId}
                  </p>
                </div>

                {/* Reported Employee */}
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-semibold">Reported Employee:</span>{' '}
                  {relation.reportedUser?.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default MobileRelations;
