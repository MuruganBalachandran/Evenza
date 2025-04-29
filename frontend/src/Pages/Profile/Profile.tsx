import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../../Components/Profile/ProfileHeader';
import ActivitySummary from '../../Components/Profile/ActivitySummary';
import ProfileForm from '../../Components/Profile/ProfileForm';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';
import './Profile.css';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar?: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  social_links: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  stats: {
    total_events: number;
    events_attended: number;
    saved_events: number;
  };
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (authUser?._id) {
      fetchUserProfile();
    }
  }, [authUser?._id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(`users/${authUser?._id}`));
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      console.log('Fetched user data:', userData);
      
      setUser({
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Member',
        bio: userData.bio || '',
        avatar: userData.profile_image,
        location: userData.location || { city: '', state: '', country: '' },
        social_links: userData.social_links || {},
        stats: {
          total_events: userData.stats?.total_events || 0,
          events_attended: userData.stats?.events_attended || 0,
          saved_events: userData.stats?.saved_events || 0
        },
        created_at: userData.created_at
      });

      setError('');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAvatar = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const formData = new FormData();
          formData.append('avatar', file);

          const response = await fetch(buildApiUrl(`users/${authUser?._id}/avatar`), {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Failed to upload avatar');
          }

          const data = await response.json();
          setUser(prev => prev ? {
            ...prev,
            avatar: data.profile_image
          } : null);
        } catch (error) {
          console.error('Error uploading avatar:', error);
          alert('Failed to upload avatar. Please try again.');
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  }, [authUser?._id]);

  const handleSaveProfile = async (data: Partial<UserProfile>) => {
    try {
      const response = await fetch(buildApiUrl(`users/${authUser?._id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setUser(prev => prev ? {
        ...prev,
        ...updatedData
      } : null);

      // Show success state through UI instead of alert
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Profile updated successfully';
      document.querySelector('.profile-details-section')?.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 3000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      // Show error state through UI instead of alert
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'Failed to update profile. Please try again.';
      document.querySelector('.profile-details-section')?.appendChild(errorMessage);
      setTimeout(() => errorMessage.remove(), 3000);
      throw error;
    }
  };

  if (!authUser) {
    return (
      <div className="profile-container error">
        <div className="error-message">Please log in to view your profile</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container loading">
        <div className="loading-spinner">Loading profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-container error">
        <div className="error-message">{error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="profile-background" />
      <div className="profile-content-wrapper">
        <motion.div 
          className="profile-main"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProfileHeader 
            user={{
              name: user.name,
              role: user.role,
              avatar: user.avatar,
              location: `${user.location.city}${user.location.city && user.location.country ? ', ' : ''}${user.location.country}`,
              socialLinks: {
                twitter: user.social_links?.twitter,
                linkedin: user.social_links?.linkedin,
                website: user.social_links?.website
              },
              joinedDate: new Date(user.created_at).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })
            }}
            onEditAvatar={handleEditAvatar}
            isUploading={isUploading}
          />
          
          <motion.div 
            className="profile-stats-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ActivitySummary stats={{
              eventsCreated: user.stats.total_events,
              eventsAttended: user.stats.events_attended,
              savedEvents: user.stats.saved_events
            }} />
          </motion.div>

          <motion.div 
            className="quick-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              className="action-btn primary"
              onClick={() => navigate('/my-events')}
              style={{ cursor: 'pointer' }}
            >
              My Events
            </button>
            <button 
              className="action-btn primary"
              onClick={() => navigate('/profile/edit')}
            >
              Edit Profile
            </button>
          </motion.div>

          <motion.div 
            className="profile-details-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ProfileForm 
              user={{
                name: user.name,
                email: user.email,
                bio: user.bio,
                location: `${user.location.city}${user.location.city && user.location.country ? ', ' : ''}${user.location.country}`,
                socialLinks: user.social_links
              }} 
              onSave={handleSaveProfile} 
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;