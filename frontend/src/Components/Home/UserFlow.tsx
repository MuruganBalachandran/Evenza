
import './UserFlow.css';

interface UserFlowProps {
  data: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

const UserFlow = ({ data }: UserFlowProps) => {
  return (
    <section className="user-flow">
      <div className="user-flow-header">
        <h2>How It Works</h2>
        <p>Three simple steps to event success</p>
      </div>
      <div className="steps-container">
        {data.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserFlow;