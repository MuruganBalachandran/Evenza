import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../../Components/History/EventCard';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';
import './History.css';

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

const History = () => {
  const { user: authUser } = useAuth();
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoryEvents = async () => {
      if (!authUser?._id) {
        setError('Please log in to view your history');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(buildApiUrl(`users/${authUser._id}/history`));
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching history:', error);
        setError('Failed to load event history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryEvents();
  }, [authUser?._id]);

  if (!authUser) {
    return (
      <div className="error-state">
        <p>Please log in to view your history</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">Loading history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="history-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="history-header"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Event History</h1>
        <p>View your past events and their details</p>
      </motion.div>

      <motion.div 
        className="history-list"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {events.length === 0 ? (
          <div className="no-history">
            <p>No event history found.</p>
          </div>
        ) : (
          events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default History;