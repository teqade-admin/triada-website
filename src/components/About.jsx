import React from 'react';
import './About.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      
      <div className="about-header">
        <h1 className="about-title">About Triada</h1>
        <h2 className="about-subtitle">Built for founders. Backed by real-world growth.</h2>
      </div>

      <div className="about-text">
        <p className="about-para">
          At Triada, we partner with ambitious brands to navigate and grow in the Indian consumer market - clearly, strategically, and without burnout.
          We've built from scratch, led marketplace strategies, and scaled high-growth startups. Now, we bring that hands-on experience to founders building brands for Indian consumers.
        </p>

      </div>

      <div className="about-cta">
        <p className="cta-message">"Whether you're entering India, growing domestically, or expanding globally, Triada is the partner you need to execute your strategy with confidence and achieve impactful growth."</p>
        
        <div className="about-buttons">
          <button className="know-more-btn">
            Know More
          </button>
          <button className="connect-btn" 
           onClick={() => window.open('https://calendly.com/agent-inferno25/30min', '_blank', 'noopener,noreferrer')}
          >
            Let's Connect
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default AboutSection;
