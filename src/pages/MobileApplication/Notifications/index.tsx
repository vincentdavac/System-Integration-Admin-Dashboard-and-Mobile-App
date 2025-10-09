import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../context/AppContext'; // ✅ make sure this path is correct

// ✅ Define the notification type
interface Notification {
  id: number;
  title: string;
  message: string;
  category: string;
  status: string;
  createdDate: string;
  createdTime: string;
}

const Notifications = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext)!; // ✅ get user & token from context

  // ✅ Type the state as Notification[]
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications/user/${user?.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await response.json();
        console.log('📩 Notifications fetched:', data);

        if (response.ok && data.data) {
          setNotifications(data.data.notifications || []);
          setTotalNotifications(data.data.total_unread_notifications || 0);
        } else {
          console.error('Failed to fetch notifications:', data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchNotifications();
  }, [user, token]);

  // 🗑️ Mark notification as read and remove it locally
  const removeNotification = async (id: number) => {
    try {
      const res = await fetch(`/api/notifications/read/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`, // include token if needed
        },
      });

      const data = await res.json();
      console.log('Notification read response:', data);

      if (res.ok) {
        // Remove notification locally after success
        setNotifications((prev) => prev.filter((n) => n.id !== id));

        setTotalNotifications((prevCount) => Math.max(prevCount - 1, 0));

        useEffect(() => {
          setTotalNotifications(notifications.length);
        }, [notifications]);
      } else {
        console.error('Failed to mark as read:', data.message);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* ✅ Green Header Section */}
      <div className="w-full h-[150px] relative">
        <img
          src="/ucc_background/ucc_green_background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/60"></div>

        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <button onClick={() => navigate('/mobile/home')} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">NOTIFICATIONS</h1>
        </div>

        {/* Total count */}
        <div className="absolute bottom-3 left-4 text-white text-sm">
          Total Notifications:{' '}
          <span className="font-semibold">{totalNotifications}</span>
        </div>
      </div>

      {/* ✅ Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 mt-4 pb-20 max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-gray-100 rounded-xl p-4 mb-3 shadow-sm relative flex flex-col"
            >
              {/* ❌ Remove button */}
              <button
                onClick={() => removeNotification(notif.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <h2 className="text-green-700 font-semibold text-base mb-1">
                {notif.title}
              </h2>

              {/* Message */}
              <p className="text-sm text-gray-700 mb-2">{notif.message}</p>

              {/* Date & Time */}
              <div className="text-xs text-gray-500">
                {notif.createdDate} • {notif.createdTime}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
