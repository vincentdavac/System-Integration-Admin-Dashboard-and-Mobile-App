import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import API_BASE_URL from '../../../config/api';

interface Employee {
  id: number;
  employeeNo: string;
  name: string;
  email: string;
}

interface Relation {
  id: number;
  reportedUser?: Employee;
  reportedBy?: Employee;
  caseId: string;
  caseType: string;
  caseTitle: string;
  details: string;
  status: string;
  resolution: string;
  disciplinaryLevel: string;
  handledBy: string;
  remarks: string;
  dateReported: string;
  dateResolved: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

const MobileRelationsView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- get {id} from /mobile/relations-view/:id

  const [relation, setRelation] = useState<Relation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelation = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/employee-relations/${id}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );
        const data = await response.json();
        if (data.status === 'Successful request') {
          setRelation(data.data);
        } else {
          console.error('Failed to fetch record:', data.message);
        }
      } catch (error) {
        console.error('Error fetching relation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-sm">Loading relation details...</p>
      </div>
    );
  }

  if (!relation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-sm">No relation record found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
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
          <button
            onClick={() => navigate('/mobile/relations')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">RELATION INFORMATION</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-14 w-full text-center">
          <p className="text-base font-semibold text-white">
            {relation.status || 'N/A'}
          </p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Case ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span>{' '}
            {relation.dateReported || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Case ID:</span>{' '}
            {relation.caseId || 'N/A'}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-6">
        {/* Employee Relations Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Employee Relations Information
        </h2>

        {/* Employee Involved */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Employee Involved
          </label>
          <input
            type="text"
            value={relation.reportedUser?.name || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Case Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Type</label>
          <input
            type="text"
            value={relation.caseType || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Case Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Title</label>
          <input
            type="text"
            value={relation.caseTitle || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Details</label>
          <textarea
            readOnly
            value={relation.details || 'N/A'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Human Resource Information
        </h2>

        {/* Handled By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Handled by</label>
          <input
            type="text"
            value={relation.handledBy?.trim() || 'Not yet assigned'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Remarks</label>
          <textarea
            readOnly
            value={relation.remarks?.trim() || 'No remarks yet'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Date Received */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Date Received
          </label>
          <input
            type="text"
            value={relation.createdDate || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Resolution */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Resolution</label>
          <textarea
            readOnly
            value={relation.resolution?.trim() || 'No resolution yet'}
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Disciplinary Level */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Disciplinary Level
          </label>
          <input
            type="text"
            value={relation.disciplinaryLevel || 'N/A'}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Extra bottom space */}
      <div className="h-14"></div>
    </div>
  );
};

export default MobileRelationsView;
