import { motion } from 'framer-motion';

const AboutHeader = () => {
  return (
    <motion.header 
      className="about-header"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        🌟 About Evenza
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Where Every Click Sparks a Celebration
      </motion.h2>
    </motion.header>
  );
};

export default AboutHeader;