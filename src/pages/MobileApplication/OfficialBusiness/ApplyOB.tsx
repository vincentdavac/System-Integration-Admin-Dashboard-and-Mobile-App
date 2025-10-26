import { ArrowLeft } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface ObRequestProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileApplyOfficialBusiness = ({ alertsRef }: ObRequestProps) => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext)!;

  // Form states
  const [purpose, setPurpose] = useState('');
  const [destination, setDestination] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  // ✅ Submit function
  const submitOBRequest = async () => {
    const formData = new FormData();
    formData.append('purpose', purpose);
    formData.append('destination', destination);
    formData.append('date_start', dateStart);
    formData.append('date_end', dateEnd);
    formData.append('time_out', timeOut);
    formData.append('time_in', timeIn);
    if (attachment) formData.append('attachment', attachment);

    try {
      const response = await fetch(`${API_BASE_URL}/api/official-business`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      const res = await response.json();

      alertsRef.current?.clearAlerts();

      if (res.errors) {
        Object.values(res.errors).forEach((messages) => {
          (messages as string[]).forEach((msg) => {
            alertsRef.current?.addAlert('error', msg);
          });
        });
      } else if (res.error) {
        alertsRef.current?.addAlert('error', res.error);
      } else if (res.message && res.status === 'Successful request') {
        alertsRef.current?.addAlert('success', res.message);
        navigate('/mobile/ob-history');
      } else {
        alertsRef.current?.addAlert('error', res.message || 'Request failed.');
      }
    } catch (err) {
      console.error(err);
      alertsRef.current?.addAlert('error', 'Something went wrong.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOBRequest();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Header Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        <div className="absolute top-4 left-4 flex items-center text-white">
          <button
            onClick={() => navigate('/mobile/ob-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">APPLY OFFICIAL BUSINESS</h1>
        </div>
      </div>

      {/* ✅ Form Section */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex-1 px-4 mt-6 pb-10"
      >
        <div className="bg-white p-4 rounded-xl shadow-md mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Official Business Details
          </h2>

          {/* Purpose */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter your purpose"
              required
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
            />
          </div>

          {/* Destination */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              required
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
            />
          </div>

          {/* Date Range */}
          <div className="flex space-x-3 mb-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">
                Date Start
              </label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">
                Date End
              </label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
              />
            </div>
          </div>

          {/* Time Range */}
          <div className="flex space-x-3 mb-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">
                Time Out
              </label>
              <input
                type="time"
                value={timeOut}
                onChange={(e) => setTimeOut(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">
                Time In
              </label>
              <input
                type="time"
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Attachment (Optional)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setAttachment(e.target.files[0]);
                }
              }}
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:ring focus:ring-green-200"
            />
          </div>
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2D3F99] text-white py-2 rounded-md font-medium text-sm shadow-md hover:bg-[#1f2f70] transition-all"
        >
          Submit Official Business Request
        </button>
      </form>

      <div className="h-10"></div>
    </div>
  );
};

export default MobileApplyOfficialBusiness;
