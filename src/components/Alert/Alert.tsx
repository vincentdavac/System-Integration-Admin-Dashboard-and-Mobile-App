import React, { useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  // Auto close after 2 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'border-green-500 bg-green-100 text-green-700',
    warning: 'border-yellow-500 bg-yellow-100 text-yellow-700',
    error: 'border-red-500 bg-red-100 text-red-700',
  };

  const titles = {
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
  };

  return (
    <div
      className={`relative mb-3 w-64 sm:w-80 rounded-md border-l-4 p-3 sm:p-4 shadow-md bg-opacity-90 text-sm sm:text-base ${styles[type]}`}
    >
      {/* Close button in upper right */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-lg sm:text-xl font-bold text-gray-700 hover:text-black"
      >
        ×
      </button>

      {/* Title */}
      <h5 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold">
        {titles[type]}
      </h5>

      {/* Message */}
      <p className="leading-snug sm:leading-relaxed">{message}</p>
    </div>
  );
};

export default Alert;
