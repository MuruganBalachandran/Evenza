import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaBug, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './BetaSettings.css';

const BetaSettings = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: 'Enhanced Dark Mode',
      description: 'Advanced dark mode with custom theme options',
      status: 'stable',
      enabled: false
    },
    {
      id: 2,
      name: 'AI Event Assistant',
      description: 'Get smart suggestions for event planning',
      status: 'beta',
      enabled: false
    },
    {
      id: 3,
      name: 'Real-time Analytics',
      description: 'Live attendance and engagement metrics',
      status: 'experimental',
      enabled: false
    }
  ]);

  const [feedback, setFeedback] = useState('');

  const toggleFeature = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ));
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="beta-settings">
      <section className="beta-section">
        <div className="section-header">
          <FaFlask className="section-icon" />
          <div>
            <h2>Beta Features</h2>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="feature-header">
                <h3>{feature.name}</h3>
                <span className={`feature-status ${feature.status}`}>
                  {feature.status}
                </span>
              </div>
              <p className="feature-description">{feature.description}</p>
              <button 
                className="feature-toggle"
                onClick={() => toggleFeature(feature.id)}
              >
                {feature.enabled ? <FaToggleOn /> : <FaToggleOff />}
                {feature.enabled ? 'Enabled' : 'Disabled'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="beta-section feedback-section">
        <div className="section-header">
          <FaBug className="section-icon" />
          <div>
            <h2>Feedback & Bug Reports</h2>
          </div>
        </div>

        <form onSubmit={handleSubmitFeedback} className="feedback-form">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience or report issues..."
            rows={6}
          />
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Feedback
          </motion.button>
        </form>
      </section>
    </div>
  );
};

export default BetaSettings;
