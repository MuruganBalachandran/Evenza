import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NotificationList from '../../Components/Notifications/NotificationList';
import { toast } from 'react-toastify';
import './Notifications.css';
import { buildApiUrl } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
interface Notification {
  _id: string;
  type: 'Events' | 'RSVPs' | 'Reminders' | 'Unread';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  eventId?: string;
  eventTitle?: string;
  actionRequired?: boolean;
}

const Notifications = () => {
  const { user: authUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${buildApiUrl}/users/${authUser._id}/notifications`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
      setError('');
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications. Please try again later.');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`${buildApiUrl}/users/${authUser._id}/notifications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update notification');
      }

      setNotifications(prev =>
        prev.map(notif =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
      toast.success('Notification marked as read');
    } catch (err) {
      console.error('Error marking notification as read:', err);
      toast.error('Failed to update notification');
    }
  };

  const clearAll = async () => {
    try {
      const response = await fetch(`${buildApiUrl}/users/${authUser._id}/notifications`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to clear notifications');
      }

      setNotifications([]);
      toast.success('All notifications cleared');
    } catch (err) {
      console.error('Error clearing notifications:', err);
      toast.error('Failed to clear notifications');
    }
  };

  const filterNotifications = (notifications: Notification[]) => {
    switch(filter) {
      case 'all':
        return notifications;
      case 'Unread':
        return notifications.filter(n => !n.isRead);
      case 'Events':
      case 'RSVPs':
      case 'Reminders':
        return notifications.filter(n => n.type === filter);
      default:
        return notifications;
    }
  };

  return (
    <motion.div
      className="notifications-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.header 
        className="notifications-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="header-content">
          <div className="header-title">
            <h1>Notifications</h1>
            <p>Stay updated with your events</p>
          </div>
        </div>

        <div className="notification-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'Unread' ? 'active' : ''}`}
            onClick={() => setFilter('Unread')}
          >
            Unread
          </button>
          <button 
            className={`filter-btn ${filter === 'Events' ? 'active' : ''}`}
            onClick={() => setFilter('Events')}
          >
            Events
          </button>
          <button 
            className={`filter-btn ${filter === 'RSVPs' ? 'active' : ''}`}
            onClick={() => setFilter('RSVPs')}
          >
            RSVPs
          </button>
          <button 
            className={`filter-btn ${filter === 'Reminders' ? 'active' : ''}`}
            onClick={() => setFilter('Reminders')}
          >
            Reminders
          </button>
        </div>
      </motion.header>

      <div className="notifications-container">
        {loading ? (
          <div className="loading-state">Loading notifications...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <NotificationList
            notifications={filterNotifications(notifications)}
            onRead={markAsRead}
            onClearAll={clearAll}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;