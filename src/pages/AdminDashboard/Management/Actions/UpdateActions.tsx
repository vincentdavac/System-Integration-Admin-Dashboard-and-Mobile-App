import { ClipboardPen } from 'lucide-react';
import UCCLogo from '/icons/ucc_logo.png';
import { useContext, useState } from 'react';
import { AppContext } from '../../../../context/AppContext';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../../config/api';
interface UpdateActionsProps {
  onClose: () => void;
  alertsRef: React.RefObject<AlertsContainerRef>;
  refetchActions: () => Promise<void>;
  isOpen: boolean;
  Actions: {
    id: string;
    actionId: string;
    meetingId: string;
    actionType: string;
    description: string;
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
        reportedUser: {
          userId: string;
          fullName: string;
          email: string;
        };
        reportedBy: {
          userId: string;
          fullName: string;
          email: string;
        };
      };
    };
    handledByInformation: {
      userId: string;
      fullName: string;
      email: string;
    };
    createdDate: string;
    createdTime: string;
  };
}

export default function UpdateActionsModal({
  onClose,
  isOpen,
  Actions,
  refetchActions,
  alertsRef,
}: UpdateActionsProps) {
  if (!isOpen) return null;
  const { user, token } = useContext(AppContext)!;

  const [actionType, setActionType] = useState(Actions.actionType || 'none');
  const [description, setDescription] = useState(Actions.description || '');
  const [relationStatus, setRelationStatus] = useState(
    Actions.meetingInformation.relation.status || 'resolved',
  );
  const [meetingStatus, setMeetingStatus] = useState(
    Actions.meetingInformation.status || 'completed',
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log(
      actionType,
      description,
      relationStatus,
      meetingStatus,
      Actions.meetingId,
      Actions.meetingInformation.relation.relationId,
      user?.id,
    );

    const payload = {
      meeting_id: Actions.meetingId,
      relation_id: Actions.meetingInformation.relation.relationId,
      action_type: actionType,
      description: description,
      handled_by: user?.id,
      relation_status: relationStatus,
      meeting_status: meetingStatus,
    };

    const res = await fetch(
      `${API_BASE_URL}/api/relation-actions/${Actions.id}`,
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
        <div className="bg-[#2D3F99] text-white px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
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

        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="px-5 py-6 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 font-serif leading-relaxed text-gray-800 dark:text-gray-200">
            <h3 className="text-2xl font-bold border-b dark:border-gray-700 pb-2 mb-6 text-center">
              UPDATE EMPLOYEE ACTION
            </h3>

            {/* Case Information */}
            <div className="grid grid-cols-2 gap-6">
              {/* Action No */}
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Action ID
                </p>
                <p className="font-semibold text-sm">{Actions.actionId}</p>
              </div>

              {/* Meeting ID */}
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Meeting ID
                </p>
                <p className="font-semibold text-sm">
                  {Actions.meetingInformation.meetingId}
                </p>
              </div>

              {/* Meeting ID */}
              <div className="bg-white dark:bg-gray-900 p-4 border dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Case ID
                </p>
                <p className="font-semibold text-sm">
                  {Actions.meetingInformation.relation.relationId}
                </p>
              </div>
              {/* Action Type */}
              <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Action Type
                </label>
                <select
                  defaultValue={Actions.actionType}
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
                  onChange={(e) => setRelationStatus(e.target.value)}
                  defaultValue={Actions.meetingInformation.relation.status}
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
                  defaultValue={Actions.meetingInformation.status}
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
                  defaultValue={Actions.description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description here..."
                  rows={4}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t dark:border-gray-700 px-6 py-4 flex justify-end space-x-2">
              <button className="flex items-center gap-2 text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-600">
                <ClipboardPen size={18} />
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
