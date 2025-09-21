import './Navbar.css';
import AnimatedTriada from './AnimatedTriada';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo brand-heading">
          <AnimatedTriada className="triada-animation" size="normal" />
        </div>
        <ul className="navbar-menu brand-body">
          <li><a href="#home">Home</a></li>
          <li><a href="#roadmap">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;