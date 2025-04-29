import { FaCamera, FaGlobe, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
    location: string;
    socialLinks: {
      twitter?: string;
      linkedin?: string;
      website?: string;
      [key: string]: string | undefined;
    };
    joinedDate: string;
  };
  onEditAvatar: () => void;
  isUploading?: boolean;
}

const ProfileHeader = ({ user, onEditAvatar, isUploading }: ProfileHeaderProps) => {
  const getSocialIcon = (platform: string) => {
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
    <motion.div 
      className="profile-header"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div 
        className="avatar-container"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <button 
            className="edit-avatar" 
            onClick={onEditAvatar}
            disabled={isUploading}
          >
            <FaCamera />
          </button>
        </div>
      </motion.div>
      <motion.div 
        className="profile-info"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1>{user.name}</h1>
        <span className="role-badge">{user.role}</span>
        {user.location && <p className="location">{user.location}</p>}
        <p className="joined-date">Member since {user.joinedDate}</p>
        <div className="social-links">
          {Object.entries(user.socialLinks).map(([platform, url]) => {
            if (!url) return null;
            return (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {getSocialIcon(platform)}
                <span>{platform}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileHeader;