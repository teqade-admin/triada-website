import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';
import CollaborationSection from './components/Collaboration';
import './App.css';
import LetsConnect from './components/LetsConnect';
import Offerings from './components/Offerings';

// Define the sections in the order they should appear
const sections = [
  { id: 'hero-section', Component: HeroSection, className: 'hero-page' },
  { id: 'about-section', Component: About, className: 'about-page' },
  { id: 'collab-section', Component: CollaborationSection, className: 'collab-page' },
  { id: 'offerings-section', Component: Offerings, className: 'offerings-page' },
  { id: 'connect-section', Component: LetsConnect, className: 'connect-page'},
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const totalSections = sections.length;

  // Centralized function to handle all scrolling
  const scrollToSection = (sectionIndex) => {
    // Boundary check: ignore requests to scroll out of bounds
    if (isAnimating.current || sectionIndex < 0 || sectionIndex >= totalSections) {
      return;
    }
    
    isAnimating.current = true;
    setCurrentSection(sectionIndex);
    
    // Cooldown to prevent overlapping animations
    setTimeout(() => {
      isAnimating.current = false;
    }, 1000); // This must match your CSS transition duration
  };

  // Effect for handling user input (wheel, touch)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isAnimating.current) return;

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1); // Scroll Down
      } else if (e.deltaY < 0) {
        scrollToSection(currentSection - 1); // Scroll Up
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
        scrollToSection(currentSection + 1); // Swipe Up
      } else if (deltaY < 0) {
        scrollToSection(currentSection - 1); // Swipe Down
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

  // Effect for handling navbar clicks via custom event
  useEffect(() => {
    const handleNavClick = (event) => {
        const sectionId = event.detail;
        const sectionIndex = sections.findIndex(sec => sec.id === sectionId);
        if (sectionIndex !== -1) {
            scrollToSection(sectionIndex);
        }
    };

    window.addEventListener('scrollToSection', handleNavClick);

    return () => {
        window.removeEventListener('scrollToSection', handleNavClick);
    };
  }, []); // This only needs to run once

  return (
    <div className="app-container">
      {/* Pass the active section ID to Navbar for highlighting */}
      <Navbar activeSectionId={sections[currentSection].id} />
      
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
