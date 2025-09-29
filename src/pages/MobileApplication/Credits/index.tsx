import { ArrowLeft } from "lucide-react";

const MobileCredits = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[180px] relative">
        <img
          src="/ucc_background/ucc_green_background.png" // ✅ background image path
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header (Back Button + Title) */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Leave Credits</h1>
        </div>

        {/* Vacation Leave Credits Card */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 bg-white rounded-xl shadow-lg w-[85%] p-4 flex items-center justify-between">
          {/* Left Content */}
          <div className="text-left">
            <p className="text-sm text-gray-500">Vacation Leave Credits</p>
            <p className="text-2xl font-bold text-green-700">Points: 10.00</p>
            <button className="mt-2 bg-green-700 text-white text-sm py-1 px-4 rounded-md">
              Current Credits
            </button>
          </div>

          {/* Right Side Placeholder for image */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            {/* You can place an image here later */}
            {/* <img src="/your_image.png" alt="Icon" className="w-full h-full object-cover" /> */}
          </div>
        </div>
      </div>

      {/* Space under card */}
      <div className="mt-20 px-4 pb-10">
        {/* Table Title */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Leave Credit History
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-2 px-2 text-left">No.</th>
                <th className="py-2 px-2 text-left">Earned</th>
                <th className="py-2 px-2 text-left">Used</th>
                <th className="py-2 px-2 text-left">Remaining</th>
                <th className="py-2 px-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-2">1.</td>
                <td className="py-2 px-2">10.00</td>
                <td className="py-2 px-2">0</td>
                <td className="py-2 px-2">10.00</td>
                <td className="py-2 px-2">Sept. 14, 2025</td>
              </tr>
              <tr>
                <td className="py-2 px-2">2.</td>
                <td className="py-2 px-2">10.00</td>
                <td className="py-2 px-2">0</td>
                <td className="py-2 px-2">10.00</td>
                <td className="py-2 px-2">Sept. 14, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MobileCredits;
