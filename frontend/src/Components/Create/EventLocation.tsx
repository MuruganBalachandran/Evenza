import React, { useState } from 'react';
import { FaMapMarkerAlt, FaVideo } from 'react-icons/fa';

interface EventLocationProps {
  data: {
    type: 'physical' | 'online' | 'hybrid';
    venue: string;
    address: string;
    platform: string;
    meetingLink: string;
    coordinates: any;
  };
  onUpdate: (data: Partial<EventLocationProps['data']>) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: Record<string, string>;
}

const EventLocation: React.FC<EventLocationProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [] = useState(false);

  return (
    <div className="form-section">
      <h3 className="section-title">Event Location</h3>

      <div className="form-group">
        <label className="form-label">Location Type</label>
        <select
          className="form-input"
          value={data.type}
          onChange={(e) => onUpdate({ type: e.target.value as 'physical' | 'online' | 'hybrid' })}
        >
          <option value="physical">Physical Location</option>
          <option value="online">Virtual Event</option>
          <option value="hybrid">Hybrid Event</option>
        </select>
      </div>

      {(data.type === 'physical' || data.type === 'hybrid') && (
        <>
          <div className="form-group">
            <label className="form-label">
              <FaMapMarkerAlt className="input-icon" />
              Venue Name
            </label>
            <input
              type="text"
              className="form-input"
              value={data.venue}
              onChange={(e) => onUpdate({ venue: e.target.value })}
              placeholder="Enter venue name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-input"
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              placeholder="Enter full address"
            />
          </div>

          <div className="map-container">
            <div className="map-placeholder">
              Google Maps integration placeholder
            </div>
          </div>
        </>
      )}

      {(data.type === 'online' || data.type === 'hybrid') && (
        <>
          <div className="form-group">
            <label className="form-label">
              <FaVideo className="input-icon" />
              Virtual Platform
            </label>
            <select
              className="form-input"
              value={data.platform}
              onChange={(e) => onUpdate({ platform: e.target.value })}
            >
              <option value="">Select platform</option>
              <option value="zoom">Zoom</option>
              <option value="meet">Google Meet</option>
              <option value="teams">Microsoft Teams</option>
              <option value="custom">Custom Link</option>
            </select>
          </div>

          {data.platform && (
            <div className="form-group">
              <label className="form-label">Meeting Link</label>
              <input
                type="url"
                className="form-input"
                value={data.meetingLink}
                onChange={(e) => onUpdate({ meetingLink: e.target.value })}
                placeholder="Enter meeting URL"
              />
            </div>
          )}
        </>
      )}

      <div className="button-group">
        <button className="btn-back" onClick={onBack}>
          Back to Date & Time
        </button>
        <button 
          className="btn-next" 
          onClick={onNext}
          disabled={!data.type || (data.type === 'physical' && !data.venue)}
        >
          Continue to Branding
        </button>
      </div>
    </div>
  );
};

export default EventLocation;