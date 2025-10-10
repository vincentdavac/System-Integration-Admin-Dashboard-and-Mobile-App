import { useContext, useEffect, useState } from 'react';
import ClickOutside from '../ClickOutside';
import { AppContext } from '../../context/AppContext';
import API_BASE_URL from '../../config/api';
interface Notification {
  id: number;
  title: string;
  message: string;
  category: string;
  status: string;
  createdDate: string;
  createdTime: string;
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const { user, token } = useContext(AppContext)!;

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/notifications/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );
        const data = await response.json();

        if (response.ok && data.data) {
          setNotifications(data.data);
          setNotifying(
            data.data.some((n: Notification) => n.status === 'unread'),
          );
        } else {
          console.error('Failed to fetch notifications:', data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user?.id) fetchNotifications();
  }, [user, token]);

  // Remove a notification
  const handleRemoveNotification = async (id: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/read/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );

      if (response.ok) {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        {/* Bell Icon */}
        <button
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setNotifying(false);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying ? 'inline' : 'hidden'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.2 14.93L15.64 14.06C15.52 13.89 15.47 13.72 15.47 13.53V7.68C15.47 6.02 14.77 4.47 13.47 3.32C12.43 2.39 11.08 1.8 9.65 1.69V1.12C9.65 0.79 9.37 0.48 9 0.48C8.66 0.48 8.35 0.76 8.35 1.12V1.66C4.92 2.05 2.47 4.67 2.47 7.79V13.53C2.45 13.81 2.39 13.95 2.33 14.03L1.8 14.93C1.63 15.22 1.63 15.55 1.8 15.83C1.97 16.09 2.25 16.26 2.56 16.26H8.38V16.87C8.38 17.21 8.66 17.52 9.03 17.52C9.37 17.52 9.67 17.24 9.67 16.87V16.26H15.47C15.78 16.26 16.06 16.09 16.23 15.83C16.4 15.55 16.4 15.22 16.2 14.93Z" />
          </svg>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute -right-27 mt-2.5 flex flex-col h-90 w-75 rounded-md border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 overflow-y-auto z-50">
            <div className="px-4 py-3 border-b border-stroke dark:border-strokedark flex justify-between items-center">
              <h5 className="text-sm font-medium text-bodydark2">
                Notifications
              </h5>
              {/* {notifications.length > 0 && (
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Clear All
                </button>
              )} */}
            </div>

            {notifications.length > 0 ? (
              <ul className="flex flex-col">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="flex flex-col border-b border-stroke px-4 py-3 dark:border-strokedark"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-black dark:text-white">
                          {notif.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notif.createdDate}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveNotification(notif.id)}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-sm text-gray-500 mt-10">
                No notifications available.
              </div>
            )}
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
