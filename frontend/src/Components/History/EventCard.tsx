import { FC } from 'react';
import { FaUsers, FaClock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './EventCard.css';

interface HistoryEvent {
  _id: string;
  user_id: string;
  event_id: string;
  title: string;
  date: string;
  hoster: string;
  numAttendees: number;
  status: 'completed' | 'cancelled';
  endedAt?: string;
}

interface EventCardProps {
  event: HistoryEvent;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div 
      className={`history-event-card ${event.status}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="event-header">
        <h3 className="event-title">{event.title}</h3>
        <span className={`event-status ${event.status}`}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
      </div>

      <div className="event-details">
        <div className="detail-item">
          <FaClock className="icon" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="detail-item">
          <FaUser className="icon" />
          <span>{event.hoster}</span>
        </div>
        <div className="detail-item">
          <FaUsers className="icon" />
          <span>{event.numAttendees} Attendees</span>
        </div>
      </div>

      {event.endedAt && (
        <div className="event-footer">
          <span>Ended: {formatDate(event.endedAt)}</span>
        </div>
      )}
    </motion.div>
  );
};

export default EventCard;
