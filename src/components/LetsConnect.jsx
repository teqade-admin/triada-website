import React from 'react';
import { Award, UserCheck, Infinity } from 'lucide-react';
import './LetsConnect.css';

const values = [
  {
    icon: <Award />, // Award/Badge represents 100% completion/excellence
    title: 'Execution-First',
    description: 'Practical solutions that work',
  },
  {
    icon: <UserCheck />,
    title: 'Expert Support',
    description: 'Direct access to specialists',
  },
  {
    icon: <Infinity />,
    title: 'Growth Potential',
    description: 'Unlimited scaling opportunities',
  },
];

const LetsConnect = () => {
  return (
    <section className="connect-section">
      <div className="connect-header">
        <h2 className="connect-title">Ready to Scale Your Business?</h2>
        <p className="connect-description">
          Transform your business with strategic consulting that delivers measurable results. 
          Whether you're scaling locally or expanding globally, Triada makes growth achievable.
        </p>
      </div>

      <div className="values-grid">
        {values.map((value, index) => (
          <div key={index} className="value-card">
            <div className="value-icon">{value.icon}</div>
            <div className="value-content">
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="connect-cta">
        <button className="btn btn-secondary" 
        onClick={() => window.open('https://calendly.com/agent-inferno25/30min', '_blank', 'noopener,noreferrer')}
        >Let's Make It Happen</button>
      </div>
    </section>
  );
};

export default LetsConnect;
