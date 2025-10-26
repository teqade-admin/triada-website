import React, { useState } from 'react';
import { ChevronDown, Handshake, Target, SlidersHorizontal, Megaphone } from 'lucide-react';
import './Offerings.css';


const offeringsData = [
  {
    title: "Specialised Partnerships",
    icon: <Handshake />,
    details: [
      "Connect with trusted Indian manufacturers.",
      "End-to-end brand building and sourcing.",
      "Ensure reliable, quality supply chains.",
      "Facilitate strategic growth collaborations."
    ]
  },
  {
    title: "Strategy & Growth Planning",
    icon: <Target />,
    details: [
      "Identify untapped market opportunities.",
      "Build data-driven, actionable roadmaps.",
      "Define your unique market position.",
      "Set clear KPIs for accountability."
    ]
  },
  {
    title: "Operational Excellence",
    icon: <SlidersHorizontal />,
    details: [
      "Refine your engine for growth.",
      "Implement scalable, efficient systems.",
      "Analyze cost-leaks to improve margins.",
      "Integrate functions for high performance."
    ]
  },
  {
    title: "Marketing & Digital Transformation",
    icon: <Megaphone />,
    details: [
      "Sharpen your brand’s voice.",
      "Execute targeted, authority-building campaigns.",
      "Implement automation and data dashboards.",
      "Provide scalable tools for growth."
    ]
  }
];


const Offerings = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="offerings-section">
      <h2 className="offerings-main-title">Triada's Excellence</h2>
      <div className="offerings-container">
        {offeringsData.map((offering, index) => (
          <div key={index} className={`offering-item ${activeIndex === index ? 'active' : ''}`}>
            {/* Desktop and Mobile Title Structure */}
            <div className="offering-title" onClick={() => toggleAccordion(index)}>
              <div className="title-content">
                <span className="title-icon-desktop">{offering.icon}</span>
                <h3>{offering.title}</h3>
              </div>
              <ChevronDown className="accordion-icon" />
            </div>
            
            {/* Accordion Details for Mobile, Bullet Points for Desktop */}
            <div className="offering-details">
              <div className="offering-details-content">
                <ul>
                  {offering.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offerings;
