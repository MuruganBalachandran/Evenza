import { FaUserFriends } from 'react-icons/fa';

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former event planner turned tech entrepreneur, passionate about making event management accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      bio: "10+ years of product development experience, focused on creating intuitive and powerful event tools."
    },
    {
      name: "Alex Rivera",
      role: "Lead Designer",
      bio: "Award-winning UX designer dedicated to creating beautiful and functional event experiences."
    }
  ];

  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-card">
            <FaUserFriends className="team-icon" />
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;