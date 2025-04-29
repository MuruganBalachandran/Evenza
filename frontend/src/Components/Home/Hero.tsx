import { Link } from 'react-router-dom';
import './Hero.css';

interface HeroProps {
  data: {
    title: string;
    subtitle: string;
    features: string[];
    stats: Array<{ number: string; label: string; }>;
  }
}

const Hero = ({ data }: HeroProps) => {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1 className="hero-title">{data.title}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
        <div className="hero-features">
          {data.features.map((feature, idx) => (
            <span key={idx} className="feature-tag">{feature}</span>
          ))}
        </div>
        <div className="hero-buttons">
          <Link to="/create" className="btn btn-primary">Create Event</Link>
          <Link to="/signup" className="btn btn-secondary">Get Started Free</Link>
        </div>
        <div className="hero-stats">
          {data.stats.map((stat, index) => (
            <div key={index} className="stat">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;