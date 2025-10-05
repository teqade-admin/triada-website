import React, { useState, useEffect, useRef } from 'react';
import InteractiveRoadmap from './components/InteractiveRoadmap';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import ContactUs from './components/ContactUs';
import About from './components/About';
import CollaborationSection from './components/Collaboration';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const [roadmapScrollLocked, setRoadmapScrollLocked] = useState(false);

  const totalSections = 4; // Hero, Roadmap, Contact

  const scrollToSection = (sectionIndex) => {
    if (isAnimating.current || sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    isAnimating.current = true;
    setCurrentSection(sectionIndex);
    
    // Reset animation lock after transition completes
    setTimeout(() => {
      isAnimating.current = false;
    }, 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      // If we're in roadmap section and it has scroll lock active, don't handle app-level scrolling
      if (currentSection === 1 && roadmapScrollLocked) {
        return; // Let InteractiveRoadmap handle the scroll
      }

      e.preventDefault();
      
      if (isAnimating.current) return;

      const delta = e.deltaY;
      
      if (delta > 0 && currentSection < totalSections - 1) {
        // Scrolling down - go to next section
        scrollToSection(currentSection + 1);
      } else if (delta < 0 && currentSection > 0) {
        // Scrolling up - go to previous section
        scrollToSection(currentSection - 1);
      }
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      if (currentSection === 1 && roadmapScrollLocked) {
        return; // Let InteractiveRoadmap handle touch
      }
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (currentSection === 1 && roadmapScrollLocked) {
        return; // Let InteractiveRoadmap handle touch
      }

      if (isAnimating.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      // Minimum swipe distance
      if (Math.abs(deltaY) < 50) return;
      
      if (deltaY > 0 && currentSection < totalSections - 1) {
        // Swiped up - go to next section
        scrollToSection(currentSection + 1);
      } else if (deltaY < 0 && currentSection > 0) {
        // Swiped down - go to previous section
        scrollToSection(currentSection - 1);
      }
    };

    // Add event listeners to the entire window for scroll anywhere functionality
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, totalSections, roadmapScrollLocked]);

  return (
    <div className="app-container" ref={containerRef}>
      <Navbar />
      
      <div 
        className="sections-wrapper"
        style={{
          transform: `translate3d(0, ${-currentSection * 100}vh, 0)`,
          transition: 'transform 1s cubic-bezier(0.4, 0.0, 0.2, 1)',
          willChange: 'transform'
        }}
      >
        <section className="page-section hero-page" id="hero-section">
          <HeroSection />
        </section>

        <section className="page-section about-page" id="about-section">
          <About />
        </section>

        <section className="page-section collab-page" id="collab-section">
          <CollaborationSection />
        </section>

        <section className="page-section contact-page" id="contact-section">
          <ContactUs />
        </section>

      </div>
    </div>
  );
}

export default App;
