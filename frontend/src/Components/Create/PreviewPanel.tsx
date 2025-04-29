import React from 'react';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaLock } from 'react-icons/fa';

interface PreviewPanelProps {
  eventData: {
    basicInfo: {
      title: string;
      description: string;
      tags: string[];
    };
    dateTime: {
      startDate: string;
      startTime: string;
      timezone: string;
    };
    location: {
      type: string;
      venue: string;
      address: string;
    };
    privacy: {
      type: string;
      maxAttendees: number;
      enableWaitlist: boolean;
    };
    branding: {
      banner: any;
      color: string;
    };
  };
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ eventData }) => {
  const { basicInfo, dateTime, location, privacy, branding } = eventData;

  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="preview-panel">
      <h3>Event Preview</h3>
      <div className="preview-content" style={{ borderColor: branding.color }}>
        <div className="preview-banner">
          {branding.banner ? (
            <img src={URL.createObjectURL(branding.banner)} alt="Event banner" />
          ) : (
            <div className="preview-banner-placeholder" />
          )}
        </div>

        <div className="preview-header">
          <h2>{basicInfo.title || 'Event Title'}</h2>
          {basicInfo.tags.length > 0 && (
            <div className="preview-tags">
              {basicInfo.tags.map((tag, index) => (
                <span key={index} className="tag" style={{ backgroundColor: `${branding.color}15`, color: branding.color }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="preview-details">
          {dateTime.startDate && (
            <div className="preview-item">
              <FaCalendar className="icon" />
              <span>{formatDate(dateTime.startDate)}</span>
            </div>
          )}
          
          {dateTime.startTime && (
            <div className="preview-item">
              <FaClock className="icon" />
              <span>{dateTime.startTime} {dateTime.timezone}</span>
            </div>
          )}

          {location.venue && (
            <div className="preview-item">
              <FaMapMarkerAlt className="icon" />
              <span>{location.venue}</span>
            </div>
          )}

          <div className="preview-item">
            <FaUsers className="icon" />
            <span>Capacity: {privacy.maxAttendees} attendees</span>
          </div>

          <div className="preview-item">
            <FaLock className="icon" />
            <span>Access: {privacy.type}</span>
          </div>
        </div>

        {basicInfo.description && (
          <div className="preview-description">
            <p>{basicInfo.description}</p>
          </div>
        )}

        {privacy.enableWaitlist && (
          <div className="preview-waitlist">
            Waitlist enabled
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;