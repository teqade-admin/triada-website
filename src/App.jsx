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

  // Navigate to a specific section by ID
  const navigateToSection = (sectionId) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1) {
      scrollToSection(sectionIndex);
    }
  };

  useEffect(() => {
    const scrollLockRef = { current: false };
    let accumulatedDelta = 0;
    let scrollDebounceTimer = null;
    let lastScrollTime = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      
      // Block if locked
      if (scrollLockRef.current) {
        return;
      }

      const currentTime = Date.now();
      const timeSinceLastScroll = currentTime - lastScrollTime;

      // Accumulate delta
      accumulatedDelta += e.deltaY;

      // Clear previous timer
      if (scrollDebounceTimer) {
        clearTimeout(scrollDebounceTimer);
      }

      // FASTER: Reduced from 50ms to 15ms for quicker response
      scrollDebounceTimer = setTimeout(() => {
        // Only trigger if threshold is met
        if (Math.abs(accumulatedDelta) > 30) {
          
          // Lock immediately
          scrollLockRef.current = true;
          lastScrollTime = Date.now();
          
          // Scroll
          if (accumulatedDelta > 0) {
            scrollToSection(currentSection + 1);
          } else {
            scrollToSection(currentSection - 1);
          }
          
          // Unlock after animation (reduced from 1200ms to 1050ms)
          setTimeout(() => {
            scrollLockRef.current = false;
          }, 1050); // 1000ms animation + 50ms buffer
        }
        
        // Reset
        accumulatedDelta = 0;
      }, 15); // OPTIMIZED: Much faster response time
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (scrollLockRef.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) < 50) return;
      
      scrollLockRef.current = true;
      
      if (deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
      
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1050);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
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
      <video
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        poster=''
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          pointerEvents: 'none'
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay for text readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(250, 242, 224, 0)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

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
              {/* Pass navigateToSection to Hero component */}
              {id === 'hero-section' ? (
                <Component navigateToSection={navigateToSection} />
              ) : (
                <Component />
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default App;
