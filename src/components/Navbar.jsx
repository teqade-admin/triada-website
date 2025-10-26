import { useState } from 'react';
import './Navbar.css';
import AnimatedTriada from './AnimatedTriada';
import { Menu, X } from 'lucide-react';

// This component now receives the activeSectionId from App.jsx
const Navbar = ({ activeSectionId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // This function now dispatches a custom event that App.jsx listens for.
  // This is the key to fixing the navigation click.
  const scrollToSection = (sectionId) => {
    const event = new CustomEvent('scrollToSection', { detail: sectionId });
    window.dispatchEvent(event);
    closeMenu();
  };

  // Your list of navigation items
  const navLinks = [
    { id: 'hero-section', name: 'Home' },
    { id: 'about-section', name: 'About Us' },
    { id: 'offerings-section', name: 'Offerings' },
    { id: 'connect-section', name: 'Let\'s Connect' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo brand-heading">
          <AnimatedTriada className="triada-animation" size="navbar" />
        </div>
        
        <ul className={`navbar-menu brand-body ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <button 
                // The 'active' class is now determined by the prop from App.jsx
                className={`nav-button ${activeSectionId === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;
