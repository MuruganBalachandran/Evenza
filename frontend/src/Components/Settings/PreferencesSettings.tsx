import { useState } from 'react';
import { IoSunny, IoMoon } from 'react-icons/io5';
import { MdOutlineAutoMode } from 'react-icons/md';
import './PreferencesSettings.css';

const PreferencesSettings = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    accentColor: '#646cff',
    fontSize: 'medium',
    language: 'en',
    region: 'US',
    displayStyle: 'grid'
  });

  const handleThemeChange = (theme: string) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  return (
    <div className="preferences-settings">
      <section className="preferences-section">
        <h2>🎨 Theme & Appearance</h2>
        <div className="theme-options">
          <button 
            className={`theme-option ${preferences.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <IoSunny className="theme-icon" />
            <span>Light</span>
          </button>
          <button 
            className={`theme-option ${preferences.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <IoMoon className="theme-icon" />
            <span>Dark</span>
          </button>
          <button 
            className={`theme-option ${preferences.theme === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <MdOutlineAutoMode className="theme-icon" />
            <span>System</span>
          </button>
        </div>

        <div className="form-group">
          <label>Accent Color</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={preferences.accentColor}
              onChange={(e) => setPreferences(prev => ({ ...prev, accentColor: e.target.value }))}
              className="color-picker"
            />
            <span className="color-value">{preferences.accentColor}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Font Size</label>
          <select 
            value={preferences.fontSize}
            onChange={(e) => setPreferences(prev => ({ ...prev, fontSize: e.target.value }))}
            className="settings-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </section>

      <section className="preferences-section">
        <h2>🌍 Region & Language</h2>
        <div className="form-group">
          <label>Language</label>
          <select 
            value={preferences.language}
            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
            className="settings-select"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div className="form-group">
          <label>Region</label>
          <select 
            value={preferences.region}
            onChange={(e) => setPreferences(prev => ({ ...prev, region: e.target.value }))}
            className="settings-select"
          >
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="EU">European Union</option>
            <option value="CA">Canada</option>
          </select>
        </div>
      </section>

      <section className="preferences-section">
        <h2>📱 Display Settings</h2>
        <div className="display-options">
          <button 
            className={`display-option ${preferences.displayStyle === 'grid' ? 'active' : ''}`}
            onClick={() => setPreferences(prev => ({ ...prev, displayStyle: 'grid' }))}
          >
            <div className="display-preview grid-preview" />
            <span>Grid View</span>
          </button>
          <button 
            className={`display-option ${preferences.displayStyle === 'list' ? 'active' : ''}`}
            onClick={() => setPreferences(prev => ({ ...prev, displayStyle: 'list' }))}
          >
            <div className="display-preview list-preview" />
            <span>List View</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PreferencesSettings;
