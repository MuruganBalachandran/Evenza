import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutHeader from '../../Components/About/AboutHeader';
import AboutIntro from '../../Components/About/AboutIntro';
import Features from '../../Components/About/Features';
import Team from '../../Components/About/Team';
import './About.css';

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.feature-card, .team-card').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AboutHeader />
      <AboutIntro />
      <Features />
      <Team />
    </motion.div>
  );
};

export default About;