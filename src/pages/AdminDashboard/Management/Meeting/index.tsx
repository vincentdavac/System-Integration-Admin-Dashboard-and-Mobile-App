import React, { useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";

const Meeting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [meetingsData, setMeetingsData] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      accountNo: `202200${i + 41}`,
      date: "2025-09-15",
      time: "10:00 AM",
      location: `Room ${i + 1}`,
      caseId: `CASE-${i + 100}`,
      dateReported: "2025-09-14",
      status: "Pending",
      participants: `Participant ${i}`,
      notes: `Sample Notes ${i}`,
    }))
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(meetingsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredMeetings = meetingsData.filter(
    (m) =>
      m.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.caseId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  const handleSaveUpdate = () => {
    if (!selectedRow) return;
    setMeetingsData((prev) =>
      prev.map((m) => (m.id === selectedRow.id ? selectedRow : m))
    );
    setShowUpdate(false);
    alert("Changes saved successfully!");
  };

  const handleAddMeeting = (newMeeting: any) => {
    setMeetingsData((prev) => [
      ...prev,
      { id: prev.length + 1, status: "Pending", ...newMeeting },
    ]);
    setShowAdd(false);
    alert("Meeting added successfully!");
  };

  return (
    <>
      <Breadcrumb pageName="Meetings" />

      {/* Search + Add Button */}
      <div className="flex justify-between items-center mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by account no. or case ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
        <button
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowAdd(true)}
        >
          Add Meeting
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-center text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Account No.</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Time</th>
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
                  <tr key={m.id} className="border-b hover:bg-gray-50 text-center">
                    <td className="px-6 py-3">{startIndex + index + 1}</td>
                    <td className="px-6 py-3">{highlightMatch(m.accountNo)}</td>
                    <td className="px-6 py-3">{m.date}</td>
                    <td className="px-6 py-3">{m.time}</td>
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
                        className="text-white px-3 py-1 rounded hover:bg-[#24327A]"
                        style={{ backgroundColor: "#2D3F99" }}
                        onClick={() => {
                          setSelectedRow(m);
                          setShowView(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="text-white px-3 py-1 rounded hover:bg-[#24327A]"
                        style={{ backgroundColor: "#2D3F99" }}
                        onClick={() => {
                          setSelectedRow(m);
                          setShowUpdate(true);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-3 text-center text-gray-500 italic">
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
                  ? "bg-[#2D3F99] text-white px-3 py-1 rounded"
                  : "px-3 py-1 border rounded"
              }
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add Meeting Modal */}
      {showAdd && (
        <AddMeetingModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAddMeeting}
        />
      )}

      {/* View Modal */}
      {showView && selectedRow && (
        <MeetingModal
          row={selectedRow}
          onClose={() => setShowView(false)}
          editable={false}
        />
      )}

      {/* Update Modal */}
      {showUpdate && selectedRow && (
        <MeetingModal
          row={selectedRow}
          onClose={() => setShowUpdate(false)}
          editable={true}
          onSave={handleSaveUpdate}
          setRow={setSelectedRow}
        />
      )}
    </>
  );
};

export default Meeting;

// ---------- Add Meeting Modal ----------
const AddMeetingModal = ({ onClose, onAdd }: any) => {
  const [newMeeting, setNewMeeting] = useState({
    caseId: "",
    date: "",
    time: "",
    location: "",
    participants: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!newMeeting.caseId || !newMeeting.date) {
      alert("Please fill required fields!");
      return;
    }
    onAdd(newMeeting);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <h3 className="font-semibold">Add Meeting</h3>
          <button onClick={onClose} className="text-white text-lg font-bold">
            ✖
          </button>
        </div>
        <div className="px-6 py-4 flex-1 overflow-y-auto space-y-2">
          {[
            { label: "Case ID", key: "caseId", type: "text" },
            { label: "Date", key: "date", type: "date" },
            { label: "Time", key: "time", type: "time" },
            { label: "Location", key: "location", type: "text" },
            { label: "Participants", key: "participants", type: "text" },
            { label: "Notes", key: "notes", type: "textarea" },
          ].map((field) => (
            <p key={field.key}>
              <strong>{field.label}:</strong>
              {field.type === "textarea" ? (
                <textarea
                  value={newMeeting[field.key]}
                  onChange={(e) =>
                    setNewMeeting({ ...newMeeting, [field.key]: e.target.value })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <input
                  type={field.type}
                  value={newMeeting[field.key]}
                  onChange={(e) =>
                    setNewMeeting({ ...newMeeting, [field.key]: e.target.value })
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              )}
            </p>
          ))}
        </div>
        <div className="p-4 flex justify-end space-x-2 sticky bottom-0 bg-white z-10">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- View / Update Modal ----------
const MeetingModal = ({ row, onClose, editable = false, onSave, setRow }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col">
        <div
          className={`px-4 py-2 flex justify-between items-center rounded-t-lg sticky top-0 z-10 text-white`}
          style={{ backgroundColor: "#2D3F99" }}
        >
          <h3 className="font-semibold">{editable ? "Update Meeting" : "View Meeting"}</h3>
          <button onClick={onClose} className="text-white text-lg font-bold">
            ✖
          </button>
        </div>
        <div className="px-6 py-4 flex-1 overflow-y-auto space-y-2">
          {[
            { label: "Case Id", key: "caseId" },
            { label: "Date", key: "date" },
            { label: "Time", key: "time" },
            { label: "Location", key: "location" },
            { label: "Participants", key: "participants" },
            { label: "Notes", key: "notes" }, // <-- Notes
          ].map((field) => (
            <p key={field.key}>
              <strong>{field.label}:</strong>{" "}
              {editable ? (
                field.key === "notes" ? (
                  <textarea
                    value={row[field.key]}
                    onChange={(e) => setRow({ ...row, [field.key]: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <input
                    type={field.key === "date" ? "date" : field.key === "time" ? "time" : "text"}
                    value={row[field.key]}
                    onChange={(e) => setRow({ ...row, [field.key]: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                )
              ) : (
                row[field.key]
              )}
            </p>
          ))}
        </div>
        {editable && (
          <div className="p-4 flex justify-end space-x-2 sticky bottom-0 bg-white z-10">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="text-white px-4 py-2 rounded hover:bg-[#24327A]"
              style={{ backgroundColor: "#2D3F99" }}
              onClick={onSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
