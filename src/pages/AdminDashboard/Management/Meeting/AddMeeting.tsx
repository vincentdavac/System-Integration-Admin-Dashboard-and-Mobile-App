import { CalendarPlus2 } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { useContext, useEffect, useState } from 'react';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../../context/AppContext';

interface AddMeetingProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchMeetings: () => Promise<void>;
}

export default function AddMeetingModal({
  onClose,
  alertsRef,
  refetchMeetings,
}: AddMeetingProps) {
  const { token } = useContext(AppContext)!;

  const [caseId, setCaseId] = useState('');
  const [selectCaseId, setSelectCaseId] = useState<any>([]);
  const [meeting_date, setMeetingDate] = useState('');
  const [meeting_time, setMeetingTime] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchCaseIds = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/employee-relations/open', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        // ✅ FIXED: check correct status key
        if (data.status === 'success') {
          setSelectCaseId(data.data || []);
        } else {
          alertsRef.current?.addAlert(
            'error',
            data.message || 'Failed to fetch open employee relations.',
          );
        }
      } catch (error) {
        console.error('Error fetching case IDs:', error);
        alertsRef.current?.addAlert(
          'error',
          'Network error. Please check your connection and try again.',
        );
      }
    };

    fetchCaseIds();
  }, [token, alertsRef]);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    console.log(caseId);

    const formData = new FormData();
    formData.append('relation_id', String(caseId));
    formData.append('meeting_date', meeting_date);
    formData.append('meeting_time', String(meeting_time));
    formData.append('location', location);
    formData.append('participants', participants);
    formData.append('notes', notes);

    const res = await fetch(`/api/relation-meetings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    const data = await res.json();

    if (data.errors) {
      // Handle validation errors
      Object.values(data.errors).forEach((messages) => {
        (messages as string[]).forEach((msg) => {
          alertsRef.current?.addAlert('error', msg);
        });
      });
    } else if (data.status && data.status.toLowerCase().includes('success')) {
      // ✅ Backend explicitly says success
      alertsRef.current?.addAlert(
        'success',
        data.message || 'Meeting Created Successfully',
      );
      await refetchMeetings();
      onClose();
    } else if (data.message) {
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Meeting Created Successfully');
      // 🟢 Refetch parent employee list
      await refetchMeetings();
      // Close modal after success
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-yellow-500 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src={UCCLogo} alt="Logo" width={55} className="drop-shadow" />
            <div className="leading-tight">
              <h1 className="font-bold text-sm text-white">
                UNIVERSITY OF CALOOCAN CITY
              </h1>
              <p className="text-xs text-white">South Campus</p>
            </div>
          </div>
          <button className="text-white text-2xl font-bold" onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Body (scrollable) */}
          <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
            <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
              ADD EMPLOYEE MEETING
            </h3>

            {/* Case Information Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Case ID
                </label>
                <select
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                  required
                >
                  <option value="" disabled>
                    Choose...
                  </option>

                  {selectCaseId.map((type: any) => (
                    <option key={type.id} value={type.caseId}>
                      {type.caseId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Schedule Date
                </label>
                <input
                  onChange={(e) => setMeetingDate(e.target.value)}
                  type="date"
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Schedule Time
                </label>
                <input
                  onChange={(e) => setMeetingTime(e.target.value)}
                  type="time"
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold text-gray-900 dark:text-white"
                  step="1800" // optional: 1800s = 30 mins interval
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting Location
                </label>
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Enter meeting location"
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting Participants
                </label>
                <input
                  onChange={(e) => setParticipants(e.target.value)}
                  type="text"
                  placeholder="Enter meeting participants"
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Notes
                </label>
                <textarea
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes here..."
                  rows={4}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500"
              >
                <CalendarPlus2 size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
