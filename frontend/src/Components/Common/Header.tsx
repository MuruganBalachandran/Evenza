import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoNotifications } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Left Section - Logo */}
        <div className="header-left">
          <Link to="/" className="logo">
            <span className="logo-text">Evenza</span>
          </Link>
        </div>

        {/* Center Section - Navigation */}
        <div className="header-center">
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            
            <Link to="/create" className="nav-link create-event"> + Create </Link>
            <Link to="/my-events" className="nav-link">My Events</Link>
            <Link to="/history" className="nav-link">History</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>

        {/* Right Section - Auth/Icons */}
        <div className="header-right">
          <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
            <div className="header-icons">
              <Link to="/notifications" className="icon-btn" title="Notifications">
                <IoNotifications />
                <span className="notification-badge">3</span>
              </Link>
              <Link to="/profile" className="icon-btn" title="Profile">
                <FaUserCircle />
              </Link>
            </div>

            <div className="auth-buttons">
              {user ? (
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-text">Log In</Link>
                  <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                </>
              )}
            </div>
    
        </div>
      </div>
    </header>
  );
};

export default Header;