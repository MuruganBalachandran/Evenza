import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-columns">
          {/* Column 1 */}
          <div className="footer-section">
            <h4>Evenza</h4>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
            </nav>
          </div>

          {/* Column 2 */}
          <div className="footer-section">
            <h4>Events</h4>
            <nav>
              <Link to="/create">Create Event</Link>
              <Link to="/my-events">My Events</Link>
              <Link to="/history">Event History</Link>
              <Link to="/explore">Explore Events</Link>
            </nav>
          </div>

          {/* Column 3 */}
          <div className="footer-section">
            <h4>Account</h4>
            <nav>
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/dashboard">Dashboard</Link>
            </nav>
          </div>

          {/* Column 4 */}
          <div className="footer-section">
            <h4>Support</h4>
            <nav>
              <Link to="/help">Help Center</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/contact-support">Contact Support</Link>
              <Link to="/guides">Guides</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Evenza. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;