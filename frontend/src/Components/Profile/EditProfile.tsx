import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import ProfileForm from './ProfileForm';
import { buildApiUrl } from '../../config/api';
import './EditProfile.css';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: {
    city: string;
    country: string;
  };
  social_links: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const EditProfile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser?._id) {
      fetchUserData();
    } else {
      setError('Please log in to edit your profile');
      setLoading(false);
    }
  }, [currentUser?._id]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(buildApiUrl(`users/${currentUser?._id}`));
      if (!response.ok) throw new Error('Failed to fetch user data');
      
      const userData = await response.json();
      setUser({
        name: userData.name,
        email: userData.email,
        bio: userData.bio || '',
        location: userData.location || { city: '', country: '' },
        social_links: userData.social_links || {}
      });
      setError('');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Partial<UserProfile>) => {
    try {
      const response = await fetch(buildApiUrl(`users/${currentUser?._id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Navigate back to profile page immediately after successful update
      navigate('/profile');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="loading">Loading profile data...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="edit-profile-container">
        <div className="error">{error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="edit-profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="edit-profile-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <header className="edit-profile-header">
          <h1>Edit Profile</h1>
          <button 
            className="back-button"
            onClick={() => navigate('/profile')}
          >
            Back to Profile
          </button>
        </header>

        <ProfileForm
          user={{
            name: user.name,
            email: user.email,
            bio: user.bio,
            location: `${user.location?.city || ''}${user.location?.city && user.location?.country ? ', ' : ''}${user.location?.country || ''}`,
            socialLinks: user.social_links
          }}
          onSave={handleSave}
          initialEditMode={true}
        />
      </motion.div>
    </motion.div>
  );
};

export default EditProfile;