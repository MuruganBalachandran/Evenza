import React from 'react';
import { FaLock, FaUsers, FaUserClock, FaKey } from 'react-icons/fa';

interface EventPrivacyProps {
  data: {
    type: string;
    maxAttendees: number;
    accessType: string;
    password: string;
    enableWaitlist: boolean;
  };
  onUpdate: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  errors?: Record<string, string>;
}

const EventPrivacy: React.FC<EventPrivacyProps> = ({ data, onUpdate, onBack, onSubmit }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">Privacy & Access</h3>

      <div className="form-group">
        <label className="form-label">
          <FaLock className="input-icon" />
          Access Type
        </label>
        <select
          className="form-input"
          value={data.accessType}
          onChange={(e) => onUpdate({ accessType: e.target.value })}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="invite">Invite Only</option>
          <option value="password">Password Protected</option>
        </select>
      </div>

      {data.accessType === 'password' && (
        <div className="form-group">
          <label className="form-label">
            <FaKey className="input-icon" />
            Event Password
          </label>
          <input
            type="password"
            className="form-input"
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            placeholder="Set event access password"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">
          <FaUsers className="input-icon" />
          Maximum Attendees
        </label>
        <input
          type="number"
          className="form-input"
          value={data.maxAttendees}
          onChange={(e) => onUpdate({ maxAttendees: parseInt(e.target.value) })}
          min="1"
          placeholder="Enter maximum number of attendees"
        />
      </div>

      <div className="form-group">
        <label className="form-label checkbox-label">
          <input
            type="checkbox"
            checked={data.enableWaitlist}
            onChange={(e) => onUpdate({ enableWaitlist: e.target.checked })}
          />
          <FaUserClock className="input-icon" />
          Enable Waitlist
        </label>
        {data.enableWaitlist && (
          <p className="helper-text">
            A waitlist will be created automatically when maximum capacity is reached
          </p>
        )}
      </div>

      <div className="button-group">
        <button className="btn-back" onClick={onBack}>
          Back to Branding
        </button>
        <button 
          className="btn-next" 
          onClick={onSubmit}
          disabled={data.accessType === 'password' && !data.password}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default EventPrivacy;