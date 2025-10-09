import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import AddMeetingModal from './AddMeeting';
import { CalendarPlus2, Eye, Search, ClipboardPen } from 'lucide-react';
import ViewMeetingModal from './ViewMeeting';
import UpdateMeetingModal from './UpdateMeeting';
import { AppContext } from '../../../../context/AppContext';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';

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
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const Meeting = ({ alertsRef }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const { user, token } = useContext(AppContext)!;

  const fetchMeetings = async () => {
    try {
      const response = await fetch(`/api/relation-meetings/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        setMeetings(res.data);
      } else {
        console.error('Failed to fetch employees:', res);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchMeetings();
  }, [user, token]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(meetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredMeetings = meetings.filter(
    (m) =>
      m.meetingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.relationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.createdDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'cancelled':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'rescheduled':
        return 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
      case 'scheduled':
      default:
        return 'bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium inline-block';
    }
  };

  return (
    <>
      <Breadcrumb pageName="Management Meeting" />

      {/* Search + Add Button */}
      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Meeting ID"
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
          className="ml-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 p-2 rounded "
          onClick={() => setShowAdd(true)}
        >
          <CalendarPlus2 size={20} />
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-center text-sm text-gray-700 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Meeting Id.</th>
                <th className="px-6 py-3">Case Id</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date Reported</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeetings.length > 0 ? (
                paginatedMeetings.map((m, index) => (
                  <tr
                    key={m.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 text-center dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{m.meetingId}</td>
                    <td className="px-6 py-3">{m.relationId}</td>
                    <td className="px-6 py-3">{m.location}</td>
                    <td className="px-6 py-3">
                      <span className={getStatusClasses(m.status)}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{m.createdDate}</td>

                    <td className="px-6 py-3 flex justify-center gap-2">
                      <button
                        className="text-white px-4 py-2 rounded bg-green-600 hover:bg-green-500"
                        onClick={() => {
                          setSelectedRow(m);
                          setShowView(true);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-white px-4 py-2 rounded bg-[#2D3F99] hover:bg-blue-600"
                        onClick={() => {
                          setSelectedRow(m);
                          setShowUpdate(true);
                        }}
                      >
                        <ClipboardPen size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-3 text-center text-gray-500 italic dark:text-gray-400"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
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
                  ? 'bg-[#2D3F99] text-white px-3 py-1 rounded'
                  : 'px-3 py-1 border rounded dark:border-gray-700 dark:text-gray-200'
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
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {showAdd && (
        <AddMeetingModal
          onClose={() => setShowAdd(false)}
          alertsRef={alertsRef}
          refetchMeetings={fetchMeetings}
        />
      )}
      {showView && (
        <ViewMeetingModal
          onClose={() => setShowView(false)}
          Meeting={selectedRow}
        />
      )}
      {showUpdate && (
        <UpdateMeetingModal
          onClose={() => setShowUpdate(false)}
          Meeting={selectedRow}
          alertsRef={alertsRef}
          refetchMeetings={fetchMeetings}
        />
      )}
    </>
  );
};

export default Meeting;
