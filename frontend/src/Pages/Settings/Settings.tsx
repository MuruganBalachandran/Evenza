import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AccountSettings from "./../../Components/Settings/AccountSettings";
import BillingSettings from './../../Components/Settings/BillingSettings';
import PreferencesSettings from './../../Components/Settings/PreferencesSettings';
import SecuritySettings from './../../Components/Settings/SecuritySettings';
import CalendarSettings from './../../Components/Settings/CalendarSettings';
import CommunicationSettings from './../../Components/Settings/CommunicationSettings';
import IntegrationsSettings from './../../Components/Settings/IntegrationsSettings';
import BetaSettings from './../../Components/Settings/BetaSettings';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');

  const sections = [
    { id: 'account', label: '🧑 Account', component: AccountSettings },
    { id: 'billing', label: '🧾 Billing & Subscription', component: BillingSettings },
    { id: 'preferences', label: '🎨 Preferences', component: PreferencesSettings },
    { id: 'security', label: '🛡️ Privacy & Security', component: SecuritySettings },
    { id: 'calendar', label: '📅 Calendar & Sync', component: CalendarSettings },
    { id: 'communication', label: '💬 Communication', component: CommunicationSettings },
    { id: 'integrations', label: '🔗 Integrations', component: IntegrationsSettings },
    { id: 'beta', label: '🧪 Beta & Experimental', component: BetaSettings }
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || AccountSettings;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { delay: 0.2 } }
  };

  const contentVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { delay: 0.3 } },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <motion.div 
      className="settings-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="settings-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>⚙️ Settings</h1>
        <p>Customize your Evenza experience</p>
      </motion.div>

      <div className="settings-container">
        <motion.div 
          className="settings-sidebar"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection}
            className="settings-main"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Settings;