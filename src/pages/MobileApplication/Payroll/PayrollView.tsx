import { ArrowLeft } from "lucide-react";

const MobilePayrollView = () => {
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
          <h1 className="text-lg font-semibold">View Payroll</h1>
        </div>

        {/* Date & Employee Info */}
        <div className="absolute bottom-3 left-4 text-white text-sm space-y-1">
          <p>
            <span className="font-semibold">Date:</span> September 27, 2025
          </p>
          <p>
            <span className="font-semibold">Full Name:</span> Vincent Ahron M. Davac
          </p>
          <p>
            <span className="font-semibold">Employee No.:</span> 20220041
          </p>
        </div>
      </div>

      {/* Payroll Info Section */}
      <div className="mt-4 px-4 pb-10">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Payroll Information
        </h2>

        {/* Cutoff Start */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Cutoff Start</label>
          <input
            type="text"
            value="September 27, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Cutoff End */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Cutoff End</label>
          <input
            type="text"
            value="September 30, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Gross Salary */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Gross Salary</label>
          <input
            type="text"
            value="₱ 25,000.00"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Total Deduction */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Total Deduction</label>
          <input
            type="text"
            value="₱ 5,000.00"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Net Salary */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Net Salary</label>
          <input
            type="text"
            value="₱ 20,000.00"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>

        {/* Date */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Date</label>
          <input
            type="text"
            value="September 27, 2025"
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-100"
          />
        </div>
      </div>

      {/* Bottom Space */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobilePayrollView;
