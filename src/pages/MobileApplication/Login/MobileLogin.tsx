import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileLogin = ({ alertsRef }: LoginProps) => {
  const { setToken } = useContext(AppContext)!;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    hrm_password: '',
  });

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      // Clear old alerts first
      alertsRef.current?.clearAlerts();

      // Show detailed field errors
      Object.values(data.errors).forEach((messages) => {
        (messages as string[]).forEach((msg) => {
          alertsRef.current?.addAlert('error', msg);
        });
      });
    } else if (data.message) {
      // No field errors → show main message
      alertsRef.current?.clearAlerts();
      alertsRef.current?.addAlert('error', data.message);
    } else {
      console.log(data);

      // get token from data.data.token
      const newToken = data.data.token;

      localStorage.setItem('token', newToken);

      setToken(newToken);

      navigate('/mobile/home');
      console.log({ newToken });

      // navigate('/admin/home');
      alertsRef.current?.addAlert('success', 'Login successful!');
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center relative shadow-lg overflow-hidden">
      {/* Background Image (Top Half) */}

      <div className="w-full h-1/2 relative overflow-hidden">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Title & Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-start text-center text-white px-4 pt-10 mt-10">
          <h1 className="text-2xl sm:text-3xl font-bold">
            University of Caloocan City
          </h1>
          <p className="text-sm sm:text-base">
            Human Resource Management System
          </p>
        </div>

        {/* Single reversed smooth curve */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff" // body background color
            d="M0,320 C480,200 960,200 1440,320 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Overlapping Logo */}
      <div className="relative -mt-16 z-10 mb-8">
        <img
          src="/icons/ucc_logo.png" // 🔹 logo path
          alt="Logo"
          className="w-24 h-24 sm:w-28 sm:h-28"
        />
      </div>

      {/* Login Form */}

      <div className="w-4/5 max-w-sm mt-8">
        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            type="email"
            placeholder="yourname@email.com"
            autoComplete="username" // ✅ Added
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            value={formData.hrm_password}
            onChange={(e) =>
              setFormData({
                ...formData,
                hrm_password: e.target.value,
              })
            }
            type="password"
            placeholder="********"
            autoComplete="current-password" // ✅ Added
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-6"
          />

          <button
            type="submit"
            className="w-full py-2 bg-[#122979] text-white rounded-md font-medium hover:bg-[#0f1f5c] transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-500 text-center px-2">
        Powered by: <br />
        BS in Information Technology 4C
      </div>
    </div>
  );
};

export default MobileLogin;
