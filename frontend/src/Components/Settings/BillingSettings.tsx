import { useState } from 'react';
import './BillingSettings.css';

const BillingSettings = () => {
  const [] = useState('free');
  


  return (
    <div className="billing-settings">
      <section className="billing-section">
        <h2>Current Plan</h2>
        <div className="current-plan">
          <div className="plan-info">
            <span className="plan-name">Free Plan</span>
            <button className="settings-button">Upgrade to Premium</button>
          </div>
        </div>
      </section>

      <section className="billing-section">
        <h2>Payment Methods</h2>
        <div className="payment-methods">
          <div className="payment-method-card">
            No payment methods added
          </div>
          <button className="settings-button">Add Payment Method</button>
        </div>
      </section>

      <section className="billing-section">
        <h2>Billing History</h2>
        <div className="invoice-list">
          <p>No billing history available</p>
        </div>
      </section>
    </div>
  );
};

export default BillingSettings;
