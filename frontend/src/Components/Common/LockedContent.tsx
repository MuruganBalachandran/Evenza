import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LockedContent.css';

const LockedContent = () => {
  const navigate = useNavigate();

  return (
    <div className="locked-overlay">
      <div className="locked-content">
        <FaLock className="lock-icon" />
        <h2>Login to Access</h2>
        <p>Please log in to view this content</p>
        <button 
          className="login-button"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LockedContent; 