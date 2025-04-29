import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { AccountData } from './types';
import './AccountSettings.css';

const AccountSettings: React.FC = () => {
  const [formData, setFormData] = useState<AccountData>({
    visibility: 'public',
    name: '',
    email: '',
    phone: '',
    username: '',
    bio: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
    return requirements;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Implement password update logic here
    console.log('Updating password');
  };

  const requirements = validatePassword(passwordData.newPassword);

  return (
    <div className="account-settings">
      <section className="account-section">
        <h2>🔒 Password & Security</h2>
        {!isEditingPassword ? (
          <button 
            className="settings-button"
            onClick={() => setIsEditingPassword(true)}
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="settings-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="password-requirements">
              <h4>Password Requirements:</h4>
              <ul>
                <li className={requirements.length ? 'met' : ''}>
                  {requirements.length ? <FaCheck /> : <FaTimes />} At least 8 characters
                </li>
                <li className={requirements.uppercase ? 'met' : ''}>
                  {requirements.uppercase ? <FaCheck /> : <FaTimes />} One uppercase letter
                </li>
                <li className={requirements.lowercase ? 'met' : ''}>
                  {requirements.lowercase ? <FaCheck /> : <FaTimes />} One lowercase letter
                </li>
                <li className={requirements.number ? 'met' : ''}>
                  {requirements.number ? <FaCheck /> : <FaTimes />} One number
                </li>
                <li className={requirements.special ? 'met' : ''}>
                  {requirements.special ? <FaCheck /> : <FaTimes />} One special character
                </li>
              </ul>
            </div>

            <div className="form-actions">
              <button type="submit" className="settings-button">Update Password</button>
              <button 
                type="button" 
                className="settings-button secondary"
                onClick={() => setIsEditingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="account-section">
        <h2>🌐 Privacy</h2>
        <div className="form-group">
          <label>Profile Visibility</label>
          <select
            value={formData.visibility}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value as AccountData['visibility'] })}
            className="settings-select"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default AccountSettings;
