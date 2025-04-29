import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaEdit,
  FaTrash,
  FaCopy,
  FaShare,
  FaDownload,
  FaArrowLeft
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './EventDetails.css';

interface Attendee {
  id: string;
  name: string;
  email: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  ticketType?: string;
}

interface Event {
  _id?: string;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  venue_type: string;
  venue_details: {
    venue?: string;
    address?: string;
    meetingLink?: string;
  };
  banner_url?: string;
  category: string;
  attendee_limit: number;
  attendees?: {
    confirmed: number;
    total: number;
    list: Attendee[];
  };
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  user_id: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 404) {
          throw new Error('Event not found');
        }

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch event details');
          } else {
            throw new Error('Failed to fetch event details');
          }
        }

        const data = await response.json();
        
        // Transform the data to match our interface
        const transformedData: Event = {
          ...data,
          start_time: new Date(data.start_time),
          end_time: new Date(data.end_time),
          venue_details: data.venue_details || {},
          status: data.status as 'draft' | 'active' | 'completed' | 'cancelled'
        };
        
        setEvent(transformedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error instanceof Error ? error.message : 'Failed to load event details. Please try again later.');
        toast.error(error instanceof Error ? error.message : 'Failed to load event details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/events/${id}/edit`);
  };

  const handleExport = async () => {
    if (!event) return;
    
    try {
      const exportData = {
        ...event,
        start_time: event.start_time.toISOString(),
        end_time: event.end_time.toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `event-${id}-export.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Event data exported successfully');
    } catch (error) {
      console.error('Error exporting event:', error);
      toast.error('Failed to export event data');
    }
  };

  const handleDelete = async () => {
    if (!event || !window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete event');
      
      toast.success('Event deleted successfully');
      navigate('/my-events');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const handleDuplicate = async () => {
    if (!event) return;

    try {
      const duplicateEvent = {
        ...event,
        title: `${event.title} (Copy)`,
        status: 'draft'
      };
      delete duplicateEvent._id; // Remove MongoDB ID for the new event

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(duplicateEvent)
      });

      if (!response.ok) throw new Error('Failed to duplicate event');

      const newEvent = await response.json();
      toast.success('Event duplicated successfully');
      navigate(`/events/${newEvent._id}`);
    } catch (error) {
      console.error('Error duplicating event:', error);
      toast.error('Failed to duplicate event');
    }
  };

  if (isLoading) {
    return <div className="loading-state">Loading event details...</div>;
  }

  if (error || !event) {
    return (
      <div className="error-state">
        <p>{error || 'Event not found'}</p>
        <button onClick={() => navigate('/my-events')}>Back to Events</button>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="event-details-page">
      <div className="event-details-header">
        <div className="header-top">
          <button className="btn-back" onClick={() => navigate('/my-events')}>
            <FaArrowLeft /> Back to Events
          </button>
        </div>
        <div className="header-content">
          <h1>{event.title}</h1>
          <div className="event-status" data-status={event.status}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleEdit}>
            <FaEdit /> Edit Event
          </button>
          <button className="btn-secondary" onClick={handleDuplicate}>
            <FaCopy /> Duplicate
          </button>
          <button className="btn-secondary" onClick={handleExport}>
            <FaDownload /> Export
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className="event-details-content">
        <div className="event-details-main">
          <div className="event-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'attendees' ? 'active' : ''}`}
              onClick={() => setActiveTab('attendees')}
            >
              Attendees
            </button>
            <button 
              className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="event-overview">
              <div className="info-section">
                <h3>Event Details</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <FaCalendarAlt className="icon" />
                    <div className="info-content">
                      <label>Date</label>
                      <span>{formatDate(event.start_time)}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaClock className="icon" />
                    <div className="info-content">
                      <label>Time</label>
                      <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt className="icon" />
                    <div className="info-content">
                      <label>Location</label>
                      <span>{event.venue_details.venue || 'Online Event'}</span>
                      <span className="secondary">{event.venue_details.address || event.venue_details.meetingLink}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaUsers className="icon" />
                    <div className="info-content">
                      <label>Capacity</label>
                      <span>{event.attendees?.confirmed || 0}/{event.attendee_limit} Attendees</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h3>Description</h3>
                <p>{event.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="attendees-section">
              <div className="attendees-header">
                <h3>Attendees List</h3>
                <button className="btn-secondary">
                  <FaDownload /> Export List
                </button>
              </div>
              <div className="attendees-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.attendees?.list.map((attendee) => (
                      <tr key={attendee.id}>
                        <td>{attendee.name}</td>
                        <td>{attendee.email}</td>
                        <td>
                          <span className={`status-badge ${attendee.status}`}>
                            {attendee.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-icon">
                            <FaShare />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <div className="analytics-cards">
                <div className="analytics-card">
                  <h4>Registration Rate</h4>
                  <p className="analytics-value">
                    {event.attendee_limit > 0 
                      ? Math.round(((event.attendees?.confirmed || 0) / event.attendee_limit) * 100)
                      : 0}%
                  </p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${event.attendee_limit > 0 
                          ? ((event.attendees?.confirmed || 0) / event.attendee_limit) * 100 
                          : 0}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;