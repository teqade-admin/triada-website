import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';
import CollaborationSection from './components/Collaboration';
import ContactUs from './components/ContactUs';
import './App.css';

const sections = [
  { id: 'hero-section', Component: HeroSection, className: 'hero-page' },
  { id: 'about-section', Component: About, className: 'about-page' },
  { id: 'collab-section', Component: CollaborationSection, className: 'collab-page' },
  { id: 'contact-section', Component: ContactUs, className: 'contact-page' },
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  const totalSections = sections.length;

  const scrollToSection = (sectionIndex) => {
    if (isAnimating.current || sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    isAnimating.current = true;
    setCurrentSection(sectionIndex);
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 1000); // Corresponds to the CSS transition duration
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating.current) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0) {
        scrollToSection(currentSection - 1);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) < 50) return; // Ignore small swipes
      
      if (deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else if (deltaY < 0) {
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection]);

  return (
    <div className="app-container">
      <Navbar />
      
      <div 
        className="sections-wrapper"
        style={{
          transform: `translateY(${-currentSection * 100}vh)`,
          transition: 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        {sections.map(({ id, Component, className }) => (
          <section key={id} id={id} className={`page-section ${className}`}>
            <div className="section-content">
              <Component />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default App;
