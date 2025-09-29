import { ArrowLeft, Search } from "lucide-react";

const MobileRelationsSubmit = () => {
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

        {/* Header (Back Button + Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Employee Relations</h1>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-1/2 bottom-[-22px] transform -translate-x-1/2 w-[85%]">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search employee you want to report..."
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-10 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Relations Request Information
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Employee Involved
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
          />
        </div>

        {/* Case Type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Type</label>
          <select className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none">
            <option>Choose...</option>
            <option>Complaint</option>
            <option>Grievance</option>
            <option>Disciplinary</option>
            <option>Dispute</option>
          </select>
        </div>

        {/* Case Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Case Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
          />
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Details</label>
          <textarea
            placeholder="Enter details"
            className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[#2D3F99] text-white py-2 rounded-md font-medium text-sm">
          Submit
        </button>
      </div>

      {/* Extra bottom space */}
      <div className="h-10"></div>
    </div>
  );
};

export default MobileRelationsSubmit;
