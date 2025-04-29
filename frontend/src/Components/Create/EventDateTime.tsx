import { useState, useEffect } from 'react';
import { FaClock, FaGlobeAmericas } from 'react-icons/fa';

interface EventDateTimeProps {
  data: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: Record<string, string>;
}

const EventDateTime = ({ data, onUpdate, onNext, onBack }: EventDateTimeProps) => {
  const [suggestedSlots, setSuggestedSlots] = useState<Array<{ date: string; time: string }>>([]);
  const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Simulated AI-powered time slot suggestions
  useEffect(() => {
    // This would be replaced with actual AI suggestions based on historical data
    const mockSuggestions = [
      { date: '2025-04-15', time: '09:00' },
      { date: '2025-04-16', time: '14:00' },
      { date: '2025-04-17', time: '10:00' }
    ];
    setSuggestedSlots(mockSuggestions);
  }, []);

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const validateDates = () => {
    if (!data.startDate || !data.endDate) return true;
    return new Date(data.startDate) <= new Date(data.endDate);
  };

  const handleTimeChange = (type: 'startTime' | 'endTime', value: string) => {
    onUpdate({ [type]: value });
  };

  return (
    <div className="form-section">
      <h3 className="section-title">Date & Time</h3>

      <div className="date-time-grid">
        <div className="form-group">
          <label className="form-label">
            Start Date
            <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={data.startDate}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FaClock className="input-icon" />
            Start Time
          </label>
          <input
            type="time"
            className="form-input"
            value={data.startTime}
            onChange={(e) => handleTimeChange('startTime', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            End Date
            <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={data.endDate}
            onChange={(e) => onUpdate({ endDate: e.target.value })}
            min={data.startDate}
            required
          />
          {!validateDates() && (
            <span className="error-message">End date must be after start date</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            <FaClock className="input-icon" />
            End Time
          </label>
          <input
            type="time"
            className="form-input"
            value={data.endTime}
            onChange={(e) => handleTimeChange('endTime', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaGlobeAmericas className="input-icon" />
          Timezone
        </label>
        <select
          className="form-input"
          value={data.timezone || userTimezone}
          onChange={(e) => onUpdate({ timezone: e.target.value })}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace('_', ' ')}
            </option>
          ))}
        </select>
        {data.timezone !== userTimezone && (
          <p className="timezone-note">
            Your local timezone is {userTimezone}
          </p>
        )}
      </div>

      {suggestedSlots.length > 0 && (
        <div className="suggested-slots">
          <h4>Recommended Time Slots</h4>
          <div className="slots-grid">
            {suggestedSlots.map((slot, index) => (
              <button
                key={index}
                className="slot-suggestion"
                onClick={() => {
                  onUpdate({
                    startDate: slot.date,
                    startTime: slot.time
                  });
                }}
              >
                {new Date(slot.date).toLocaleDateString()} at {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="button-group">
        <button className="btn-back" onClick={onBack}>
          Back to Basic Info
        </button>
        <button 
          className="btn-next" 
          onClick={onNext}
          disabled={!validateDates() || !data.startDate || !data.endDate}
        >
          Continue to Location
        </button>
      </div>
    </div>
  );
};

export default EventDateTime;