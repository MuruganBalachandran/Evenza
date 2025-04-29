import { useState } from 'react';
import { FaGoogle, FaMicrosoft, FaApple, FaSync, FaClock, FaGlobe } from 'react-icons/fa';
import './CalendarSettings.css';

const CalendarSettings = () => {
  const [settings, setSettings] = useState({
    defaultDuration: 60,
    timeZone: 'UTC',
    autoSync: true,
    reminderDefault: 30,
    calendarConnections: {
      google: false,
      outlook: false,
      apple: false
    }
  });

  const timeZones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  ];

  return (
    <div className="calendar-settings">
      <section className="calendar-section">
        <h2>📅 Calendar Connections</h2>
        <div className="calendar-integrations">
          <div className="integration-card">
            <div className="integration-header">
              <FaGoogle className="integration-icon google" />
              <span>Google Calendar</span>
            </div>
            <button className={`connect-button ${settings.calendarConnections.google ? 'connected' : ''}`}>
              {settings.calendarConnections.google ? 'Connected' : 'Connect'}
            </button>
          </div>

          <div className="integration-card">
            <div className="integration-header">
              <FaMicrosoft className="integration-icon microsoft" />
              <span>Microsoft Outlook</span>
            </div>
            <button className={`connect-button ${settings.calendarConnections.outlook ? 'connected' : ''}`}>
              {settings.calendarConnections.outlook ? 'Connected' : 'Connect'}
            </button>
          </div>

          <div className="integration-card">
            <div className="integration-header">
              <FaApple className="integration-icon apple" />
              <span>Apple Calendar</span>
            </div>
            <button className={`connect-button ${settings.calendarConnections.apple ? 'connected' : ''}`}>
              {settings.calendarConnections.apple ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      </section>

      <section className="calendar-section">
        <h2>⚙️ Sync Settings</h2>
        <div className="sync-settings">
          <div className="setting-item">
            <div className="setting-info">
              <FaSync className="setting-icon" />
              <div>
                <h3>Auto-Sync Events</h3>
                <p>Automatically sync events with connected calendars</p>
              </div>
            </div>
            <label className="switch">
              <input 
                type="checkbox"
                checked={settings.autoSync}
                onChange={(e) => setSettings({ ...settings, autoSync: e.target.checked })}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </section>

      <section className="calendar-section">
        <h2>⏰ Time Preferences</h2>
        <div className="time-settings">
          <div className="form-group">
            <label>
              <FaClock className="setting-icon" />
              Default Event Duration
            </label>
            <select 
              value={settings.defaultDuration}
              onChange={(e) => setSettings({ ...settings, defaultDuration: Number(e.target.value) })}
              className="settings-select"
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaGlobe className="setting-icon" />
              Time Zone
            </label>
            <select 
              value={settings.timeZone}
              onChange={(e) => setSettings({ ...settings, timeZone: e.target.value })}
              className="settings-select"
            >
              {timeZones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaClock className="setting-icon" />
              Default Reminder Time
            </label>
            <select 
              value={settings.reminderDefault}
              onChange={(e) => setSettings({ ...settings, reminderDefault: Number(e.target.value) })}
              className="settings-select"
            >
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarSettings;
