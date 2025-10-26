import { ArrowLeft } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';

interface LeaveRequestProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const RequestCoe = ({ alertsRef }: LeaveRequestProps) => {
  const navigate = useNavigate();

  const { token } = useContext(AppContext)!;
  const [purpose, setPurpose] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const submitCOERequest = async () => {
    const formData = new FormData();
    formData.append('purpose', String(purpose));
    formData.append('employment_status', String(employmentStatus));

    if (attachment) {
      formData.append('attachment', attachment);
    }

    const response = await fetch(`${API_BASE_URL}/api/coe`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    const res = await response.json(); // ✅ Parse the JSON manually

    if (res.errors) {
      // Validation errors exist
      alertsRef.current?.clearAlerts();

      Object.values(res.errors).forEach((messages) => {
        (messages as string[]).forEach((msg) => {
          alertsRef.current?.addAlert('error', msg);
        });
      });
    } else if (res.error && res.status === 'Error has occurred') {
      // Custom backend error (like date range conflict)
      alertsRef.current?.clearAlerts();
      alertsRef.current?.addAlert('error', res.error);
    } else if (res.message && res.status === 'Successful request') {
      // Success message from backend
      alertsRef.current?.clearAlerts();
      alertsRef.current?.addAlert('success', res.message);
      navigate('/mobile/coe-history');
    } else {
      console.log(res);
      alertsRef.current?.addAlert('error', res.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submitCOERequest();
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Green Background Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button
            onClick={() => navigate('/mobile/coe-history')}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">REQUEST CERTIFICATION</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Form Section */}
        <div className="mt-6 px-4 pb-10">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Employee Information
          </h2>

          {/* Purpose (Dropdown) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Purpose</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none bg-white"
              required
            >
              <option value="">Select Purpose</option>
              <option value="For Job Application">For Job Application</option>
              <option value="For Bank Loan">For Bank Loan</option>
              <option value="For Visa Application">For Visa Application</option>
              <option value="For Personal Record">For Personal Record</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Employment Status (Dropdown) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Employment Status
            </label>
            <select
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none bg-white"
              required
            >
              <option value="">Select Employment Status</option>
              <option value="Part-Time Teaching">Part-Time Teaching</option>
              <option value="Regular Employment">Regular Employment</option>
              <option value="Probationary Employment">
                Probationary Employment
              </option>
            </select>
          </div>

          {/* Upload */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">
              Attachment
            </label>
            <input
              name="attachment"
              type="file"
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setAttachment(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2D3F99] text-white py-2 rounded-md font-medium text-sm hover:bg-[#1f2f70] transition-all"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Extra bottom space */}
      <div className="h-10"></div>
    </div>
  );
};

export default RequestCoe;
