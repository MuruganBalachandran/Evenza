import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarPlus, 
  FaFilter, 
  FaChartLine, 
  FaList} from 'react-icons/fa';
import EventCard from '../../Components/MyEvents/EventCard';
import EventMenu from '../../Components/MyEvents/EventMenu';
import './MyEvents.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';

type EventStatus = 'draft' | 'active' | 'completed' | 'cancelled';

interface Event {
  currentTarget: HTMLElement;
  id: string;
  title: string;
  description: string;
  category: string;
  banner_url?: string;
  start_time: Date;
  end_time: Date;
  venue_type: string;
  venue_details: {
    venue?: string;
    address?: string;
    meetingLink?: string;
  };
  attendee_limit: number;
  status: EventStatus;
  attendees: {
    confirmed: number;
    total: number;
  };
}

const MyEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [menuState, setMenuState] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    eventId: ''
  });
  const [, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        try {
          const response = await fetch(buildApiUrl(`events/user/${user._id}`), {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch events');
          }

          const data = await response.json();
          
          // Transform the data to match our interface
          const transformedData = data.map((event: any) => ({
            id: event._id,
            title: event.title,
            description: event.description,
            category: event.category,
            banner_url: event.banner_url,
            start_time: new Date(event.start_time),
            end_time: new Date(event.end_time),
            venue_type: event.venue_type,
            venue_details: event.venue_details,
            attendee_limit: event.attendee_limit,
            status: event.status,
            attendees: {
              confirmed: event.attendees?.confirmed || 0,
              total: event.attendee_limit
            }
          }));
          
          setEvents(transformedData);
          setError(null);
        } catch (error) {
          console.error('Error fetching events:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch events');
          toast.error('Failed to load events');
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user?._id) {
      fetchEvents();
    }
  }, [user?._id]);

  const handleEventAction = useCallback(async (action: string, eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    try {
      switch (action) {
        case 'duplicate':
          const duplicatedEvent = {
            ...event,
            title: `${event.title} (Copy)`,
            status: 'draft'
          };
          const duplicateResponse = await fetch(buildApiUrl('events'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(duplicatedEvent)
          });
          if (!duplicateResponse.ok) throw new Error('Failed to duplicate event');
          const newEvent = await duplicateResponse.json();
          setEvents(prev => [...prev, newEvent]);
          toast.success('Event duplicated successfully');
          break;

        case 'delete':
          if (window.confirm('Are you sure you want to delete this event?')) {
            const deleteResponse = await fetch(buildApiUrl(`events/${eventId}`), {
              method: 'DELETE'
            });
            if (!deleteResponse.ok) throw new Error('Failed to delete event');
            setEvents(prev => prev.filter(e => e.id !== eventId));
            toast.success('Event deleted successfully');
          }
          break;

        case 'export':
          const exportResponse = await fetch(buildApiUrl(`events/${eventId}/export`));
          if (!exportResponse.ok) throw new Error('Failed to export event');
          const blob = await exportResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `event-${eventId}-export.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success('Event data exported');
          break;

        case 'calendar':
          const eventDate = event.start_time;
          const eventEndDate = event.end_time;
          const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d\d\d/g, '')}\/${eventEndDate.toISOString().replace(/[-:]/g, '').replace(/\.\d\d\d/g, '')}&details=${encodeURIComponent(event.description || '')}`;
          window.open(calendarUrl, '_blank');
          toast.success('Event added to calendar');
          break;

        case 'share':
          const shareUrl = `${window.location.origin}/events/${eventId}`;
          navigator.clipboard.writeText(shareUrl);
          toast.success('Event link copied to clipboard');
          break;

        case 'menu':
          const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
          setMenuState({
            isOpen: true,
            position: { x: rect.right, y: rect.top },
            eventId
          });
          break;
      }
    } catch (error) {
      console.error('Error performing event action:', error);
      toast.error('Operation failed. Please try again.');
    }
  }, [events]);

  const closeMenu = () => {
    setMenuState(prev => ({ ...prev, isOpen: false }));
  };

  const tabs = [
    { id: 'all', label: 'All Events' },
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Drafts' },
    { id: 'completed', label: 'Completed' }
  ];

  const categories = [
    'all',
    'conference',
    'workshop',
    'networking',
    'webinar',
    'social'
  ];

  const filteredEvents = events.filter(event => {
    if (activeTab !== 'all' && event.status !== activeTab) return false;
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;
    return true;
  });

  // Analytics calculations
  const analytics = {
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'active').length,
    totalAttendees: events.reduce((sum, event) => sum + event.attendees.confirmed, 0),
    averageAttendance: Math.round(
      (events.reduce((sum, event) => sum + (event.attendees.confirmed / event.attendees.total) * 100, 0) / events.length) || 0
    )
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button 
          onClick={() => {
            setRetryCount(0); // Reset retry count and trigger a new fetch
            setError(null);
          }}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="my-events-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="events-header">
        <div className="header-content">
          <div className="header-title">
            <h1>My Events</h1>
            <p>Your Command Center for Every Experience</p>
          </div>
          <button className="create-event-btn" onClick={() => navigate('/create')}>
            <FaCalendarPlus /> Create New Event
          </button>
        </div>

        <div className="analytics-dashboard">
          <div className="analytics-card">
            <h3>Total Events</h3>
            <p>{analytics.totalEvents}</p>
          </div>
          <div className="analytics-card">
            <h3>Active Events</h3>
            <p>{analytics.activeEvents}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Attendees</h3>
            <p>{analytics.totalAttendees}</p>
          </div>
          <div className="analytics-card">
            <h3>Avg. Attendance Rate</h3>
            <p>{analytics.averageAttendance}%</p>
          </div>
        </div>
      </div>

      <div className="events-controls">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="controls-right">
          <button 
            className="filter-btn"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FaFilter /> Filter
          </button>
          <div className="view-toggles">
            <button 
              className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FaChartLine />
            </button>
            <button 
              className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="filter-panel">
          <h3>Categories</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        <motion.div 
          className={`events-grid ${viewMode}`}
          layout
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                style={{ '--card-index': index } as any}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard
                  event={{
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    date: event.start_time.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }),
                    time: event.start_time.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }),
                    category: event.category,
                    attendees: event.attendees,
                    status: event.status,
                    banner: event.banner_url
                  }}
                  onAction={handleEventAction}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="no-events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaCalendarPlus />
              <h3>No events found</h3>
              <p>Create your first event or try different filters</p>
              <button className="btn-create" onClick={() => navigate('/create')}>
                Create Event
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <EventMenu
        eventId={menuState.eventId}
        isOpen={menuState.isOpen}
        onClose={closeMenu}
        position={menuState.position}
        onAction={handleEventAction}
      />
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </motion.div>
  );
};

export default MyEvents;