import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { AppContext } from '../../../context/AppContext';
import API_BASE_URL from '../../../config/api';
interface LogoutProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileProfile = ({ alertsRef }: LogoutProps) => {
  const [showContact, setShowContact] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user, token, setUser, setToken } = useContext(AppContext)!;

  const navigate = useNavigate();

  async function handleLogout(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);

      localStorage.removeItem('token');

      alertsRef.current?.addAlert(
        'success',
        data.message || 'Logout successfully',
      );
      navigate('/mobile/login');
    }
  }

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alertsRef.current?.addAlert('error', 'Passwords do not match');
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/update-account/${user?.employeeNo}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            hrm_password: newPassword,
            hrm_password_confirmation: confirmPassword,
          }),
        },
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        // backend returned validation error
        if (data.errors) {
          Object.values(data.errors).forEach((msgs) => {
            (msgs as string[]).forEach(
              (msg) => alertsRef.current?.addAlert('error', msg),
            );
          });
        } else {
          alertsRef.current?.addAlert(
            'error',
            data.message || 'Password reset failed',
          );
        }
        return;
      }

      alertsRef.current?.addAlert(
        'success',
        data.message || 'Password updated successfully',
      );
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      alertsRef.current?.addAlert('error', 'Something went wrong');
    }
  }

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
          {/* <button className="mr-2">
            <ArrowLeft size={24} />
          </button> */}
          <h1 className="text-lg font-semibold">PROFILE INFORMATION</h1>
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
          <img
            src={`https://fjp.ucc.bsit4c.com/${user?.image}`}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-5 pb-10 h-[640px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {/* Personal Information */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-4">
          <h2 className="font-semibold text-gray-700 mb-3">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={user?.fullName || 'First Name'}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="p-2 border rounded-md text-sm"
              disabled
            />
            <input
              type="text"
              value={user?.section || 'Last Name'}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="p-2 border rounded-md text-sm"
              disabled
            />
            <input
              disabled
              type="email"
              value={user?.email || 'Email Address'}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email Address"
              className="p-2 border rounded-md text-sm col-span-2"
            />
            <input
              disabled
              type="text"
              value={user?.employeeNo || '2022XXXX-S'}
              onChange={(e) => setUser({ ...user, employeeNo: e.target.value })}
              className="p-2 border rounded-md text-sm"
            />
            <input
              disabled
              type="text"
              value={user?.createdDate || 'YYYY/MM/DD'}
              onChange={(e) =>
                setUser({ ...user, createdDate: e.target.value })
              }
              placeholder="Date Created"
              className="p-2 border rounded-md text-sm"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowContact(!showContact)}
          >
            <h2 className="font-semibold text-gray-700">Contact Information</h2>
            <span>{showContact ? '−' : '+'}</span>
          </div>
          {showContact && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                disabled
                type="text"
                value={user?.contactNumber || 'Email Address'}
                onChange={(e) =>
                  setUser({ ...user, contactNumber: e.target.value })
                }
                placeholder="Mobile Number"
                className="p-2 border rounded-md text-sm col-span-2"
              />
              <input
                disabled
                type="text"
                placeholder="Home Address"
                defaultValue="Caloocan City, Metro Manila 1400"
                className="p-2 border rounded-md text-sm col-span-2"
              />
              <input
                disabled
                type="text"
                value={user?.createdDate || 'Employment Type'}
                onChange={(e) =>
                  setUser({ ...user, createdDate: e.target.value })
                }
                placeholder="Date Created"
                defaultValue="November 08, 2025"
                className="p-2 border rounded-md text-sm col-span-2"
              />
            </div>
          )}
        </div>

        {/* Work Information */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowWork(!showWork)}
          >
            <h2 className="font-semibold text-gray-700">Work Information</h2>
            <span>{showWork ? '−' : '+'}</span>
          </div>
          {showWork && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                disabled
                type="text"
                value={user?.department || 'Department'}
                onChange={(e) =>
                  setUser({ ...user, department: e.target.value })
                }
                placeholder="Department"
                defaultValue="Finance"
                className="p-2 border rounded-md text-sm col-span-2"
              />
              <input
                disabled
                type="text"
                value={user?.employmentType || 'Employment Type'}
                onChange={(e) =>
                  setUser({ ...user, employmentType: e.target.value })
                }
                placeholder="Employment Type"
                defaultValue="EMP-10023"
                className="p-2 border rounded-md text-sm"
              />
              <input
                disabled
                type="text"
                value={user?.position || 'Position'}
                onChange={(e) => setUser({ ...user, position: e.target.value })}
                placeholder="Position"
                defaultValue="Professor"
                className="p-2 border rounded-md text-sm"
              />
              <input
                disabled
                type="text"
                value={'PHP ' + user?.hourlyRate || 'Department'}
                onChange={(e) =>
                  setUser({ ...user, hourlyRate: e.target.value })
                }
                placeholder="Hourly Rate"
                defaultValue="PHP 200"
                className="p-2 border rounded-md text-sm"
              />
            </div>
          )}
        </div>

        <form onSubmit={handlePasswordReset}>
          {/* Password Reset */}
          <div className="bg-white shadow-md rounded-xl p-4 mb-6">
            <h2 className="font-semibold text-gray-700 mb-3">Password Reset</h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="username"
                autoComplete="username"
                className="hidden"
                tabIndex={-1} // prevent focus
              />

              <input
                type="password"
                placeholder="New password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border rounded-md text-sm"
                required
              />
              <input
                type="password"
                placeholder="Re-type password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border rounded-md text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-[#122979] text-white rounded-md py-2 text-sm"
            >
              Password Reset
            </button>
          </div>
        </form>

        {/* Logout button */}
        <div className="flex justify-center">
          <form onClick={handleLogout}>
            <button
              type="submit"
              className="bg-[#122979] text-white rounded-md py-1 px-3 text-xs w-40"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Space */}
      <div className="h-25"></div>
    </div>
  );
};

export default MobileProfile;
