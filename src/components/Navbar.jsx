import { useState } from 'react'
import './Navbar.css'
import AnimatedTriada from './AnimatedTriada'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    closeMenu() // Close mobile menu after navigation
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo brand-heading">
          <AnimatedTriada className="triada-animation" size="navbar" />
        </div>
        
        {/* Desktop Menu */}
        <ul className={`navbar-menu brand-body ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <button 
              className="nav-button"
              onClick={() => scrollToSection('hero-section')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className="nav-button"
              onClick={() => scrollToSection('about-section')}
            >
              About
            </button>
          </li>
          <li>
            <button 
              className="nav-button"
              onClick={() => scrollToSection('contact-section')}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  )
}

export default Navbar
