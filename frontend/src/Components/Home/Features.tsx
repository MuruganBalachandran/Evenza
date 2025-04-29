
import './Features.css';

interface FeaturesProps {
  data: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const Features = ({ data }: FeaturesProps) => {
  return (
    <section className="features">
      <div className="features-header">
        <h2>Why Choose Evenza?</h2>
        <p>Everything you need to create and manage successful events</p>
      </div>
      <div className="features-grid">
        {data.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;