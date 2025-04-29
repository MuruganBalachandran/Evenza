import { useState } from 'react';
import { IoMail, IoNotifications, IoCheckbox } from 'react-icons/io5';
import { FaUserFriends, FaBell, FaEnvelope } from 'react-icons/fa';
import './CommunicationSettings.css';

const CommunicationSettings = () => {
  const [settings, setSettings] = useState({
    emailFrequency: 'daily',
    allowDMs: true,
    rsvpEmails: true,
    eventDigest: true,
    organizerMessages: true,
    eventReminders: true,
    marketingEmails: false,
    inAppNotifications: true
  });

  return (
    <div className="communication-settings">
      <section className="comm-section">
        <h2><IoMail /> Email Preferences</h2>
        <div className="preferences-grid">
          <div className="preference-card">
            <div className="preference-header">
              <FaEnvelope className="preference-icon" />
              <h3>Email Frequency</h3>
            </div>
            <select 
              className="settings-select"
              value={settings.emailFrequency}
              onChange={(e) => setSettings({ ...settings, emailFrequency: e.target.value })}
            >
              <option value="realtime">Real-time</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Summary</option>
              <option value="none">Don't send</option>
            </select>
          </div>

          <div className="preference-card">
            <div className="preference-header">
              <FaUserFriends className="preference-icon" />
              <div>
                <h3>Organizer Messages</h3>
                <p>Receive messages from event organizers</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.organizerMessages}
                onChange={(e) => setSettings({ ...settings, organizerMessages: e.target.checked })}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <section className="comm-section">
        <h2><IoNotifications /> Notification Types</h2>
        <div className="notification-list">
          {[
            { id: 'rsvpEmails', label: 'RSVP Confirmations', icon: IoCheckbox },
            { id: 'eventDigest', label: 'Event Digests', icon: FaBell },
            { id: 'eventReminders', label: 'Event Reminders', icon: FaBell },
            { id: 'marketingEmails', label: 'Marketing Updates', icon: FaEnvelope },
          ].map(item => (
            <div key={item.id} className="notification-item">
              <div className="notification-info">
                <item.icon className="notification-icon" />
                <span>{item.label}</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={Boolean(settings[item.id as keyof typeof settings])}
                  onChange={(e) => setSettings({ ...settings, [item.id]: e.target.checked })}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="comm-section">
        <h2>💬 Direct Messages</h2>
        <div className="dm-settings">
          <div className="preference-card">
            <div className="preference-header">
              <h3>Allow Direct Messages</h3>
              <p>Let organizers and attendees message you directly</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.allowDMs}
                onChange={(e) => setSettings({ ...settings, allowDMs: e.target.checked })}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunicationSettings;
