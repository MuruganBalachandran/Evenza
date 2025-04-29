import { useState } from 'react';
import { FaShieldAlt, FaKey, FaHistory, FaDownload, FaUserSlash, FaTrash } from 'react-icons/fa';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const activeSessions = [
    { device: 'Windows PC - Chrome', location: 'New York, USA', lastActive: 'Active now', current: true },
    { device: 'iPhone 13 - Safari', location: 'Boston, USA', lastActive: '2 hours ago' },
    { device: 'MacBook - Firefox', location: 'Toronto, CA', lastActive: '1 day ago' },
  ];

  return (
    <div className="security-settings">
      <section className="security-section">
        <h2><FaShieldAlt /> Two-Factor Authentication</h2>
        <div className="security-card">
          <div className="two-fa-toggle">
            <div className="toggle-header">
              <h3>2FA Status</h3>
              <p>{is2FAEnabled ? 'Enabled' : 'Disabled'}</p>
            </div>
            <button 
              className={`toggle-button ${is2FAEnabled ? 'enabled' : ''}`}
              onClick={() => {
                setIs2FAEnabled(!is2FAEnabled);
                setShowQRCode(!is2FAEnabled);
              }}
            >
              {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
          {showQRCode && (
            <div className="qr-section">
              <div className="qr-placeholder">
                {/* Replace with actual QR code component */}
                <div className="mock-qr"></div>
              </div>
              <p>Scan this QR code with your authenticator app</p>
            </div>
          )}
        </div>
      </section>

      <section className="security-section">
        <h2><FaHistory /> Active Sessions</h2>
        <div className="sessions-list">
          {activeSessions.map((session, index) => (
            <div key={index} className={`session-card ${session.current ? 'current' : ''}`}>
              <div className="session-info">
                <h3>{session.device}</h3>
                <p>{session.location} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <button className="end-session-button">End Session</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="security-section">
        <h2><FaKey /> Login Security</h2>
        <div className="security-card">
          <div className="security-option">
            <div className="option-info">
              <h3>Remember Me</h3>
              <p>Stay logged in for 30 days</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </section>

      <section className="security-section">
        <h2><FaDownload /> Data & Privacy</h2>
        <div className="data-controls">
          <button className="data-button">
            <FaDownload /> Download My Data
          </button>
          <p className="data-info">Get a copy of your Evenza data in a JSON format</p>
        </div>
      </section>

      <section className="security-section danger-zone">
        <h2>⚠️ Account Actions</h2>
        <div className="danger-actions">
          <div className="danger-action">
            <div className="action-info">
              <h3>Deactivate Account</h3>
              <p>Temporarily disable your account</p>
            </div>
            <button className="danger-button deactivate">
              <FaUserSlash /> Deactivate
            </button>
          </div>
          <div className="danger-action">
            <div className="action-info">
              <h3>Delete Account</h3>
              <p>Permanently delete your account and all data</p>
            </div>
            <button className="danger-button delete">
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecuritySettings;
