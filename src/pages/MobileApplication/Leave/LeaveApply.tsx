import { ArrowLeft } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';
interface LeaveRequestProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileLeaveApply = ({ alertsRef }: LeaveRequestProps) => {
  const navigate = useNavigate();

  const { user, token } = useContext(AppContext)!;

  const users_id = user?.id;
  const student_no = user?.employeeNo;
  const [leave_type_id, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [image_file, SetImageFile] = useState<File | null>(null);
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]); // ✅ must be array

  // ✅ Fetch leave types when component mounts
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/leave-types`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.status === 'Successful request') {
          setLeaveTypes(data.data || []);
          console.log(data.data);
        } else {
          // alertsRef.current?.addAlert(
          //   'error',
          //   data.message || 'Failed to fetch leave types',
          // );
          setLeaveTypes(data.data || []);
          console.log(data.data);
        }
      } catch (error) {
        console.error('Error fetching leave types:', error);
        alertsRef.current?.addAlert(
          'error',
          'Network error. Please check your connection and try again.',
        );
      }
    };

    fetchLeaveTypes();
  }, [token, alertsRef]); // ✅ Properly outside any function

  const submitLeaveRequest = async () => {
    console.log(users_id);
    console.log(student_no);
    console.log(leave_type_id);
    console.log(reason);
    console.log(start_date);
    console.log(end_date);
    console.log(image_file);

    const formData = new FormData();
    formData.append('users_id', String(users_id));
    formData.append('leave_type_id', leave_type_id);
    formData.append('student_no', String(student_no));
    formData.append('reason', reason);
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);

    if (image_file) {
      formData.append('image_file', image_file);
    }

    const response = await fetch(`${API_BASE_URL}/api/leave-requests`, {
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
      navigate('/mobile/leave');
    } else {
      console.log(res);
      alertsRef.current?.addAlert('error', res.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submitLeaveRequest();
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
          <button onClick={() => navigate('/mobile/leave')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">APPLY LEAVE</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Form Section */}
        <div className="mt-6 px-4 pb-10">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Leave Request Information
          </h2>

          {/* Leave Type */}
          {/* Leave Type */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Leave Type *
            </label>
            <select
              value={leave_type_id}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
              required
            >
              <option value="">Choose...</option>
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">From</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">To</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Reason</label>
            <textarea
              placeholder="Reason"
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none resize-none"
              rows={3}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          {/* Upload */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">Upload</label>
            <input
              name="image_file"
              type="file"
              className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  SetImageFile(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2D3F99] text-white py-2 rounded-md font-medium text-sm"
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

export default MobileLeaveApply;
