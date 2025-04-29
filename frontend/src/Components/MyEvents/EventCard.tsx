import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaUsers, FaClock, FaEllipsisV } from 'react-icons/fa';
import './EventCard.css';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    attendees: {
      confirmed: number;
      total: number;
    };
    status: 'draft' | 'active' | 'completed' | 'cancelled';
    banner?: string;
    category: string;
  };
  onAction: (action: string, eventId: string, event?: React.MouseEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onAction }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    const colors = {
      draft: '#64748b',
      active: '#22c55e',
      completed: '#3b82f6',
      cancelled: '#ef4444'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <div className="event-card">
      <div className="event-card-banner">
        {event.banner ? (
          <img src={event.banner} alt={event.title} />
        ) : (
          <div className="event-card-banner-placeholder">
            <FaCalendar />
          </div>
        )}
        <div className="event-status" style={{ backgroundColor: getStatusColor(event.status) }}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </div>
      </div>

      <div className="event-card-content">
        <h3 className="event-title">{truncateText(event.title, 60)}</h3>
        <p className="event-description">{truncateText(event.description, 120)}</p>
        
        <div className="event-meta">
          <div className="meta-item">
            <FaCalendar className="meta-icon" />
            <span>{event.date}</span>
          </div>
          <div className="meta-item">
            <FaClock className="meta-icon" />
            <span>{event.time}</span>
          </div>
        </div>

        <div className="event-stats">
          <div className="stat-item">
            <FaUsers className="stat-icon" />
            <div className="stat-details">
              <span className="stat-value">{event.attendees.confirmed}/{event.attendees.total}</span>
              <span className="stat-label">Attendees</span>
            </div>
          </div>
          {event.status === 'active' && (
            <div className="event-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(event.attendees.confirmed / event.attendees.total) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {Math.round((event.attendees.confirmed / event.attendees.total) * 100)}% Full
              </span>
            </div>
          )}
        </div>

        <div className="event-actions">
          <button className="btn-view" onClick={handleViewDetails}>
            View Details
          </button>
          <button 
            className="btn-menu"
            onClick={(e) => {
              e.preventDefault();
              onAction('menu', event.id, e);
            }}
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;