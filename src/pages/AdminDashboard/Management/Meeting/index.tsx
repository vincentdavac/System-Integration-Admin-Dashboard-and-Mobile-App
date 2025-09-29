import { useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import AddMeetingModal from './AddMeeting';
import { CalendarPlus2, Eye, Search, ClipboardPen } from 'lucide-react';
import ViewMeetingModal from './ViewMeeting';
import UpdateMeetingModal from './UpdateMeeting';

interface MeetingData {
  id: number;
  accountNo: string;
  date: string;
  time: string;
  location: string;
  caseId: string;
  dateReported: string;
  status: 'Pending' | 'Approved' | 'Rejected'; // restrict to known statuses
  participants: string;
  notes: string;
}

const Meeting = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<MeetingData | null>(null);

  // ✅ Static JSON data
  const [meetingsData] = useState<MeetingData[]>([
    {
      id: 1,
      accountNo: '20220041',
      date: '2025-09-15',
      time: '10:00 AM',
      location: 'Room 1',
      caseId: 'CASE-101',
      dateReported: '2025-09-14',
      status: 'Pending',
      participants: 'John Doe, Jane Smith',
      notes: 'Kick-off meeting for project Alpha',
    },
    {
      id: 2,
      accountNo: '20220042',
      date: '2025-09-16',
      time: '2:00 PM',
      location: 'Room 2',
      caseId: 'CASE-102',
      dateReported: '2025-09-15',
      status: 'Approved',
      participants: 'Alice, Bob',
      notes: 'Budget approval discussion',
    },
    {
      id: 3,
      accountNo: '20220043',
      date: '2025-09-17',
      time: '9:30 AM',
      location: 'Room 3',
      caseId: 'CASE-103',
      dateReported: '2025-09-16',
      status: 'Rejected',
      participants: 'Charlie, David',
      notes: 'Review for project proposal',
    },
  ]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(meetingsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const filteredMeetings = meetingsData.filter(
    (m) =>
      m.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.caseId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      <Breadcrumb pageName="Management Meeting" />

      {/* Search + Add Button */}
      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder=" Search Meeting ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-full border rounded px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
          />
          <Search />
        </div>

        <button
          className="ml-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 p-2 rounded "
          onClick={() => setShowAdd(true)}
        >
          <CalendarPlus2 size={20} />
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-center text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Meeting Id.</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Case Id</th>
                <th className="px-6 py-3">Date Reported</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeetings.length > 0 ? (
                paginatedMeetings.map((m, index) => (
                  <tr
                    key={m.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(m.accountNo)}</td>
                    <td className="px-6 py-3">{m.location}</td>
                    <td className="px-6 py-3">{m.caseId}</td>
                    <td className="px-6 py-3">{m.dateReported}</td>
                    <td className="px-6 py-3">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        {m.status}
                      </span>
                    </td>
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
                    className="px-6 py-3 text-center text-gray-500 italic"
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
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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
                  : 'px-3 py-1 border rounded'
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
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {showAdd && <AddMeetingModal onClose={() => setShowAdd(false)} />}
      {showView && <ViewMeetingModal onClose={() => setShowView(false)} />}
      {showUpdate && (
        <UpdateMeetingModal onClose={() => setShowUpdate(false)} />
      )}
    </>
  );
};

export default Meeting;
