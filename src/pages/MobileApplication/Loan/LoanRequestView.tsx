import { ArrowLeft } from "lucide-react";

const MobileLoanRequest = () => {
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
          <h1 className="text-lg font-semibold">Loan Request</h1>
        </div>

        {/* Centered Status */}
        <div className="absolute top-14 w-full text-center">
          <p className="text-base font-semibold text-white">Approved</p>
          <p className="text-sm text-white opacity-90 -mt-1">Status</p>
        </div>

        {/* Date & Loan ID */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          <p>
            <span className="font-semibold">Date:</span> September 14, 2025
          </p>
          <p>
            <span className="font-semibold">Loan ID:</span> 2022041
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-4 px-4 pb-6">
        {/* Loan Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Loan Information
        </h2>

        {/* Loan Type & Loan Amount */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Loan Type</label>
            <input
              type="text"
              value="Salary Loan"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Loan Amount</label>
            <input
              type="text"
              value="₱ 25,000.00"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Approved Amount & Interest Rate */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Approved Amount
            </label>
            <input
              type="text"
              value="₱ 25,000.00"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Interest Rate</label>
            <input
              type="text"
              value="7%"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Loan Term & Application Date */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">Loan Term</label>
            <input
              type="text"
              value="12 Months"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-1">
              Application Date
            </label>
            <input
              type="text"
              value="September 14, 2025"
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* HR Information */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Human Resource Information
        </h2>

        {/* Validated By */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Validated by</label>
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
            value="Passed"
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100 resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Date Approved */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Date Approved</label>
          <input
            type="text"
            value="September 14, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Close Button */}
        <button className="w-full bg-[#2D3F99] text-white py-2 rounded-md font-medium text-sm">
          Close
        </button>
      </div>

      {/* Slightly smaller extra bottom space */}
      <div className="h-4"></div>
    </div>
  );
};

export default MobileLoanRequest;
