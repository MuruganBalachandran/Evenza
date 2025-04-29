import { AnimatePresence, motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import NotificationItem from './NotificationItem';
import './NotificationList.css';

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

interface NotificationListProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationList = ({ notifications, onRead, onClearAll }: NotificationListProps) => {
  return (
    <div className="notifications-content">
      {notifications.length > 0 ? (
        <>
          <motion.div 
            className="notifications-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="btn-clear" onClick={onClearAll}>
              Clear All
            </button>
          </motion.div>
          <div className="notifications-list">
            <AnimatePresence>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onRead={onRead}
                />
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <motion.div 
          className="no-notifications"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaBell className="icon" />
          <h3>No notifications</h3>
          <p>You're all caught up!</p>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationList;
