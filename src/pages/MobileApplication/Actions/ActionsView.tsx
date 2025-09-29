import { ArrowLeft } from "lucide-react";

const MobileActionsView = () => {
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
          <h1 className="text-lg font-semibold">Relation Actions</h1>
        </div>

        {/* Date & Case ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> September 14, 2025
          </p>
          <p>
            <span className="font-semibold">Reported by:</span> Marvel John
          </p>
          <p>
            <span className="font-semibold">Case ID:</span> 2022041
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-10">
        {/* Meeting Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Meeting Information
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
            rows={3}
          ></textarea>
        </div>

        {/* Employee Relation Actions Section */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Employee Relation Actions
        </h2>

        {/* Action Type & Date side by side */}
        <div className="flex gap-4 mb-4">
          {/* Action Type */}
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Action type</label>
            <input
              type="text"
              value="Written Warning"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>

          {/* Date */}
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value="September 14, 2025"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Handled By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Handled By</label>
          <input
            type="text"
            value="Vincent Ahron M. Davac"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Descriptions */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Descriptions</label>
          <textarea
            readOnly
            value="Descriptions"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>
      </div>

      {/* Bottom Space */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobileActionsView;
