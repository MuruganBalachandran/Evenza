import { FaRocket, FaGlobe, FaHeart } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="features-grid">
      <div className="feature-card">
        <FaRocket className="feature-icon" />
        <h3>What Drives Us?</h3>
        <ul>
          <li><strong>Ease for Everyone:</strong> From corporate conferences to community hangouts, our tools are designed for humans — not just tech experts.</li>
          <li><strong>Smart, Not Complicated:</strong> Intelligent suggestions, reusable templates, and streamlined flows so you can focus more on the what and less on the how.</li>
        </ul>
      </div>

      <div className="feature-card">
        <FaGlobe className="feature-icon" />
        <h3>Built for Today's World</h3>
        <p>In a world of hybrid events, digital collaboration, and global audiences, Evenza keeps you ahead. Secure authentication, responsive design, and real-time features ensure your events are accessible, beautiful, and future-ready.</p>
      </div>

      <div className="feature-card">
        <FaHeart className="feature-icon" />
        <h3>Our Mission</h3>
        <p>To empower every individual and organization to create, manage, and celebrate events with confidence and creativity.</p>
        <p>Whether it's your first event or your fiftieth, we're here to make sure it feels just as exciting, every time.</p>
      </div>
    </section>
  );
};

export default Features;