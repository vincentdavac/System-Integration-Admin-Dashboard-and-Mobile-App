import { ArrowLeft } from "lucide-react";

const MobileRelationsView = () => {
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
          <button className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Employee Relations</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-14 w-full text-center">
          <p className="text-base font-semibold text-white">Open</p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Case ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> September 14, 2025
          </p>
          <p>
            <span className="font-semibold">Case ID:</span> 2022041
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-6">
        {/* Employee Relations Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Employee Relations Information
        </h2>

        {/* Employee Involve */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Employee Involve
          </label>
          <input
            type="text"
            value="John Smith Doe"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Case Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Type</label>
          <input
            type="text"
            value="Complaint"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Case Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Title</label>
          <input
            type="text"
            value="Reklamo"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Details</label>
          <textarea
            readOnly
            value="Detalye ng reklamo"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Human Resource Information
        </h2>

        {/* Handled By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Handled by</label>
          <input
            type="text"
            value="Vincent Ahron M. Davac"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Remarks</label>
          <textarea
            readOnly
            value="remarks"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Date Received */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Date Received
          </label>
          <input
            type="text"
            value="September 14, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Resolution */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Resolution</label>
          <textarea
            readOnly
            value="resolution"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Disciplinary Level */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Disciplinary Level
          </label>
          <input
            type="text"
            value="September 14, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Slightly larger extra bottom space */}
      <div className="h-13"></div>
    </div>
  );
};

export default MobileRelationsView;
