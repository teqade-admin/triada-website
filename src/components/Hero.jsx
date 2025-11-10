import React from 'react';
import './Hero.css';
import AnimatedTriada from './AnimatedTriada';

const HeroSection = ({ navigateToSection }) => {
  return (
    <section className="hero-section" id="home">
      <h1 className="hero-title brand-heading">
         <AnimatedTriada className="triada-animation" />
      </h1>
      <h2 className="hero-slogan brand-heading">
          Strategy. Scale. India.
      </h2>
      <p className="hero-subtitle brand-body">
        Scaling what's local. Growing what's global. Taking India everywhere.
      </p>
      <div className="hero-cta">
        <button 
          className="cta-button cta-primary"
          onClick={() => navigateToSection('offerings-section')}
        >
          Explore Our Process
        </button>
        <button 
          className="cta-button cta-secondary"
          onClick={() => window.open('https://calendly.com/founders-triadaconsulting/30min', '_blank', 'noopener,noreferrer')}
        >
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
