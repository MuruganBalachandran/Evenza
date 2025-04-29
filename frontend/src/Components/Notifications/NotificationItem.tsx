import { FaBell, FaCalendarAlt, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './NotificationItem.css';

interface NotificationItemProps {
  notification: {
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
  };
  onRead: (id: string) => void;
}

const NotificationItem = ({ notification, onRead }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'Events':
        return <FaCalendarAlt />;
      case 'RSVPs':
        return <FaCheckCircle />;
      case 'Reminders':
        return <FaBell />;
      case 'Unread':
        return <FaExclamationCircle />;
      default:
        return <FaBell />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div 
      className={`notification-item priority-${notification.priority} ${notification.isRead ? 'read' : 'unread'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onRead(notification._id)}
    >
      <div className="notification-icon">
        {getIcon()}
      </div>
      
      <div className="notification-content">
        <h3>{notification.title}</h3>
        <p>{notification.message}</p>
        {notification.eventTitle && (
          <a href={`/events/${notification.eventId}`} className="event-link">
            View: {notification.eventTitle}
          </a>
        )}
        <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
      </div>

      {notification.actionRequired && (
        <div className="notification-action">
          <button className="btn-action">Take Action</button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationItem;
