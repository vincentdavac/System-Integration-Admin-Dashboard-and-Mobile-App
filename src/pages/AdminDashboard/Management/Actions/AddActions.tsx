import { CalendarPlus2 } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../../context/AppContext';
import { useContext, useEffect, useState } from 'react';

interface AddActionsProps {
  onClose: () => void;
  isOpen: boolean;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchActions: () => Promise<void>;
}

interface ScheduleMeeting {
  id: string;
  meetingId: string;
  relationId: string;
}

export default function AddActionsModal({
  onClose,
  isOpen,
  refetchActions,
  alertsRef,
}: AddActionsProps) {
  if (!isOpen) return null;
  const { user, token } = useContext(AppContext)!;

  const [meetings, setMeetings] = useState('');
  const [scheduleMeetings, setScheduleMeetings] = useState<ScheduleMeeting[]>(
    [],
  );

  const [actionType, setActionType] = useState('');
  const [description, setDescription] = useState('');
  const [relationStatus, setRelationStatus] = useState('resolved');
  const [meetingStatus, setMeetingStatus] = useState('completed');

  useEffect(() => {
    const fetchCaseIds = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/relation-meetings/scheduled', {
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
          // Map backend keys (snake_case) to frontend camelCase
          const mappedMeetings: ScheduleMeeting[] = data.data.map(
            (item: any) => ({
              id: String(item.id),
              meetingId: String(item.meeting_id || item.meetingId),
              relationId: String(item.relation_id || item.relationId),
            }),
          );
          setScheduleMeetings(mappedMeetings);
        } else {
          alertsRef.current?.addAlert(
            'error',
            data.message || 'Failed to fetch .',
          );
        }
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    fetchCaseIds();
  }, [token, alertsRef]);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!relationStatus) {
      alertsRef.current?.addAlert('error', 'Please select a relation status.');
      return;
    }

    const selectedMeeting = scheduleMeetings.find(
      (m) => m.meetingId === meetings,
    );

    console.log(selectedMeeting?.meetingId);
    console.log(selectedMeeting?.relationId);
    console.log(relationStatus);
    console.log(actionType);
    console.log(description);
    console.log(meetingStatus);

    const formData = new FormData();
    formData.append('meeting_id', String(selectedMeeting?.meetingId));
    formData.append('relation_id', String(selectedMeeting?.relationId));
    formData.append('action_type', String(actionType));
    formData.append('description', String(description));
    formData.append('handled_by', String(user?.id));
    formData.append('relation_status', String(relationStatus));
    formData.append('meeting_status', String(meetingStatus));

    const res = await fetch(`/api/relation-actions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meeting_id: selectedMeeting?.meetingId,
        relation_id: selectedMeeting?.relationId,
        action_type: actionType,
        description: description,
        handled_by: user?.id,
        relation_status: relationStatus,
        meeting_status: meetingStatus,
      }),
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
      await refetchActions();
      onClose();
    } else if (data.message) {
      alertsRef.current?.addAlert('error', data.message);
    } else {
      alertsRef.current?.addAlert('success', 'Meeting Created Successfully');
      // 🟢 Refetch parent employee list
      await refetchActions();
      // Close modal after success
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-yellow-500 text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src={UCCLogo} alt="Logo" width={55} className="drop-shadow" />
            <div className="leading-tight">
              <h1 className="font-bold text-sm">UNIVERSITY OF CALOOCAN CITY</h1>
              <p className="text-xs">South Campus</p>
            </div>
          </div>
          <button className="text-white text-2xl font-bold" onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Body */}
          <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
            <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
              ADD EMPLOYEE ACTION
            </h3>

            {/* Case Information Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Meeting ID */}
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting ID
                </label>
                <select
                  value={meetings}
                  onChange={(e) => setMeetings(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  {scheduleMeetings &&
                    Array.isArray(scheduleMeetings) &&
                    scheduleMeetings.map((type: any) => (
                      <option key={type.id} value={type.meetingId}>
                        {type.meetingId}
                      </option>
                    ))}
                </select>
              </div>

              {/* Action Type */}
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Action Type
                </label>
                <select
                  onChange={(e) => setActionType(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                >
                  <option value="none">None</option>
                  <option value="verbal warning">Verbal Warning</option>
                  <option value="written warning">Written Warning</option>
                  <option value="final warning">Final Warning</option>
                  <option value="suspension">Suspension</option>
                  <option value="termination">Termination</option>
                </select>
              </div>

              {/* Relation Status */}
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Relation Status
                </label>
                <select
                  value={relationStatus}
                  onChange={(e) => setRelationStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                >
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
              </div>

              {/* Meeting Status */}
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting Status
                </label>
                <select
                  value={meetingStatus}
                  onChange={(e) => setMeetingStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                >
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm col-span-2">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description here..."
                  rows={4}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="flex items-center gap-2 text-white px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500"
              >
                <CalendarPlus2 size={18} />
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
