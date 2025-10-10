import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { CalendarPlus2, ClipboardPen, Eye, Search } from 'lucide-react';
import AddActionsModal from './AddActions';
import ViewActionsModal from './ViewActions';
import UpdateActionsModal from './UpdateActions';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../../context/AppContext';
import API_BASE_URL from '../../../../config/api';

interface Actions {
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
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const Actions = ({ alertsRef }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const { user, token } = useContext(AppContext)!;

  const [actions, setActions] = useState<Actions[]>([]);

  const fetchActions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/relation-actions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        setActions(res.data);
      } else {
        console.error('Failed to fetch employees:', res);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchActions();
  }, [user, token]);

  const itemsPerPage = 10;

  // Filtered results
  const filteredMeetings = actions.filter(
    (action) =>
      action.actionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.meetingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.meetingInformation.relation.relationId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      action.meetingInformation.relation.relationId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      action.createdDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.handledByInformation.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      <Breadcrumb pageName="Management Action" />

      {/* Search bar and Add button */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-4 mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Actions ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded px-27 py-2 shadow-sm 
            focus:ring focus:ring-blue-200 
            bg-white text-gray-800 
            dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 
            dark:placeholder-gray-400 dark:focus:ring-blue-500"
          />

          <Search className="text-gray-600 dark:text-gray-300" />
        </div>

        <button
          onClick={() => {
            setShowAdd(true);
          }}
          className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          <CalendarPlus2 size={20} />
        </button>
        <AddActionsModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          refetchActions={fetchActions}
          alertsRef={alertsRef}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm text-gray-700 dark:text-gray-100 text-center">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Action ID</th>
                <th className="px-6 py-3">Meeting ID</th>
                <th className="px-6 py-3">Relation ID</th>
                <th className="px-6 py-3">Action Type</th>
                <th className="px-6 py-3">Handled By</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeetings.length > 0 ? (
                paginatedMeetings.map((m, index) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{m.actionId}</td>
                    <td className="px-6 py-3">{m.meetingId}</td>
                    <td className="px-6 py-3">
                      {m.meetingInformation.relation.relationId}
                    </td>
                    <td className="px-6 py-3">{m.actionType}</td>
                    <td className="px-6 py-3">
                      {m.handledByInformation.fullName}
                    </td>
                    <td className="px-6 py-3">{m.createdDate}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRow(m);
                          setShowView(true);
                        }}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedRow(m);
                          setShowUpdate(true);
                        }}
                        className="bg-[#2D3F99] hover:bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        <ClipboardPen size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-3 text-center text-gray-500 dark:text-gray-400 italic"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ViewActionsModal
        isOpen={showView}
        onClose={() => setShowView(false)}
        Actions={selectedRow}
      />
      <UpdateActionsModal
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        Actions={selectedRow}
        refetchActions={fetchActions}
        alertsRef={alertsRef}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? 'bg-blue-500 text-white px-3 py-1 rounded'
                  : 'px-3 py-1 border dark:border-gray-600 dark:text-gray-100 rounded'
              }
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Actions;
