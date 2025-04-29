import React, { useState } from 'react';
import { FaPlus, FaTrash, FaGlobe, FaTwitter, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    bio: string;
    location: string;
    socialLinks: Record<string, string>;
  };
  onSave: (data: any) => Promise<void>;
  initialEditMode?: boolean;
}

const ProfileForm = ({ user, onSave, initialEditMode = false }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    ...user,
    socialLinks: Object.entries(user.socialLinks || {}).map(([platform, url]) => ({
      platform,
      url
    })) as SocialLink[]
  });
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      // Convert social links array back to object format for API
      const socialLinksObject = formData.socialLinks.reduce((acc, link) => ({
        ...acc,
        [link.platform]: link.url
      }), {});

      await onSave({
        ...formData,
        social_links: socialLinksObject
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: '', url: '' }]
    });
  };

  const removeSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index)
    });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <FaTwitter />;
      case 'linkedin':
        return <FaLinkedin />;
      default:
        return <FaGlobe />;
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          disabled={!isEditing}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label>
          Social Links
          {isEditing && (
            <button 
              type="button" 
              className="add-link-btn"
              onClick={addSocialLink}
            >
              <FaPlus /> Add Link
            </button>
          )}
        </label>
        <div className="social-links-list">
          {formData.socialLinks.map((link, index) => (
            <div key={index} className="social-link-item">
              <div className="platform-select">
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">Select Platform</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="website">Website</option>
                </select>
              </div>
              <div className="url-input">
                <span className="platform-icon">
                  {getPlatformIcon(link.platform)}
                </span>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder={`Enter ${link.platform || 'platform'} URL`}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <button
                    type="button"
                    className="remove-link-btn"
                    onClick={() => removeSocialLink(index)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        {isEditing && (
          <>
            <button 
              type="submit" 
              className="btn-save"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  ...user,
                  socialLinks: Object.entries(user.socialLinks || {}).map(([platform, url]) => ({
                    platform,
                    url
                  }))
                });
              }}
              disabled={isSaving}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;