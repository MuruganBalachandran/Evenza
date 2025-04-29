import { FaCalendar, FaHistory, FaStar } from 'react-icons/fa';

interface ActivitySummaryProps {
  stats: {
    eventsCreated: number;
    eventsAttended: number;
    savedEvents: number;
  };
}

const ActivitySummary = ({ stats }: ActivitySummaryProps) => {
  return (
    <div className="activity-summary">
      <div className="stat-card">
        <FaCalendar className="stat-icon" />
        <div className="stat-info">
          <h3>Events Created</h3>
          <p>{stats.eventsCreated}</p>
        </div>
      </div>
      <div className="stat-card">
        <FaHistory className="stat-icon" />
        <div className="stat-info">
          <h3>Events Attended</h3>
          <p>{stats.eventsAttended}</p>
        </div>
      </div>
      <div className="stat-card">
        <FaStar className="stat-icon" />
        <div className="stat-info">
          <h3>Saved Events</h3>
          <p>{stats.savedEvents}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;