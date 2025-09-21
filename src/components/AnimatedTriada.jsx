// AnimatedTriada.jsx
import { useState, useEffect } from 'react';
import './AnimatedTriada.css';

const AnimatedTriada = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const words = [
    { prefix: "Tri", language: "English" }, 
    { prefix: "திரி", language: "Tamil" }, 
    { prefix: "त्रि", language: "Hindi" }, 
    { prefix: "ത്രി", language: "Malayalam" }, 
    { prefix: "త్రి", language: "Telugu" }, 
    { prefix: "ತ್ರಿ", language: "Kannada" }, 
    { prefix: "ত্রি", language: "Bengali" }, 
    { prefix: "त्रि", language: "Marathi" }, 
    { prefix: "त्रि", language: "Sanskrit" } 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); 

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={className}>
      <span className="animated-prefix">
        {words[currentIndex].prefix}
      </span>
      <span className="static-suffix">
        ada
      </span>
    </span>
  );
};

export default AnimatedTriada;