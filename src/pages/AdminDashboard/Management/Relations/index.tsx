import React, { useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import ViewCaseModal from './ViewCaseModal';
import { Eye, Search } from 'lucide-react';

const Relations = () => {
  const [showView, setShowView] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Management Relation" />

      {/* Search Bar (static only, no state) */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder=" Search Case ID"
          onChange={(e) => {}}
          className="w-full md:w-1/4 mb-2 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
        <Search />
      </div>

      {/* Scrollable Table with Static Values */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white ">
        <div className="h-[500px] overflow-y-auto">
          <table className="w-full min-w-[900px] text-center text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Relation No.</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Case Type</th>
                <th className="px-6 py-3">Person Involved</th>
                <th className="px-6 py-3">Reported By</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 text-center">
                <td className="px-6 py-3">1</td>
                <td className="px-6 py-3">2025-0001</td>
                <td className="px-6 py-3">Sept. 24, 2025</td>
                <td className="px-6 py-3">Dispute</td>
                <td className="px-6 py-3">Reported User</td>
                <td className="px-6 py-3">Reported By</td>
                <td className="px-6 py-3">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                    Open
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
                    onClick={() => setShowView(true)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
              {/* Add more static rows here if needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Static Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled
        >
          Previous
        </button>

        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
        </div>

        <button className="px-4 py-2 bg-gray-300 rounded">Next</button>
      </div>

      {/* Modal */}
      {showView && <ViewCaseModal onClose={() => setShowView(false)} />}
    </>
  );
};

export default Relations;
