import { useState } from 'react';
import { 
  FaSlack, FaDiscord, FaMicrosoft, 
  FaPaypal, FaStripe} from 'react-icons/fa';
import { SiZoom } from 'react-icons/si'; // Import Zoom icon from simple icons
import './IntegrationsSettings.css';

const IntegrationsSettings = () => {
  const [integrations, setIntegrations] = useState({
    video: { zoom: false, teams: false, gmeet: false },
    communication: { slack: false, discord: false },
    payment: { stripe: false, paypal: false },
    social: { twitter: false, linkedin: false, github: false }
  });

  const handleConnect = (category: string, service: string) => {
    setIntegrations(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [service]: !prev[category as keyof typeof prev][service as keyof typeof prev[keyof typeof prev]]
      }
    }));
  };

  return (
    <div className="integrations-settings">
      <section className="integration-section">
        <h2>🎥 Video Conferencing</h2>
        <div className="integration-grid">
          <div className="integration-card">
            <div className="service-info">
              <SiZoom className="service-icon zoom" /> {/* Replace FaZoom with SiZoom */}
              <div>
                <h3>Zoom</h3>
                <p>Host virtual events with Zoom integration</p>
              </div>
            </div>
            <button 
              className={`connect-button ${integrations.video.zoom ? 'connected' : ''}`}
              onClick={() => handleConnect('video', 'zoom')}
            >
              {integrations.video.zoom ? 'Connected' : 'Connect'}
            </button>
          </div>

          <div className="integration-card">
            <div className="service-info">
              <FaMicrosoft className="service-icon teams" />
              <div>
                <h3>Microsoft Teams</h3>
                <p>Connect with Teams for virtual meetings</p>
              </div>
            </div>
            <button 
              className={`connect-button ${integrations.video.teams ? 'connected' : ''}`}
              onClick={() => handleConnect('video', 'teams')}
            >
              {integrations.video.teams ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      </section>

      <section className="integration-section">
        <h2>💬 Team Communication</h2>
        <div className="integration-grid">
          <div className="integration-card">
            <div className="service-info">
              <FaSlack className="service-icon slack" />
              <div>
                <h3>Slack</h3>
                <p>Get event notifications in Slack</p>
              </div>
            </div>
            <button 
              className={`connect-button ${integrations.communication.slack ? 'connected' : ''}`}
              onClick={() => handleConnect('communication', 'slack')}
            >
              {integrations.communication.slack ? 'Connected' : 'Connect'}
            </button>
          </div>

          <div className="integration-card">
            <div className="service-info">
              <FaDiscord className="service-icon discord" />
              <div>
                <h3>Discord</h3>
                <p>Manage events through Discord</p>
              </div>
            </div>
            <button 
              className={`connect-button ${integrations.communication.discord ? 'connected' : ''}`}
              onClick={() => handleConnect('communication', 'discord')}
            >
              {integrations.communication.discord ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      </section>

      <section className="integration-section">
        <h2>💳 Payment Processing</h2>
        <div className="integration-grid">
          <div className="integration-card">
            <div className="service-info">
              <FaStripe className="service-icon stripe" />
              <div>
                <h3>Stripe</h3>
                <p>Process payments securely with Stripe</p>
              </div>
            </div>
            <button 
              className={`connect-button ${integrations.payment.stripe ? 'connected' : ''}`}
              onClick={() => handleConnect('payment', 'stripe')}
            >
              {integrations.payment.stripe ? 'Connected' : 'Connect'}
            </button>
          </div>

          <div className="integration-card">
            <div className="service-info">
              <FaPaypal className="service-icon paypal" />
              <div>
                <h3>PayPal</h3>
                <p>Accept payments via PayPal</p>
              </div>
            </div>
            <button 
              className={`connect-button ${integrations.payment.paypal ? 'connected' : ''}`}
              onClick={() => handleConnect('payment', 'paypal')}
            >
              {integrations.payment.paypal ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntegrationsSettings;
