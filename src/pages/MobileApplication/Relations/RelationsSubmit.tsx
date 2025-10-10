import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../config/api';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface RelationsSubmitProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileRelationsSubmit = ({ alertsRef }: RelationsSubmitProps) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!;

  const [users, setUsers] = useState<User[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseTitle, setCaseTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users except current user
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/users/others/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUsers(data.data.users || []); // ✅ access nested array correctly
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch employees.');
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('An error occurred while fetching employees.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.id, token]);

  // Submit relation request (with improved error handler)
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/api/employee-relations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          users_id: selectedEmployee,
          reported_by: user?.id,
          case_type: caseType,
          case_title: caseTitle,
          details: details,
          status: 'open',
          date_reported: new Date().toISOString().split('T')[0],
        }),
      });

      const data = await res.json();

      // 🧠 Clear previous alerts first
      alertsRef.current?.clearAlerts();

      if (data.errors) {
        // Show each validation error
        Object.values(data.errors).forEach((messages) => {
          (messages as string[]).forEach((msg) => {
            alertsRef.current?.addAlert('error', msg);
          });
        });
      } else if (data.message && !res.ok) {
        // API error message
        alertsRef.current?.addAlert('error', data.message);
      } else if (res.ok) {
        // Success
        alertsRef.current?.addAlert(
          'success',
          'Relation request submitted successfully.',
        );
        navigate('/mobile/relations');
      } else {
        alertsRef.current?.addAlert('error', 'Failed to submit relation.');
      }
    } catch (err) {
      console.error('Error submitting relation:', err);
      alertsRef.current?.addAlert(
        'error',
        'An unexpected error occurred while submitting.',
      );
    } finally {
      setSubmitting(false);
    }
  };

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
            onClick={() => navigate('/mobile/relations')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">SUBMIT RELATION</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-10 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Relations Request Information
        </h2>

        {/* Employee Involved */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Employee Involved
          </label>
          {loading ? (
            <p className="text-sm text-gray-500">Loading employees...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Choose...</option>
              {users.length > 0 ? (
                users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.first_name} {u.last_name}
                  </option>
                ))
              ) : (
                <option disabled>No employees available</option>
              )}
            </select>
          )}
        </div>

        {/* Case Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Type</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="complaint">Complaint</option>
            <option value="grievance">Grievance</option>
            <option value="disciplinary">Disciplinary</option>
            <option value="dispute">Dispute</option>
          </select>
        </div>

        {/* Case Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
          />
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Details</label>
          <textarea
            placeholder="Enter details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full ${
            submitting ? 'bg-gray-400' : 'bg-[#2D3F99]'
          } text-white py-2 rounded-md font-medium text-sm`}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default MobileRelationsSubmit;
