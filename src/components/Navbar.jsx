import { useState } from 'react';
import './Navbar.css';
import AnimatedTriada from './AnimatedTriada';
import { Menu, X, Linkedin } from 'lucide-react';

const Navbar = ({ activeSectionId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
    { id: 'connect-section', name: "Let's Connect" },
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
                className={`nav-button ${activeSectionId === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.name}
              </button>
            </li>
          ))}
          
          {/* LinkedIn Icon */}
          <li className="navbar-linkedin-item">
            <a 
              href="https://www.linkedin.com/company/triada-consulting-co/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="navbar-linkedin-link"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin size={20} fill="currentColor" strokeWidth={2} />
            </a>
          </li>
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
