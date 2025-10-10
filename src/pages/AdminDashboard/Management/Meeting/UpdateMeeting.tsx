import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { AppContext } from '../../../../context/AppContext';
import { useContext, useState } from 'react';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../../config/api';

interface UpdateMeetingProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchMeetings: () => Promise<void>;
  Meeting: {
    id: number;
    meetingId: string;
    relationId: string;
    meetingDate: string;
    meetingTime: string;
    location: string;
    participants: string;
    notes: string;
    status: string;
    createdDate: string;
    relationInformation: {
      reportedPerson: string;
      caseType: string;
      caseTitle: string;
      details: string;
      reportedBy: string;
      dateReported: string;
      status: string;
      resolution: string;
      disciplinaryLevel: string;
      handledBy: string;
      dateResolved: string;
      remarks: string;
    };
  };
}

export default function UpdateMeetingModal({
  onClose,
  Meeting,
  alertsRef,
  refetchMeetings,
}: UpdateMeetingProps) {
  const { token } = useContext(AppContext)!;

  const [meeting_date, setMeetingDate] = useState(Meeting.meetingDate || '');
  const [meeting_time, setMeetingTime] = useState(Meeting.meetingTime || '');
  const [location, setLocation] = useState(Meeting.location || '');
  const [participants, setParticipants] = useState(Meeting.participants || '');
  const [notes, setNotes] = useState(Meeting.notes || '');

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log(meeting_date, meeting_time, location, participants, notes);

    const payload = {
      relation_id: Meeting.relationId,
      meeting_date,
      meeting_time,
      location,
      participants,
      notes,
    };

    const res = await fetch(
      `${API_BASE_URL}/api/relation-meetings/${Meeting.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json', // ✅ Correct for JSON
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload), // ✅ Send as JSON
      },
    );

    const data = await res.json();
    console.log(data);

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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2D3F99] text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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

        <form onSubmit={handleSubmit}>
          {/* Body (scrollable) */}
          <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-100">
            <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
              UPDATE EMPLOYEE MEETING
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting ID
                </p>
                <p className="font-semibold text-sm">{Meeting.meetingId}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Case ID
                </p>
                <p className="font-semibold text-sm">{Meeting.relationId}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scheduled Date
                </p>
                <p className="font-semibold text-sm">{Meeting.meetingDate}</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scheduled Time
                </p>
                <p className="font-semibold text-sm">{Meeting.meetingTime}</p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Schedule Date
                </label>
                <input
                  defaultValue={Meeting.meetingDate || ''}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  type="date"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-200"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Schedule Time
                </label>
                <input
                  onChange={(e) => setMeetingTime(e.target.value)}
                  type="time"
                  defaultValue={Meeting.meetingTime}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold text-gray-900 dark:text-white"
                  step="1800" // optional: 1800s = 30 mins interval
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting Location
                </label>
                <input
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  defaultValue={Meeting.location || ' '}
                  placeholder="Enter meeting location"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-200"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting Participants
                </label>
                <input
                  onChange={(e) => setParticipants(e.target.value)}
                  defaultValue={Meeting.participants}
                  type="text"
                  placeholder="Enter meeting participants"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-200"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm col-span-2">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Notes
                </label>
                <textarea
                  onChange={(e) => setNotes(e.target.value)}
                  defaultValue={Meeting.notes}
                  placeholder="Enter notes here..."
                  rows={4}
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold dark:bg-gray-900 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-[#24357f]"
              >
                <ClipboardPen size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
